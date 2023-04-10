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
      await this.userService.findUsersById(value);
      console.log('pasa');
    } catch (e) {
      console.log('pasa1');
      console.log(e);
      return false;
    }
    console.log('pasa2');
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Country doesn't exist`;
  }
}
