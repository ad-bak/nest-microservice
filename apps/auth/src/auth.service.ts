import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';

config();

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserDocument, response: Response) {
    const tokenPayload = {
      userId: user._id.toHexString(),
    };

    const jwtExpirationTime = parseInt(
      this.configService.get('JWT_EXPIRATION_TIME', '3600'),
      10,
    );

    if (isNaN(jwtExpirationTime)) {
      throw new Error('JWT_EXPIRATION_TIME is not a valid number');
    }

    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + jwtExpirationTime);

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
