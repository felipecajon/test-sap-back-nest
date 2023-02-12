import { AppService } from './app.service';
import { CountryDTO } from './model/contry.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getCountries(req: any, res: any): Promise<CountryDTO[]>;
}
