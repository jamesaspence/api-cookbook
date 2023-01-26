import { version } from './../../package.json';
import Router from '@koa/router';

const router = new Router();

router.get('/', ctx => {
  ctx.body = {
    name: 'Cookbook API',
    version: version,
  };
});

const apiRouter = new Router({ prefix: '/api/v1' });

router.use(apiRouter.routes());
router.use(apiRouter.allowedMethods());

export default router;
