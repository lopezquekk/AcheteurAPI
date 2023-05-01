import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/entities/entities';
import { LocalAuthGuard } from './local.guard';
import { CreateUserDto } from '../user/dtos/create.user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RefreshTokenDto } from './dtos/refreshToken.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ description: 'loggin a user by using email and password' })
  login(@Req() req) {
    const user = req.user as User;
    return this.authService.loginUser(user);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createUsers(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshToken: RefreshTokenDto) {
    return await this.authService.refreshToken(refreshToken);
  }
}
