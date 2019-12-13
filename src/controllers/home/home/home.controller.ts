import { Controller, UseGuards, Get, Param, Res, Query } from '@nestjs/common';
import { BaseController } from '../../base.contrller';
import { HomeService } from './home.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiTags, ApiQuery } from '@nestjs/swagger';
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
    async getCategoryInfo(@Param('categoryId') categoryId: string, @Res() res: Response) {
        this.handleResult(res, await this.homeService.getCategoryInfo(categoryId));
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('search')
    @ApiBearerAuth()
    @ApiQuery({ name: 'keyword'})
    async search(@Query('keyword') keyword: string, @Res() res: Response) {
        this.handleResult(res, await this.homeService.search(keyword));
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('menu/:deliveryId')
    @ApiBearerAuth()
    @ApiParam({ name: 'deliveryId'})
    async getMenus(@Param('deliveryId') deliveryId: string, @Res() res: Response) {
        this.handleResult(res, await this.homeService.getMenus(deliveryId));
    }
}
