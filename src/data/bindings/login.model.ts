import { ApiProperty } from '@nestjs/swagger';

export class LoginBindingModel {

    @ApiProperty({
        type: String,
        format: 'email',
    })
    email: string;

    @ApiProperty()
    password: string;
}
