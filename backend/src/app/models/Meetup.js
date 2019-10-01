import Sequelize, { Model } from 'sequelize';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        location: Sequelize.STRING,
        latitude: Sequelize.STRING,
        longitude: Sequelize.STRING,
        time: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'file_id', as: 'banner' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'organizer' });
  }
}

export default Meetup;
