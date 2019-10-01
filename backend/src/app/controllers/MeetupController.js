import * as Yup from 'yup';
import { Op } from 'sequelize';
import { isBefore, parseISO, startOfDay, endOfDay, isValid } from 'date-fns';

import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class MeetupController {
  async index(req, res) {
    const where = {};
    const page = req.query.page || 1;

    if (req.query.date) {
      const searchDate = parseISO(req.query.date);

      if (!isValid(searchDate))
        return res.status(400).json({ error: 'Invalid date' });

      where.time = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
      };
    }

    const meetups = await Meetup.findAll({
      where,
      attributes: [
        'id',
        'name',
        'description',
        'location',
        'latitude',
        'longitude',
        'time',
      ],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'name', 'path', 'url'],
        },
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'name', 'email'],
        },
      ],
      limit: 10,
      offset: 10 * page - 10,
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      latitude: Yup.string().required(),
      longitude: Yup.string().required(),
      time: Yup.date().required(),
      file_id: Yup.number().required(),
    });

    if (!isValid(parseISO(req.body.time)))
      return res.status(400).json({ error: 'Invalid Date.' });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails.' });

    const { time } = req.body;

    if (isBefore(parseISO(time), new Date()))
      return res.status(400).json({ error: 'Event must be in the future.' });

    const meetup = await Meetup.create({
      ...req.body,
      user_id: req.userId,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      latitude: Yup.string(),
      longitude: Yup.string(),
      time: Yup.date(),
      file_id: Yup.number(),
    });

    if (`${parseISO(req.body.time)}` === 'Invalid Date')
      return res.status(400).json({ error: 'Invalid Date.' });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails.' });

    const { meetupId } = req.params;

    if (!meetupId)
      return res
        .status(400)
        .json({ error: 'Please pass a param containing meetup id.' });

    const meetup = await Meetup.findByPk(meetupId);

    // User must update only its meetup.
    if (+meetup.user_id !== +req.userId)
      return res
        .status(401)
        .json({ error: 'Trying to update meetup created by another user.' });

    // Is not permitted to update past meetups.
    if (
      isBefore(meetup.time, new Date()) ||
      isBefore(parseISO(req.body.time), new Date())
    )
      return res
        .status(401)
        .json({ error: 'Only future meetups can be updated.' });

    await meetup.update(req.body);

    return res.json(meetup);
  }

  async delete(req, res) {
    const { meetupId } = req.params;

    if (!meetupId)
      return res
        .status(400)
        .json({ error: 'Please pass a param containing meetup id.' });

    const meetup = await Meetup.findByPk(meetupId);

    if (!meetup) return res.status(400).json({ error: 'Invalid meetup id.' });

    // User must update only its meetup.
    if (+meetup.user_id !== +req.userId)
      return res
        .status(401)
        .json({ error: 'Trying to delete meetup created by another user.' });

    // Is not permitted to update past meetups.
    if (isBefore(meetup.time, new Date()))
      return res
        .status(401)
        .json({ error: 'Only future meetups can be canceled.' });

    await meetup.destroy();

    return res.status(204).json(meetup);
  }
}

export default new MeetupController();
