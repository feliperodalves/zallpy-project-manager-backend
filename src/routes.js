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

routes.get('/projects/:projectId/assign', AssignController.index);
routes.post('/projects/:projectId/assign', AssignController.store);
routes.put('/projects/:projectId/assign/:assignId', AssignController.update);
routes.delete('/projects/:projectId/assign/:assignId', AssignController.delete);

routes.get('/projects/:projectId/tasks', TaskController.index);
routes.post('/projects/:projectId/tasks', TaskController.store);
routes.put('/projects/:projectId/tasks/:taskId', TaskController.update);
routes.delete('/projects/:projectId/tasks/:taskId', TaskController.delete);

export default routes;
