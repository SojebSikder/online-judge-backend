// external imports
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
//internal imports
import { PrismaService } from '../../providers/prisma/prisma.service';
import { UserRepository } from '../../common/repository/user/user.repository';

@Injectable()
export class AuthService extends PrismaClient {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {
    super();
  }

  async validateUser(
    email: string,
    pass: string,
    isAdmin: boolean,
  ): Promise<any> {
    const _password = pass;

    if (isAdmin) {
      const user = await this.prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (user) {
        if (!user.is_admin) {
          throw new UnauthorizedException('Only admin can access here');
        } else {
          const _isValidPassword = await bcrypt.compare(
            _password,
            user.password,
          );
          if (_isValidPassword) {
            const { password, ...result } = user;
            return result;
          } else {
            throw new UnauthorizedException('Password not matched');
          }
        }
      } else {
        throw new UnauthorizedException('User not found');
      }
    } else {
      const user = await this.prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (user) {
        const _isValidPassword = await bcrypt.compare(_password, user.password);
        if (_isValidPassword) {
          const { password, ...result } = user;
          return result;
        } else {
          throw new UnauthorizedException('Password not matched');
        }
      } else {
        throw new UnauthorizedException('User not found');
      }
    }
  }

  async login({ email, userId }) {
    const payload = { email: email, sub: userId };
    const token = this.jwtService.sign(payload);

    // update last login
    await UserRepository.updateUserLastLogin({ userId: userId });

    return {
      // access_token: token,
      message: 'Logged in successfully',
      authorization: {
        token: token,
        type: 'bearer',
      },
    };
  }

  async register({ username, email, password }) {
    // Check if email and username is exists
    const userEmailExist = await UserRepository.exist({
      field: 'email',
      value: String(email),
    });

    if (userEmailExist) {
      return {
        statusCode: 401,
        message: 'Email already exist',
      };
    }

    const userUserExist = await UserRepository.exist({
      field: 'username',
      value: String(username),
    });

    if (userUserExist) {
      return {
        statusCode: 401,
        message: 'Username already exist',
      };
    }

    // create a tenant admin (main subscriber)
    const user = await UserRepository.createUser({
      username: username,
      email: email,
      password: password,
    });

    return {
      statusCode: 401,
      message: 'User created successfully',
    };
  }
}
