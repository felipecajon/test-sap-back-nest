import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getServices } from '@sap/xsenv';
import * as passport from 'passport';
import { JWTStrategy } from '@sap/xssec';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const xsuaa = getServices({ xsuaa: { tag: 'xsuaa' } }).xsuaa;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Logistics Service')
    .setDescription('APIs for logistics service')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Logistics Service')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  //HANA middleware
  // app.use(hana.middleware(hanacreds));
  //security
  passport.use(new JWTStrategy(xsuaa));
  app.use(passport.initialize());
  app.use(passport.authenticate('JWT', { session: false }));

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
