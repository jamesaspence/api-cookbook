import Joi, { AnySchema, ObjectSchema, ValidationErrorItem } from 'joi';
import { AppContext, AppMiddleware } from '../../types';
import { Next } from 'koa';

export const validate = (
  schema: { [key: string]: AnySchema } | ObjectSchema
): AppMiddleware => {
  return async (ctx: AppContext, next: Next): Promise<any> => {
    let form: any;
    if (ctx.req.method === 'GET') {
      form = ctx.request.query;
    } else {
      form = ctx.request.body;
    }

    const { error, value } = Joi.compile(schema).validate(form, {
      abortEarly: false,
    });

    if (error != null) {
      const reducer = (acc: any, detail: ValidationErrorItem) => {
        acc[detail.path[0]] = detail.message;
        return acc;
      };
      const errors = error.details.reduce(reducer, {});
      ctx.status = 422;
      ctx.body = {
        errors,
      };
      return;
    }

    ctx.state.form = value;

    return next();
  };
};
