import { Op } from 'sequelize';
import { isBefore } from 'date-fns';

import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import User from '../models/User';
import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      attributes: ['id'],
      include: [
        {
          model: User,
          as: 'subscriber',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Meetup,
          as: 'meetup',
          attributes: [
            'id',
            'name',
            'description',
            'location',
            'latitude',
            'longitude',
            'time',
            'file_id',
          ],
          where: {
            time: {
              [Op.gte]: new Date(),
            },
          },
          required: true,
          include: [
            {
              model: User,
              as: 'organizer',
              attributes: ['id', 'name', 'email'],
            },
          ],
        },
      ],
      order: [['meetup', 'time']],
    });
    return res.json(subscriptions);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);

    const { meetupId } = req.params;

    if (!meetupId)
      return res
        .status(400)
        .json({ error: 'Please pass a param containing meetup id.' });

    const meetup = await Meetup.findByPk(meetupId, {
      include: [{ model: User, as: 'organizer' }],
    });

    if (!meetup) return res.status(404).json({ error: 'Not found.' });

    const organizerId = meetup.organizer.id || null;

    if (+user.id === +organizerId)
      return res
        .status(401)
        .json({ error: 'User cannot subscribe to their meetup.' });

    const { time: meetupDate } = meetup;

    if (isBefore(meetupDate, new Date()))
      return res
        .status(400)
        .json({ error: 'User cannot subscribe to past meetup.' });

    const hasSubscription = await Subscription.findAll({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          required: true,
          where: {
            [Op.or]: [{ id: meetupId }, { time: meetupDate }],
          },
        },
      ],
    });

    if (hasSubscription && hasSubscription.length) {
      return res.status(403).json({
        error:
          'Already subscribed to this meetup or this meetup is at the same time that some of your subscription.',
      });
    }

    const subscription = await Subscription.create({
      meetup_id: meetupId,
      user_id: user.id,
    });

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user,
    });

    return res.json(subscription);
  }
}

export default new SubscriptionController();
