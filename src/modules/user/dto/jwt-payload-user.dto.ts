import { AppRoles } from '@/app.roles';
import { UserModel } from '@user/dto';

export type IJwtUser = Pick<UserModel, 'id' | 'username' | 'roles' | 'email'>;

export class JwtUser implements IJwtUser {
    id: string;
    username: string;
    roles: AppRoles[];
    email: string;
}
