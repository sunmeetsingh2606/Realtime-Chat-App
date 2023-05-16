import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IRequestUser {
  _id: string;
}

export const User = createParamDecorator((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.user as IRequestUser;
});