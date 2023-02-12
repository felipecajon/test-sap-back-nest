/**
 * Exports destination service
 */
import { useOrFetchDestination } from '@sap-cloud-sdk/core';

const destionationObject = useOrFetchDestination({
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

export const destination = destionationObject;
