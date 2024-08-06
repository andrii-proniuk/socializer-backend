import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { InnerRequest } from '../interfaces/inner-request.interface';

export const Locals = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<InnerRequest>();

    return request.locals[data];
  },
);
