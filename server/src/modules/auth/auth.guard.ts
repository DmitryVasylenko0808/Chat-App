import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from "express";
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractToken(req);

    if (!token) {
      throw new UnauthorizedException("You are not authorized");
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        { secret: jwtConstants.secret }
      );

      req.user = payload;
    } catch {
      throw new UnauthorizedException("You are not authorized");
    }

    return true;
  }

  private extractToken(req: Request) {
    const [type, token] = req.headers.authorization?.split(" ") ?? [];

    return type === "Bearer" ? token : null;
  }
}
