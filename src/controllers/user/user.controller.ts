import { Controller, Get, Post, Req, Res, HttpStatus, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { BaseController } from '../base.contrller';
import { LoginBindingModel } from '../../data/bindings/login.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/user')
export class UserController extends BaseController {
    constructor(private userService: UserService) {
        super();
    }

    @Post('login')
    async login(@Body() model: LoginBindingModel, @Res() res: Response) {
        //setTimeout( async () => {this.handleResult(res, await this.userService.login(model.email, model.password)); } , 10000);
        this.handleResult(res, await this.userService.login(model.email, model.password));
    }

    @Post('register')
    async register(@Body() model: LoginBindingModel, @Res() res: Response) {
        this.handleResult(res, await this.userService.register(model.email, model.password));
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':userId')
    async getCurrentUser(@Param() params, @Res() res: Response) {
        this.handleResult(res, await this.userService.getUser(params.userId));
    }
}
