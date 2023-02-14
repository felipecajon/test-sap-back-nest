import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { destination } from '../providers/destination.provider';

@Injectable()
export class CountriesService {
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

          this.httpService(url)
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error.response.data);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async httpService(url: string): Promise<any> {
    try {
      return await axios.get(url);
    } catch (error) {
      throw error;
    }
  }
}
