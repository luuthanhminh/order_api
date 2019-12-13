import { ApiProperty } from '@nestjs/swagger';

export class RegisterBindingModel {

    @ApiProperty({
        type: String,
        format: 'email',
    })
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;
}
