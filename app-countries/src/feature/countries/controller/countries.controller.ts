import * as common from '@nestjs/common';
import { CountryDTO } from '../model/contry.dto';
import { CountriesService } from '../services/countries.service';
import { LogService } from '../services/log.service';

@common.Controller('api')
export class ContriesController {
  constructor(
    private readonly countriesService: CountriesService,
    private readonly logService: LogService,
  ) {}

  @common.Get('countries')
  async getCountries(@common.Req() req: any): Promise<CountryDTO[]> {
    const { lang } = req.query;
    const isAuthorized = req.authInfo.checkLocalScope('read');

    if (isAuthorized) {
      this.logService.log(lang, req.authInfo.getEmail());
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
    } else {
      throw new common.HttpException('Forbidden', common.HttpStatus.FORBIDDEN);
    }
  }
}
