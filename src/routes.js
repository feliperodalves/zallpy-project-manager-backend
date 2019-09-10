import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProjectController from './app/controllers/ProjectController';
import TaskController from './app/controllers/TaskController';
import AssignController from './app/controllers/AssignController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/projects', ProjectController.index);
routes.post('/projects', ProjectController.store);
routes.put('/projects/:projectId', ProjectController.update);
routes.delete('/projects/:projectId', ProjectController.delete);

routes.get('/assign', AssignController.index);
routes.post(
  '/projects/:projectId/assign/:userId/:roleId',
  AssignController.store
);
routes.put('/assign/:assignId/:roleId', AssignController.update);
routes.delete('/assign/:assignId', AssignController.delete);

routes.get('/tasks', TaskController.index);
routes.post('/projects/:projectId/tasks', TaskController.store);
routes.put('/tasks/:taskId', TaskController.update);
routes.delete('/tasks/:taskId', TaskController.delete);

export default routes;
