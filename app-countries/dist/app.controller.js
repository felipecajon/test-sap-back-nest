"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const contry_dto_1 = require("./model/contry.dto");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async getCountries(req, res) {
        const { lang } = req.query;
        const isAuthorized = req.authInfo.checkLocalScope('read');
        console.log('isAuthorized: ' + isAuthorized);
        if (req.authInfo.checkLocalScope('read')) {
            const response = await this.appService.getCountries(lang);
            console.log('RESPONSE');
            console.log(response);
            const countries = response.data.map((item) => new contry_dto_1.CountryDTO(item.name, item.capital, item.region, item.subregion, item.flags.png));
            return countries;
        }
        else {
            console.log('Missing the expected scope');
            return res.status(403).end('Forbidden');
        }
        try {
            const response = await this.appService.getCountries(lang);
            console.log('RESPONSE');
            console.log(response);
            const countries = response.data.map((item) => new contry_dto_1.CountryDTO(item.name, item.capital, item.region, item.subregion, item.flags.png));
            return countries;
        }
        catch (error) {
            return error;
        }
    }
};
__decorate([
    (0, common_1.Get)('countries'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getCountries", null);
AppController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map