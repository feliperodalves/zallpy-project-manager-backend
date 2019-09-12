import Role from '../models/Role';

class RoleController {
  async index(req, res) {
    const roles = await Role.findAll({
      attributes: ['id', 'name'],
    });

    return res.json(roles);
  }
}

export default new RoleController();
