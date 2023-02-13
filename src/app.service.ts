import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhotoDB } from './entities/photo-entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { response } from 'express';
import {UploadedFile, UseInterceptors } from '@nestjs/common';
const cloudinary = require('cloudinary').v2;

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(PhotoDB)
    private photoRepository: Repository<PhotoDB>,
  ) { }
  getHello(): string {
    return 'Hello World!';
  }
  async getPhotos(): Promise<PhotoDB[]> {
    return await this.photoRepository.find({})
  }
  async uploadPhoto (url:string){
    const res = await this.photoRepository.insert({url:url})
    if(res){
      return {message:'success'}
    }else{
      throw new NotFoundException({err:'oops'})
    }
  }
  
}
