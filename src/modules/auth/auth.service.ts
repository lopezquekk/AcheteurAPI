import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/entities/users.entity';
import { TokenPayload } from './models/token.model';
import { CreateUserDto } from '../user/dtos/create.user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return user;
    }
    return null;
  }

  generateJWT(user: Users) {
    const payload: TokenPayload = {
      role: '',
      sub: user.email,
      userId: user.userId,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  createUser(createUserDTO: CreateUserDto) {
    return this.userService.createUser(createUserDTO);
  }
}
