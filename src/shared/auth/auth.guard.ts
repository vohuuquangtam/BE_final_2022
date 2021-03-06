import { AppRoles } from '@/app.roles';
import { jwtSecretKey } from '@/config';
import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRepository } from '@user/repositories';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly userRepository: UserRepository) {}

    async attachUser(authorization: string): Promise<any> {
        if (!authorization) {
            return this.userRepository.create({ roles: [AppRoles.GUEST] });
        } else {
            return await this.validateToken(authorization);
        }
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (request) {
            // for JWT authen
            const { authorization } = request.headers;

            request.user = await this.attachUser(authorization);

            return true;
        } else {
            // for GraphQL authen
            const ctx: any = GqlExecutionContext.create(context).getContext();
            const { authorization } = ctx.headers;

            ctx.user = await this.attachUser(authorization);

            return true;
        }
    }

    async validateToken(auth: string): Promise<any> {
        const [tokenType, token] = auth.split(' ');
        if (tokenType !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
        }
        try {
            const decode = await jwt.verify(token, jwtSecretKey);
            return decode;
        } catch (e) {
            const message = `Token error: ${e.message || e.name}`;
            throw new HttpException(message, HttpStatus.FORBIDDEN);
        }
    }
}
