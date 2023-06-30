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
        id: true,
        fname: true,
        lname: true,
        username: true,
        email: true,
        avatar: true,
        availability: true,
        score: true,
        created_at: true,
      },
    });

    const profile = await this.prisma.profile.findFirst({
      where: {
        user_id: user.id,
      },
    });

    user['profile'] = profile;

    if (user) {
      // const excludedData = PrismaHelper.exclude(user, ['password']);
      return user;
    } else {
      return false;
    }
  }

  async profileDetails({ username }: { username: string }) {
    const user = await this.prisma.user.findFirst({
      where: {
        username: username,
      },
      select: {
        id: true,
        fname: true,
        lname: true,
        username: true,
        email: true,
        avatar: true,
        availability: true,
        score: true,
        created_at: true,
      },
    });

    const profile = await this.prisma.profile.findFirst({
      where: {
        user_id: user.id,
      },
    });

    user['profile'] = profile;

    if (user) {
      return user;
    } else {
      return false;
    }
  }

  async update({
    userId,
    avatar,
    updateUserDto,
  }: {
    userId: number;
    avatar?: string;
    updateUserDto?: UpdateUserDto;
  }) {
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
      if (updateUserDto.email) {
        data['email'] = updateUserDto.email;
      }
      if (avatar) {
        data['avatar'] = avatar;
      }

      const profileData = {};

      if (updateUserDto.date_of_birth) {
        profileData['date_of_birth'] = new Date(updateUserDto.date_of_birth);
      }
      if (updateUserDto.country) {
        profileData['country'] = updateUserDto.country;
      }
      if (updateUserDto.city) {
        profileData['city'] = updateUserDto.city;
      }
      if (updateUserDto.organization) {
        profileData['organization'] = updateUserDto.organization;
      }

      if (updateUserDto.recipient_name) {
        profileData['recipient_name'] = updateUserDto.recipient_name;
      }
      if (updateUserDto.recipient_zip_code) {
        profileData['recipient_zip_code'] = updateUserDto.recipient_zip_code;
      }
      if (updateUserDto.recipient_country) {
        profileData['recipient_country'] = updateUserDto.recipient_country;
      }
      if (updateUserDto.recipient_state) {
        profileData['recipient_state'] = updateUserDto.recipient_state;
      }
      if (updateUserDto.recipient_city) {
        profileData['recipient_city'] = updateUserDto.recipient_city;
      }
      if (updateUserDto.recipient_address) {
        profileData['recipient_address'] = updateUserDto.recipient_address;
      }
      if (updateUserDto.recipient_phone_number) {
        profileData['recipient_phone_number'] =
          updateUserDto.recipient_phone_number;
      }

      const user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...data,
        },
      });

      if (user) {
        const profileExist = await this.prisma.profile.findFirst({
          where: {
            user_id: userId,
          },
        });

        if (profileExist) {
          await this.prisma.profile.updateMany({
            where: {
              user_id: userId,
            },
            data: {
              ...profileData,
            },
          });
        } else {
          await this.prisma.profile.create({
            data: {
              user_id: userId,
              ...profileData,
            },
          });
        }

        return user;
      } else {
        return false;
      }
    } catch (error) {
      // return false;
      throw error;
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
