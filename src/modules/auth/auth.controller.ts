import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register a user' })
  @Post('register')
  create(@Body() data) {
    const fname = data.fname;
    const lname = data.lname;
    const username = data.username;
    const email = data.email;
    const password = data.password;

    if (!fname) {
      throw new HttpException(
        'First name not provided',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (!lname) {
      throw new HttpException(
        'Last name not provided',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (!email) {
      throw new HttpException('Email not provided', HttpStatus.UNAUTHORIZED);
    }
    if (!password) {
      throw new HttpException('Password not provided', HttpStatus.UNAUTHORIZED);
    }

    return this.authService.register({
      fname: fname,
      lname: lname,
      username: username,
      email: email,
      password: password,
    });
  }

  @ApiOperation({ summary: 'Login user' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    const user = req.user;
    return this.authService.login({
      userId: user.id,
      email: user.email,
    });
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }
}
