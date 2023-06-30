import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UcodeRepository } from '../../../common/repository/ucode/ucode.repository';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import {
  AbilityFactory,
  Action,
} from '../../../providers/ability/ability.factory';
import { CheckAbilities } from '../../../providers/ability/abilities.decorator';
import { AbilitiesGuard } from '../../../providers/ability/abilities.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEnum } from './entities/user.entity';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly abilityFactory: AbilityFactory,
  ) {}

  @ApiOperation({ summary: 'Get current user profile info' })
  @ApiResponse({ schema: { enum: [UserEnum] } })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req) {
    const data = await this.userService.me({ userId: req.user.userId });
    if (data) {
      return {
        data: data,
      };
    } else {
      return {
        error: true,
      };
    }
  }

  @ApiOperation({ summary: 'Get user profile info' })
  @ApiResponse({ schema: { enum: [UserEnum] } })
  @UseGuards(JwtAuthGuard)
  @Get('profile/:username')
  async profile(@Req() req) {
    const userId = req.user.userId;

    const data = await this.userService.profileDetails({ userId: userId });
    if (data) {
      return {
        data: data,
      };
    } else {
      return {
        error: true,
      };
    }
  }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Delete, subject: 'User' })
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    return await this.userService.remove(+id, req);
  }

  // set new password via tenant invitation link
  @ApiOperation({ summary: 'Set new password' })
  @Patch(':id/password')
  async setPassword(@Req() req, @Param('id') id: number, @Body() body: any) {
    try {
      const token = body.token;
      const email = body.email;
      const password = body.password;

      if (!password) {
        if (password.length < 6) {
          return {
            error: true,
            message: 'Password must be at least 6 digit long!',
          };
        }
        return {
          error: true,
          message: 'Password not provided!',
        };
      }
      if (!email) {
        return {
          error: true,
          message: 'Email not provided!',
        };
      }
      if (!token) {
        return {
          error: true,
          message: 'Token not provided!',
        };
      }

      // validate token
      const validate = await UcodeRepository.validateToken({
        token: token,
        email: email,
      });
      if (validate) {
        // set new password
        const data = await this.userService.setPassword({
          userId: id,
          password: password,
        });
        if (data) {
          return {
            message: 'Password changed successfully',
          };
        } else {
          return {
            error: true,
            message: 'Password not changed',
          };
        }
      } else {
        return {
          error: true,
          message: 'Token invalid',
        };
      }
    } catch (error) {
      throw error;
      // return {
      //   error: true,
      //   message: 'Something went wrong :(',
      // };
    }
  }
}
