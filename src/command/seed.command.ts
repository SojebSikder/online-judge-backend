// external imports
import { Command, CommandRunner } from 'nest-commander';
import { StringHelper } from '../common/helper/string.helper';
// internal imports
import { UserRepository } from '../common/repository/user/user.repository';
import { PrismaService } from '../providers/prisma/prisma.service';

@Command({ name: 'seed', description: 'prisma db seed' })
export class SeedCommand extends CommandRunner {
  constructor(private readonly prisma: PrismaService) {
    super();
  }
  async run(passedParam: string[]): Promise<void> {
    await this.seed(passedParam);
  }

  async seed(param: string[]) {
    try {
      console.log(`Prisma Env: ${process.env.PRISMA_ENV}`);
      console.log('Seeding started...');

      // begin transaaction
      await this.prisma.$transaction(async ($tx) => {
        await this.roleSeed();
        await this.permissionSeed();
        await this.userSeed();
        await this.roleUserSeed();
        await this.permissionRoleSeed();
      });

      console.log('Seeding done.');
    } catch (error) {
      throw error;
    }
  }

  //---- user section ----
  async userSeed() {
    // system admin, user id: 1
    await UserRepository.createSuAdminUser({
      username: 'admin',
      email: 'admin@example.com',
      password: '123',
    });

    // user id: 2
    await UserRepository.createUser({
      username: 'sojebsikder',
      email: 'sojebsikder@gmail.com',
      password: '123',
    });
  }

  async roleUserSeed() {
    await this.prisma.roleUser.create({
      data: {
        user_id: 1,
        role_id: 1,
      },
    });
    await this.prisma.roleUser.create({
      data: {
        user_id: 2,
        role_id: 1,
      },
    });
    // await this.prisma.roleUser.create({
    //   data: {
    //     user_id: 2,
    //     role_id: 2,
    //   },
    // });
  }

  async permissionSeed() {
    let i = 0;
    const permissions = [];

    const permissionGroups: (
      | {
          title: string;
          subject: string;
          scope?: undefined;
        }
      | {
          title: string;
          subject: string;
          scope: string[];
        }
    )[] = [
      { title: 'user_management', subject: 'User' },
      { title: 'role_management', subject: 'Role' },
    ];

    for (const permissionGroup of permissionGroups) {
      if (permissionGroup.scope) {
        for (const permission of permissionGroup.scope) {
          permissions.push({
            id: ++i,
            title: permissionGroup.title + '_' + permission,
            action: StringHelper.cfirst(permission),
            subject: permissionGroup.subject,
          });
        }
      } else {
        for (const permission of [
          'read',
          'create',
          'update',
          'show',
          'delete',
        ]) {
          permissions.push({
            id: ++i,
            title: permissionGroup.title + '_' + permission,
            action: StringHelper.cfirst(permission),
            subject: permissionGroup.subject,
          });
        }
      }
    }

    await this.prisma.permission.createMany({
      data: permissions,
    });
  }

  async permissionRoleSeed() {
    const all_permissions = await this.prisma.permission.findMany();

    // admin
    const tenant_admin_permissions = all_permissions.filter(function (
      permission,
    ) {
      return permission.title.substring(0, 25) != 'system_tenant_management_';
    });

    const tenantAdminPermissionRoleArray = [];
    for (const admin_permission of tenant_admin_permissions) {
      tenantAdminPermissionRoleArray.push({
        role_id: 2,
        permission_id: admin_permission.id,
      });
    }
    await this.prisma.permissionRole.createMany({
      data: tenantAdminPermissionRoleArray,
    });

    // //
    // const tenant_user_permissions = all_permissions.filter(function (
    //   permission,
    // ) {
    //   return (
    //     permission.title.substring(0, 17) == 'asset_management_' ||
    //     permission.title.substring(0, 17) == 'image_management_' ||
    //     permission.title.substring(0, 20) == 'document_management_' ||
    //     permission.title.substring(0, 16) == 'note_management_'
    //   );
    // });

    // const tenantUserPermissionRoleArray = [];
    // for (const user_permission of tenant_user_permissions) {
    //   tenantUserPermissionRoleArray.push({
    //     role_id: 3,
    //     permission_id: user_permission.id,
    //   });
    // }
    // await this.prisma.permissionRole.createMany({
    //   data: tenantUserPermissionRoleArray,
    // });
    // //
  }

  async roleSeed() {
    await this.prisma.role.createMany({
      data: [
        // system role
        {
          id: 1,
          title: 'Super Admin', // system admin, do not assign to a tenant/user
          name: 'su-admin',
        },
        // organization role
        {
          id: 2,
          title: 'Admin',
          name: 'admin',
        },
        // workspace role
      ],
    });
  }
}
