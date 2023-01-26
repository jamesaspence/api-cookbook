import { DefaultState, Middleware, ParameterizedContext } from 'koa';

export type Nullable<T> = T | null;

export type AppState = DefaultState;

export type AppContext = ParameterizedContext & {
  state: AppState;
};

export type AppMiddleware<
  StateT extends AppState = AppState,
  ContextT extends AppContext = AppContext,
  ResponseT = any
> = Middleware<StateT, ContextT, ResponseT>;
