"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const xsenv_1 = require("@sap/xsenv");
const passport = require("passport");
const xssec_1 = require("@sap/xssec");
const swagger_1 = require("@nestjs/swagger");
const xsuaa = (0, xsenv_1.getServices)({ xsuaa: { tag: 'xsuaa' } }).xsuaa;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Logistics Service')
        .setDescription('APIs for logistics service')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Logistics Service')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    passport.use(new xssec_1.JWTStrategy(xsuaa));
    app.use(passport.initialize());
    app.use(passport.authenticate('JWT', { session: false }));
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map