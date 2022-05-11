import BoardRoute from './boards.route';
import TagRoute from './tags.route';
import QuestionRoute from './questions.route';
import TagInQuestionRoute from './tag_in_question.route';
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
        path: '/tag_in_question',
        route: TagInQuestionRoute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;