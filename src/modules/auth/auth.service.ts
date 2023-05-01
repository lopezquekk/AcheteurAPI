import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/entities';
import { TokenPayload } from './models/token.model';
import { CreateUserDto } from '../user/dtos/create.user.dto';
import { RefreshTokenDto } from './dtos/refreshToken.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findActiveUserByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return user;
    }
    return null;
  }

  loginUser(user: User) {
    return this.userService.buildUserRO(user);
  }

  generateJWT(user: User) {
    const payload: TokenPayload = {
      role: '',
      sub: user.email,
      userId: user.userId,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  createUser(createUserDTO: CreateUserDto) {
    return this.userService.createUser(createUserDTO);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<any> {
    const user = await this.jwtService.decode(refreshTokenDto.token);
    if (user['email'] && user['userId']) {
      const newUser = new User();
      newUser.email = user['email'];
      newUser.userId = user['userId'];
      return this.generateJWT(newUser);
    }
    return new NotFoundException('Error: token not found');
  }
}
