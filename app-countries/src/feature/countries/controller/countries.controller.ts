import { Controller, Get, Req } from '@nestjs/common';
import { CountryDTO } from '../model/contry.dto';
import { CountriesService } from '../services/countries.service';

@Controller('api')
export class ContriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('countries')
  async getCountries(@Req() req: any): Promise<CountryDTO[]> {
    const { lang } = req.query;
    try {
      const response: any = await this.countriesService.getCountries(lang);
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
}
