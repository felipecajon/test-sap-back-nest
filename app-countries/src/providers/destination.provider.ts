import { useOrFetchDestination } from '@sap-cloud-sdk/core';

const destionationObject = useOrFetchDestination({
  destinationName: 'countries',
})
  .then((destination) => {
    return destination;
  })
  .catch((err) => {
    return err;
  });

export const destination = destionationObject;
