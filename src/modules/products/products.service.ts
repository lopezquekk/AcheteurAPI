import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) private productRepo: Repository<Products>,
  ) {}

  findAll(limit = 20, offset = 20) {
    return this.productRepo.find({
      relations: ['users'],
      take: limit,
      skip: offset,
    });
  }
}
