import {IsEnum} from "class-validator";

enum Roles {
    Admin = 'admin',
    User = 'user',
}

export class UpdateUserAdminDto {
    @IsEnum(Roles)
    public role?: Roles;
}