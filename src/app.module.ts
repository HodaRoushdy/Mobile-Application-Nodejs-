import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotoDB } from './entities/photo-entity';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host:'localhost',
    port: 5432,
    username: 'postgres',
    password: 'dody153',
    database: 'taskDB',
    entities: [PhotoDB],
    synchronize: true,
  }), 
  TypeOrmModule.forFeature([PhotoDB]),
  MulterModule.register({
    dest: './upload',
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
