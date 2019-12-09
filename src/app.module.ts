import { Module, NestModule, MiddlewareConsumer, RequestMethod, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Contact } from './models/contact.entity';
import { User, Category, Food, Notification, Store } from './models';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './controllers/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './middlewares/jwt.strategy';
import { HomeController } from './controllers/home/home/home.controller';
import { HomeService } from './controllers/home/home/home.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/models/*.entity{.ts,.js}'],
      synchronize: true,
 }),
    TypeOrmModule.forFeature([Contact, User, Category, Food, Notification, Store]),
    PassportModule,
    JwtModule.register({
      secret: 'mystrongsecretkey',
      signOptions: { expiresIn: '3600s' },
    }), HttpModule,
  ],
  controllers: [AppController, UserController, HomeController],
  providers: [AppService, UserService, JwtStrategy, HomeService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //   .apply(AppMiddleware)
  //   .forRoutes({ path: '*', method: RequestMethod.ALL });
  // }
}
