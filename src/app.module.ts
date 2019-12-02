import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './controllers/cats/cats.controller';
import { CatsService } from './controllers/cats/cats.service';
import { Contact } from './models/contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/models/*.entity{.ts,.js}'],
      synchronize: true,
 })],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {}
