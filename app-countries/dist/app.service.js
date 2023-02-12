"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const destination_provider_1 = require("./providers/destination.provider");
let AppService = class AppService {
    async getCountries(lang) {
        return new Promise((resolve, reject) => {
            destination_provider_1.destination
                .then((destinationObject) => {
                const url = destinationObject.url + lang;
                console.log('URL: ' + url);
                this.httpService(url)
                    .then((data) => {
                    console.log('DEU BOA!');
                    resolve(data);
                })
                    .catch((error) => {
                    console.log('DEU RUIM 1!');
                    reject(error.response.data);
                });
            })
                .catch((err) => {
                console.log('DEU RUIM 2!');
                reject(err);
            });
        });
    }
    async httpService(url, header = 'ssds') {
        try {
            const request = await axios_1.default.get(url);
            return request;
        }
        catch (error) {
            throw error;
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map