import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from 'src/entities/users.entity';
import { LocalAuthGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req) {
    console.log('entra al controller');
    const user = req.user as Users;
    return this.authService.generateJWT(user);
  }
}
