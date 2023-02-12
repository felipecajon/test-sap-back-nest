"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destination = void 0;
const core_1 = require("@sap-cloud-sdk/core");
const destionationObject = (0, core_1.useOrFetchDestination)({
    destinationName: 'countries',
})
    .then((destination) => {
    console.log('DESTINATION');
    console.log(destination);
    return destination;
})
    .catch((err) => {
    console.log('ERROR');
    console.log(err);
    return err;
});
exports.destination = destionationObject;
//# sourceMappingURL=destination.provider.js.map