import { version } from './../../package.json';
import Router from '@koa/router';
import { validate } from './middleware/validate';
import { jwtAuth } from './middleware/jwt';
import { login, me, registerUser } from './controller/auth';
import { loginValidator, registrationValidator } from './request/auth';

const router = new Router();

router.get('/', ctx => {
  ctx.body = {
    name: 'Cookbook API',
    version: version,
  };
});

const apiRouter = new Router({ prefix: '/api/v1' });

apiRouter.post(
  '/auth/register',
  validate(registrationValidator()),
  registerUser
);
apiRouter.post('/auth/login', validate(loginValidator()), login);
apiRouter.get('/me', jwtAuth, me);

router.use(apiRouter.routes());
router.use(apiRouter.allowedMethods());

export default router;
