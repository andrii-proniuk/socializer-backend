import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Socializer')
    .setDescription('The Socializer API description')
    .setVersion('0.0.1')
    .addBearerAuth(undefined, 'default')
    .addBearerAuth(undefined, 'refresh')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const configService = app.get(ConfigService);

  setupSwagger(app);

  await app.listen(configService.get<number>('port'));
}

bootstrap();
