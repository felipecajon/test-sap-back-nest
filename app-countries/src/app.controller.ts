import { Body, Controller, Get, HttpException, HttpStatus, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { CountryDTO } from './model/contry.dto';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('countries')
  async getCountries(@Req() req: any, @Body() res: any): Promise<CountryDTO[]> {
    const { lang } = req.query;

    try {
      const response: any = await this.appService.getCountries(lang);
      console.log('RESPONSE');
      console.log(response);
      const countries: CountryDTO[] = response.data.map(
        (item: any) =>
          new CountryDTO(
            item.name,
            item.capital,
            item.region,
            item.subregion,
            item.flags.png,
          ),
      );
      return countries;
    } catch (error) {
      return [];
    }
  }

  @Get('countries-authenticated')
  async getCountries2(@Req() req: any, @Body() res: any): Promise<CountryDTO[]> {
    const { lang } = req.query;
    const isAuthorized = req.authInfo.checkLocalScope('read');
    console.log('isAuthorized: ' + isAuthorized);

    if (isAuthorized) {
      const response: any = await this.appService.getCountries(lang);
      console.log('RESPONSE');
      console.log(response);
      const countries: CountryDTO[] = response.data.map(
        (item: any) =>
          new CountryDTO(
            item.name,
            item.capital,
            item.region,
            item.subregion,
            item.flags.png,
          ),
      );
      return countries;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
