import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { CountryDTO } from './model/contry.dto';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('countries')
  async getCountries(@Req() req: any): Promise<CountryDTO[]> {
    const { lang } = req.query;
    try {
      const response: any = await this.appService.getCountries(lang);
      console.log('RESPONSE');
      console.log(response);
      const contries: CountryDTO[] = response.data.map(
        (item: any) =>
          new CountryDTO(
            item.name,
            item.capital,
            item.region,
            item.subregion,
            item.flags.png,
          ),
      );
      return contries;
    } catch (error) {
      return error;
    }
  }
}
