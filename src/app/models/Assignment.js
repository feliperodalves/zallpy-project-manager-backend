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
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Project, { foreignKey: 'project_id', as: 'project' });
    this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
  }
}

export default Assignment;
