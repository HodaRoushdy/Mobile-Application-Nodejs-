import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { response } from 'express';
import { AppService } from './app.service';
import { PhotoDB } from './entities/photo-entity';
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "dbvljyvwc",
  api_key: "654358893113948",
  api_secret: "f_eeEEzuJ9aj8qTNagGFd_JEmbs"
});

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('photos')
  getPhotos(): Promise<PhotoDB[]> {
    return this.appService.getPhotos();
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('photo'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const res = await cloudinary.uploader.upload(file.path)
    return await this.appService.uploadPhoto((res.secure_url))
}
}
