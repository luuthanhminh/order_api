import { ApiProperty } from '@nestjs/swagger';

export class LoginBindingModel {

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}
