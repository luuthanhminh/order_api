import { Controller, Get, Post, Put, Req, Res, HttpStatus, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { BaseController } from '../base.contrller';
import { LoginBindingModel } from '../../data/bindings/login.model';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { RegisterBindingModel } from '../../data/bindings/register.model';
import { UpdateUserBindingModel } from '../../data/bindings/update.user.model';

@ApiTags('User')
@Controller('api/user')
export class UserController extends BaseController {
    constructor(private userService: UserService) {
        super();
    }

    @Post('login')
    async login(@Body() model: LoginBindingModel, @Res() res: Response) {
        this.handleResult(res, await this.userService.login(model.email, model.password));
    }

    @Post('register')
    async register(@Body() model: RegisterBindingModel, @Res() res: Response) {
        this.handleResult(res, await this.userService.register(model));
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('current')
    @ApiBearerAuth()
    async getCurrentUser(@Request() req, @Res() res: Response) {
        this.handleResult(res, await this.userService.getUser(req.user.userId));
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('current')
    @ApiBearerAuth()
    async updateCurrentUser(@Request() req, @Body() model: UpdateUserBindingModel, @Res() res: Response) {
        this.handleResult(res, await this.userService.updateUser(req.user.userId, model));
    }
}
