import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { PhotoDB } from './entities/photo-entity';
import {v2} from 'cloudinary'
v2.config({
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
    const res = await v2.uploader.upload(file.path)
    return await this.appService.uploadPhoto((res.secure_url))
}
}
