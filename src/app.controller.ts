import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('countries')
  async getCountries(@Req() req: any): Promise<any> {
    const { lang } = req.query;
    try {
      const response = await this.appService.getCountries(lang);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}
