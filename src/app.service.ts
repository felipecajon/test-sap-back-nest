import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async getCountries(lang: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://restcountries.com/v2/lang/${lang}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async httpService(url: string, header: any): Promise<any> {
    try {
      const request = await axios.get(url, { headers: header });
      return request;
    } catch (error) {
      throw error;
    }
  }
}
