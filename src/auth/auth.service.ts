import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/entities/users.entity';
import { TokenPayload } from './models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    console.log(email);
    console.log(password);
    console.log('validate User');
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return user;
    }
    return null;
  }

  generateJWT(user: Users) {
    const payload: TokenPayload = { role: '', sub: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
