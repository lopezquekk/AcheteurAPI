import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create.user.dto';
import * as bcrypt from 'bcrypt';
import { CountryService } from '../country/country.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(CountryService)
    private readonly countryService: CountryService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    const country = await this.countryService.findCountry(user.countryId);
    if (!country) {
      return new NotFoundException('Country not found');
    }
    newUser.country = country;
    const userExist = await this.validateUserExist(user.email, user.username);
    if (userExist) {
      return new NotFoundException('User already created');
    }

    const userGenerated = await this.userRepository.save(newUser);

    return this.buildUserRO(userGenerated);
  }

  async validateUserExist(email: string, username: string) {
    const users = await this.userRepository.find({
      where: [{ email: email }, { username: username }],
    });
    return users.length > 0;
  }

  async findById(id: string) {
    const user = await this.userRepository.findOneBy({ userId: id });
    if (user) {
      return new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findActiveUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email: email, isActive: true },
    });
  }

  buildUserRO(user: User) {
    const token = this.authService.generateJWT(user);
    const userRO = {
      id: user.userId,
      username: user.username,
      email: user.email,
      country: user.country,
      token: token.access_token,
      isActive: user.isActive,
      isConfirmed: user.isConfirmed,
    };

    return { user: userRO };
  }
}
