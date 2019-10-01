import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import OrganizingController from './app/controllers/OrganizingController';
import SessionController from './app/controllers/SessionController';
import SubscriptionController from './app/controllers/SubscriptionController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/meetups', MeetupController.index);
routes.post('/meetups', MeetupController.store);
routes.put('/meetups/:meetupId', MeetupController.update);
routes.delete('/meetups/:meetupId', MeetupController.delete);

routes.get('/meetups/:meetupId/subscribe', SubscriptionController.store);

routes.get('/subscriptions', SubscriptionController.index);

routes.get('/organizing', OrganizingController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
