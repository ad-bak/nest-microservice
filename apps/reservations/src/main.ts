import { NestFactory } from '@nestjs/core';

import { config } from 'dotenv';
import { ReservationsModule } from './reservations.module';

config();

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  await app.listen(3000);
}
bootstrap();
