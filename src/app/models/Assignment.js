import { Model } from 'sequelize';

class Assignment extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
    this.belongsTo(models.Project, {
      foreignKey: 'project_id',
      as: 'projects',
    });
    this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'roles' });
    this.hasMany(models.Task, { foreignKey: 'assignment_id', sourceKey: 'id' });
  }
}

export default Assignment;
