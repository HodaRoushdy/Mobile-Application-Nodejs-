import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhotoDB } from './entities/photo-entity';
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
