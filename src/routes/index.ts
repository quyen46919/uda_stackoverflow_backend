import BoardRoute from './boards.route';
import TagRoute from './tags.route';
import QuestionRoute from './questions.route';
import AnswerRoute from './answers.route';
import AuthRoute from './auth.route';
import UserRoute from './user.route';
import ImageRoute from './image.route';
import express from 'express';
const router = express.Router();

const defaultRoutes = [
    {
        path: '/boards',
        route: BoardRoute,
    },
    {
        path: '/tags',
        route: TagRoute,
    },
    {
        path: '/questions',
        route: QuestionRoute,
    },
    {
        path: '/answers',
        route: AnswerRoute,
    },
    {
        path: '/auth',
        route: AuthRoute,
    },
    {
        path: '/user',
        route: UserRoute,
    },
    {
      path: '/upload-image',
      route: ImageRoute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;