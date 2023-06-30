import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { DateHelper } from '../../../common/helper/date.helper';
import { UcodeRepository } from '../../../common/repository/ucode/ucode.repository';
import { MailService } from '../../../providers/mail/mail.service';
import { UserRepository } from '../../../common/repository/user/user.repository';
import appConfig from '../../../config/app.config';
import { PrismaService } from '../../../providers/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService extends PrismaClient {
  constructor(
    private prisma: PrismaService,
    private readonly mailService: MailService,
  ) {
    super();
  }

  async me({ userId }) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        fname: true,
        lname: true,
        username: true,
        email: true,
        avatar: true,
        availability: true,
      },
    });

    if (user) {
      // const excludedData = PrismaHelper.exclude(user, ['password']);
      return user;
    } else {
      return false;
    }
  }

  async profileDetails({ userId }) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        fname: true,
        lname: true,
        username: true,
        email: true,
        avatar: true,
        availability: true,
        score: true,
        Profile: true,
      },
    });

    if (user) {
      return user;
    } else {
      return false;
    }
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    try {
      const data = {};
      if (updateUserDto.fname) {
        data['fname'] = updateUserDto.fname;
      }
      if (updateUserDto.lname) {
        data['lname'] = updateUserDto.lname;
      }
      if (updateUserDto.username) {
        data['username'] = updateUserDto.username;
      }
      // if (updateUserDto.email) {
      //   data['email'] = updateUserDto.email;
      // }

      const user = await this.prisma.user.updateMany({
        where: {
          AND: [
            {
              id: userId,
            },
          ],
        },
        data: {
          ...data,
        },
      });
      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  remove(id: number, userId) {
    return 'delete something';
  }

  async setPassword({ userId, password }) {
    userId = Number(userId);
    const hashedPasssword = await bcrypt.hash(
      password,
      appConfig().security.salt,
    );
    const user = await UserRepository.getUserDetails(userId);
    if (user) {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashedPasssword,
        },
      });
      return user;
    } else {
      return false;
    }
  }
}
