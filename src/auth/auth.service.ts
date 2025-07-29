import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService    
  ) {}

  async register(name: string, email: string, password: string) {
    const exists = await this.usersService.getUserByEmail(email);
    if (exists) throw new ConflictException('Email уже зарегистрирован');
    const hash = await bcrypt.hash(password, 10);
    const user = await this.usersService.sendUser({ name, email, password: hash });
    // Удаляем пароль из ответа
    const { password: _, ...safeUser } = user.toObject();
    return safeUser;
  }

  async login(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) throw new UnauthorizedException('Неверный email или пароль');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Неверный email или пароль');


    const { password: _, _id, ...rest } = user.toObject();

    const payload = { id: _id, email: user.email, name: user.name };
    const token = this.jwtService.sign(payload);

    return { user: { id: _id, ...rest }, token };
  }
}