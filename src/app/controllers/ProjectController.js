import * as Yup from 'yup';
import Project from '../models/Project';
import Assignment from '../models/Assignment';
import User from '../models/User';
import Role from '../models/Role';

class ProjectController {
  async index(req, res) {
    const projects = await Project.findAll({
      attributes: ['name', 'description'],
      include: [
        {
          model: Assignment,
          include: [
            {
              model: User,
              as: 'users',
              attributes: ['name'],
            },
            {
              model: Role,
              as: 'roles',
              attributes: ['name'],
            },
          ],
          attributes: ['id'],
          where: {
            user_id: req.userId,
          },
        },
      ],
    });

    return res.json(projects);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = await Project.create(req.body);

    await Assignment.create({
      user_id: req.userId,
      project_id: id,
      role_id: 1,
    });

    const project = await Project.findByPk(id, {
      attributes: ['name', 'description'],
      include: [
        {
          model: Assignment,
          include: [
            {
              model: User,
              as: 'users',
              attributes: ['name'],
            },
            {
              model: Role,
              as: 'roles',
              attributes: ['name'],
            },
          ],
          attributes: ['id'],
          where: {
            user_id: req.userId,
          },
        },
      ],
    });

    return res.json(project);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const oldProject = await Project.findByPk(req.params.projectId, {
      include: [
        {
          model: Assignment,
          where: {
            user_id: req.userId,
          },
        },
      ],
    });

    if (!oldProject) {
      return res.status(401).json({
        error: 'Você não pode excluir esse projeto',
      });
    }

    await oldProject.update(req.body);

    const project = await Project.findByPk(req.params.projectId, {
      attributes: ['name', 'description'],
      include: [
        {
          model: Assignment,
          include: [
            {
              model: User,
              as: 'users',
              attributes: ['name'],
            },
            {
              model: Role,
              as: 'roles',
              attributes: ['name'],
            },
          ],
          attributes: ['id'],
          where: {
            user_id: req.userId,
          },
        },
      ],
    });

    return res.json(project);
  }

  async delete(req, res) {
    const project = await Project.findByPk(req.params.projectId, {
      include: [
        {
          model: Assignment,
          where: {
            user_id: req.userId,
          },
        },
      ],
    });

    if (!project) {
      return res.status(401).json({
        error: 'Você não pode excluir esse projeto',
      });
    }

    await project.destroy();

    return res.json({ message: 'Projeto Deletado' });
  }
}

export default new ProjectController();
