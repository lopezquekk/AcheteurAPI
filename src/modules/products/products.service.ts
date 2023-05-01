import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products, User } from 'src/entities/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) private productRepo: Repository<Products>,
  ) {}

  findAll(limit = 10, offset = 1, userId: string) {
    return this.productRepo.find({
      relations: ['user'],
      where: {
        user: {
          userId: userId,
        },
      },
      take: limit,
    });
  }
}
