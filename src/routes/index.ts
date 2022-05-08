import BoardRoute from './boards.route';
import express from 'express';
const router = express.Router();

const defaultRoutes = [
    {
      path: '/boards',
      route: BoardRoute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;