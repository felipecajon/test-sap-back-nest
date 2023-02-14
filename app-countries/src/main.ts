import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getServices } from '@sap/xsenv';
import * as passport from 'passport';
import { JWTStrategy } from '@sap/xssec';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const isProd = process.env.PORT;

if (isProd) {
  const xsuaa = getServices({ xsuaa: { tag: 'xsuaa' } }).xsuaa;
  passport.use(new JWTStrategy(xsuaa));
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Contries Services')
    .setDescription('APIs for Contries Services')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Contries Services')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(passport.initialize());
  app.use(passport.authenticate('JWT', { session: false }));

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
