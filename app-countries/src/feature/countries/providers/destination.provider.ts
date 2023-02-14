import { useOrFetchDestination } from '@sap-cloud-sdk/core';

export const destination = useOrFetchDestination({
  destinationName: 'countries',
})
  .then((destination) => {
    return destination;
  })
  .catch((err) => {
    return err;
  });
