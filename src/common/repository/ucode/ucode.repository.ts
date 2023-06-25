import { PrismaClient } from '@prisma/client';
import { DateHelper } from '../../../common/helper/date.helper';
import { v4 as uuid } from 'uuid';
import { UserRepository } from '../user/user.repository';

const prisma = new PrismaClient();

export class UcodeRepository {
  /**
   * create ucode token
   * @returns
   */
  static async createToken({ userId, expired_at = null }) {
    const userDetails = await UserRepository.getUserDetails(userId);
    if (userDetails && userDetails.email) {
      const token = uuid();
      const data = await prisma.ucode.create({
        data: {
          user_id: userId,
          token: token,
          email: userDetails.email,
          expired_at: expired_at,
        },
      });
      return data.token;
    } else {
      return false;
    }
  }

  /**
   * validate ucode token
   * @returns
   */
  static async validateToken({ email, token }) {
    const userDetails = await UserRepository.exist({
      field: 'email',
      value: email,
    });
    if (userDetails && userDetails.email) {
      const date = DateHelper.now().toISOString();
      const existToken = await prisma.ucode.findFirst({
        where: {
          AND: {
            token: token,
            email: email,
          },
        },
      });
      if (existToken) {
        if (existToken.expired_at) {
          const data = await prisma.ucode.findFirst({
            where: {
              AND: [
                {
                  token: token,
                },
                {
                  email: email,
                },
                {
                  expired_at: {
                    gte: date,
                  },
                },
              ],
            },
          });
          if (data) {
            // delete this token
            await prisma.ucode.delete({
              where: {
                id: data.id,
              },
            });
            return true;
          } else {
            return false;
          }
        } else {
          // delete this token
          await prisma.ucode.delete({
            where: {
              id: existToken.id,
            },
          });
          return true;
        }
      }
    } else {
      return false;
    }
  }
}
