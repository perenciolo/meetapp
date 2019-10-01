import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class OrganizingController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: { user_id: req.userId },
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
    });

    return res.json(meetups);
  }
}

export default new OrganizingController();
