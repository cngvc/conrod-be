import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from 'auth/decorators/roles.decorator';
import { RequestUser } from 'auth/interfaces/request-user.interface';
import { Role } from 'auth/roles/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requestedRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requestedRoles) return true;
    const request = context.switchToHttp().getRequest<Request>();
    const user = request['user'] as RequestUser;
    if (user?.role === Role.ADMIN) return true;

    const hasRequiredRole = requestedRoles.some((e) => e === user?.role);
    return hasRequiredRole;
  }
}
