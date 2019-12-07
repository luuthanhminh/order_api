import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
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
    })],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, JwtStrategy],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //   .apply(AppMiddleware)
  //   .forRoutes({ path: '*', method: RequestMethod.ALL });
  // }
}
