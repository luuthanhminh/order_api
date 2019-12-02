import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Contact } from '../../models/contact.entity'

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Get()
    index(): Promise<Contact[]> {
      return this.catsService.findAll();
    }
}
