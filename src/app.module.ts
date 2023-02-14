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
    host:process.env.DATABASE_HOST,
    port:  5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
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
