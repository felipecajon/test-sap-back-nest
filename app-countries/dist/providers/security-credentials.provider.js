"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCredentials = void 0;
const xsenv = require("@sap/xsenv");
const xsCredentials = xsenv.cfServiceCredentials({ tag: 'xsuaa' });
exports.ServiceCredentials = [
    {
        clientId: xsCredentials.clientid,
        clientSecret: xsCredentials.clientsecret,
        url: xsCredentials.url,
    },
];
//# sourceMappingURL=security-credentials.provider.js.map