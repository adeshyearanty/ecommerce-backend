import { BadRequestException } from "./errorCodes.js";

export async function handlePromiseErrors(promise) {
  try {
    const data = await promise();
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}

export async function resolveAsync(promise) {
  try {
    const data = await promise();
    return { data, error: null, success: true };
  } catch (error) {
    return { data: null, error, success: false };
  }
}

export async function prepareResponse(promise) {
  return resolveAsync(promise);
}

export function handleResponse(asyncFunction) {
  return async (req, res, next) => {
    const { data, error, success } = await prepareResponse(() =>
      asyncFunction(req.body, req.params, req, res)
    );

    if (error) return next(error);

    res.status(200).json({ data, error: null, success, status: 200 });
  };
}

export function compileMiddlewares(...middlewares) {
  return async (req, res, next) => {
    for (const middleware of middlewares) {
      const [, error] = await handlePromiseErrors(() =>
        middleware(req.body, res, next, req.params, req)
      );
      if (error) return next(error);
    }
    next();
  };
}

export function sanitizeRequestBody(schema) {
  return async function (req, _res, next) {
    const [, error] = await handlePromiseErrors(() =>
      schema.validateAsync(req.body)
    );
    if (error) next(new BadRequestException(error.message));
    else next();
  };
}
