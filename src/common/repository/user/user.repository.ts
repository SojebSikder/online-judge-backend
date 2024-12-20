import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import appConfig from '../../../config/app.config';
import { DateHelper } from '../../../common/helper/date.helper';

const prisma = new PrismaClient();

export class UserRepository {
  /**
   * get user details
   * @returns
   */
  static async getUserDetails(userId: number) {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },
      include: {
        role_users: {
          include: {
            role: {
              include: {
                permission_roles: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return user;
  }

  /**
   * Check existance
   * @returns
   */
  static async exist({ field, value }) {
    const model = await prisma.user.findFirst({
      where: {
        [field]: value,
      },
    });
    return model;
  }

  /**
   * Create su admin user
   * @param param0
   * @returns
   */
  static async createSuAdminUser({ username, email, password }) {
    try {
      password = await bcrypt.hash(password, appConfig().security.salt);

      const user = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: password,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * create user under a tenant
   * @param param0
   * @returns
   */
  static async createUser({
    username,
    email,
    password,
    isAdmin = 0,
  }: {
    username: string;
    email: string;
    password: string;
    isAdmin?: number;
  }) {
    try {
      password = await bcrypt.hash(password, appConfig().security.salt);
      const user = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: password,
          is_admin: isAdmin,
        },
      });
      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateUserLastLogin({ userId }) {
    try {
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          last_logged_in: DateHelper.now(),
        },
      });

      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
}
