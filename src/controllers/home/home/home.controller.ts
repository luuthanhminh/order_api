import { Controller, UseGuards, Get, Param, Res } from '@nestjs/common';
import { BaseController } from '../../base.contrller';
import { HomeService } from './home.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('api/home')
export class HomeController extends BaseController {
    constructor(private homeService: HomeService) {
        super();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('categories')
    @ApiBearerAuth()
    async getCurrentUser(@Res() res: Response) {
        this.handleResult(res, await this.homeService.getCategories());
    }

    @Get('dashboard')
    @ApiBearerAuth()
    async getDashboard(@Res() res: Response) {
        this.handleResult(res, await this.homeService.getHomeInfo());
    }
}
