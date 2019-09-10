import Project from '../models/Project';
import Assignment from '../models/Assignment';
import User from '../models/User';
import Role from '../models/Role';

class AssignController {
  async index(req, res) {
    const assignments = await Assignment.findAll({
      atributes: ['role_id'],
      where: { project_id: req.params.projectId },
      include: [
        {
          model: User,
          as: 'users',
          attributes: ['name'],
        },
        {
          model: Project,
          as: 'projects',
          attributes: ['name', 'description'],
        },
        {
          model: Role,
          as: 'roles',
          attributes: ['name'],
        },
      ],
    });
    return res.json(assignments);
  }

  async store(req, res) {
    const { projectId, userId, roleId } = req.params;

    const assignmentAdm = await Assignment.findOne({
      where: {
        project_id: projectId,
        user_id: req.userId,
        role_id: 1,
      },
    });

    if (!assignmentAdm) {
      return res.status(401).json({
        error: 'Somente um administrador deste projeto pode fazer atribuições',
      });
    }

    const user = await User.findByPk(userId, { attributes: ['id'] });
    if (!user) {
      return res.status(401).json({ error: 'Usuário informado não existe' });
    }
    const project = await Project.findByPk(projectId, { attributes: ['id'] });
    if (!project) {
      return res.status(401).json({ error: 'Projeto informado não existe' });
    }
    const role = await Role.findByPk(roleId, { attributes: ['id'] });
    if (!role) {
      return res.status(401).json({ error: 'Nível informado não existe' });
    }

    const assignmentExists = await Assignment.findOne({
      where: {
        project_id: projectId,
        user_id: userId,
      },
    });

    if (assignmentExists) {
      return res.status(401).json({
        error: 'Uma atribuição para este projeto já existe',
      });
    }

    try {
      await Assignment.create({
        user_id: userId,
        project_id: projectId,
        role_id: roleId,
      });
    } catch (err) {
      return res
        .status(401)
        .json({ error: 'Não foi possível inserir os dados' });
    }

    return res.json({ projectId, userId, roleId });
  }

  async update(req, res) {
    const { assignId, roleId } = req.params;

    const assignment = await Assignment.findOne({
      where: {
        id: assignId,
      },
    });

    if (!assignment) {
      return res.status(401).json({
        error: 'Atribuição não encontrada',
      });
    }

    const assignmentAdm = await Assignment.findOne({
      where: {
        project_id: assignment.project_id,
        user_id: req.userId,
        role_id: 1,
      },
    });

    if (!assignmentAdm) {
      return res.status(401).json({
        error:
          'Somente um administrador deste projeto pode alterar atribuições',
      });
    }

    await assignment.update({ role_id: roleId });

    return res.json({ message: 'Atribuição alterada com sucesso' });
  }

  async delete(req, res) {
    const { assignId } = req.params;

    const assignment = await Assignment.findOne({
      where: {
        id: assignId,
      },
    });

    if (!assignment) {
      return res.status(401).json({
        error: 'Atribuição não encontrada',
      });
    }

    const assignmentAdm = await Assignment.findOne({
      where: {
        project_id: assignment.project_id,
        user_id: req.userId,
        role_id: 1,
      },
    });

    if (!assignmentAdm) {
      return res.status(401).json({
        error:
          'Somente um administrador deste projeto pode excluir atribuições',
      });
    }

    await assignment.destroy();

    return res.json({ message: 'Atribuição deletada' });
  }
}

export default new AssignController();
