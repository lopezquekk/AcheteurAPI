import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findUsersById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findById(id);
  }
}
