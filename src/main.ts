import { NestFactory } from '@nestjs/core';
import { AIModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AIModule);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  app.enableCors();
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
}
bootstrap();
