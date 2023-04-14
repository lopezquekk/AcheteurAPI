import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UserService } from './../user/user.service';

@ValidatorConstraint({ name: 'CountryExists', async: true })
@Injectable()
export class CountryExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}
  async validate(value: string) {
    try {
      await this.userService.findById(value);
    } catch (e) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Country doesn't exist`;
  }
}
