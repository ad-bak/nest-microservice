import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get('MONGODB_URI');
        console.log(`Database URI: ${uri}`); // Debug log
        return { uri };
      },

      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
