import Sequelize, { Model } from 'sequelize';

class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: 'Assignment',
      foreignKey: 'project_id',
      as: 'users',
    });
    this.hasMany(models.Assignment, {
      foreignKey: 'project_id',
      sourceKey: 'id',
    });
  }
}

export default Project;
