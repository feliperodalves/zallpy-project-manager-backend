import * as Yup from 'yup';
import Moment from 'moment';
import Task from '../models/Task';
import Assignment from '../models/Assignment';

class TaskController {
  async index(req, res) {
    const tasks = await Task.findAll({
      include: [
        {
          model: Assignment,
          as: 'assign',
          where: {
            user_id: req.userId,
          },
          attributes: [],
        },
      ],
      attributes: ['id', 'title', 'description', 'date', 'time'],
    });

    return res.json(tasks);
  }

  async store(req, res) {
    const schemaBody = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string(),
      date: Yup.date().required(),
      time: Yup.string().test('a', 'b', value => {
        return Moment(value, 'HH:mm').isValid();
      }),
    });

    const schemaParams = Yup.object().shape({
      projectId: Yup.number().required(),
    });

    if (
      !(await schemaBody.isValid(req.body)) ||
      !(await schemaParams.isValid(req.params))
    ) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const assignment = await Assignment.findOne({
      where: {
        project_id: req.params.projectId,
        user_id: req.userId,
      },
    });

    if (!assignment) {
      return res.status(401).json({
        error:
          'Você não pode incluir uma tarefa a um projeto que não está associado',
      });
    }

    const {
      id,
      title,
      description,
      date,
      time,
      assignment_id,
    } = await Task.create({
      ...req.body,
      assignment_id: assignment.id,
    });
    return res.json({ id, title, description, date, time, assignment_id });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      date: Yup.date(),
      time: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { taskId } = req.params;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(401).json({ error: 'Tarefa não encontrada' });
    }

    const assignment = await Assignment.findOne({
      where: {
        id: task.assignment_id,
        user_id: req.userId,
      },
    });

    if (!assignment) {
      return res.status(401).json({
        error: 'Você não pode editar tarefas de outros usuários',
      });
    }

    await task.update(req.body);

    const { id, title, description, date, time } = await Task.findByPk(taskId);

    return res.json({ id, title, description, date, time });
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      taskId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { taskId } = req.params;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(401).json({
        error: 'Tarefa não encontrada',
      });
    }

    const assignment = await Assignment.findOne({
      where: {
        id: task.assignment_id,
        user_id: req.userId,
      },
    });

    if (!assignment) {
      return res.status(401).json({
        error: 'Você não pode excluir tarefas de outros usuários',
      });
    }

    await task.destroy();

    return res.json({ message: 'Tarefa deletada' });
  }
}

export default new TaskController();
