import { Controller, UseGuards, Get, Param, Res } from '@nestjs/common';
import { BaseController } from '../../base.contrller';
import { HomeService } from './home.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Home')
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

    @UseGuards(AuthGuard('jwt'))
    @Get('dashboard')
    @ApiBearerAuth()
    async getDashboard(@Res() res: Response) {
        this.handleResult(res, await this.homeService.getHomeInfo());
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('categories/:categoryId')
    @ApiBearerAuth()
    @ApiParam({ name: 'categoryId'})
    async getCategoryInfo(@Param() params, @Res() res: Response) {
        this.handleResult(res, await this.homeService.getCategoryInfo(params.categoryId));
    }
}
