import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { destination } from './providers/destination.provider';

@Injectable()
export class AppService {
  // async getCountries(lang: string): Promise<any> {
  //   try {
  //     const response = await axios.get(
  //       `https://restcountries.com/v2/lang/${lang}`,
  //     );
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async getCountries(lang: string) {
    return new Promise((resolve, reject) => {
      destination
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

  async httpService(url: string, header = 'ssds'): Promise<any> {
    try {
      const request = await axios.get(url);
      return request;
    } catch (error) {
      throw error;
    }
  }
}
