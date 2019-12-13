import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserBindingModel {

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    avatar: string;
}
