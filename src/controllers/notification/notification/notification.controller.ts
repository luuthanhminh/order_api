import { Controller, UseGuards, Get, Res } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { BaseController } from '../../base.contrller';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@ApiTags('Notifications')
@Controller('api/notifications')
export class NotificationController extends BaseController {
    constructor(private notificationService: NotificationService) {
        super();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('promotions')
    @ApiBearerAuth()
    async getCurrentUser(@Res() res: Response) {
        this.handleResult(res, await this.notificationService.getPromotionNotificaton());
    }
}
