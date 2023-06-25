// external imports
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

// internal imports
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(helmet());
  // swagger
  const options = new DocumentBuilder()
    .setTitle(`${process.env.APP_NAME} api`)
    .setDescription(`${process.env.APP_NAME} api docs`)
    .setVersion('1.0')
    .addTag(`${process.env.APP_NAME}`)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
  // end swagger
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
