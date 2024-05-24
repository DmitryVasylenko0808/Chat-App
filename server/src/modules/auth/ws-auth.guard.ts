import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from "express";
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Socket } from "socket.io";
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<Socket>();
    const token = this.extractToken(client);

    // console.log(token);

    if (!token) {
      throw new UnauthorizedException("You are not authorized");
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        { secret: jwtConstants.secret }
      );

      const req = context.switchToHttp().getRequest();
      req.user = payload;
    } catch (err) {
      throw new WsException(err.message);
    }

    return true;
  }

  private extractToken(client: Socket) {
    console.log(client.handshake?.headers?.authorization);
    const queryToken = client.handshake?.headers?.authorization ?? "";
    const [type, token] = queryToken.split(" ") ?? [];

    return type === "Bearer" ? token : null;
  }
}
