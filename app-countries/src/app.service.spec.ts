import { resolve } from 'path';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { AppService } from './app.service';
import { CountryDTO } from './model/contry.dto';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('./providers/destination.provider', () => (
    {
        destination: new Promise((resolve) => {
            const mockLanguage = 'en'
            const mockURL = `https://restcountries.com/v2/lang/${mockLanguage}`;

            resolve({ url: mockURL })
        })
    }
));

describe('AppService', () => {
    let appService: AppService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppService,
            ]
        }).compile();

        appService = module.get<AppService>(AppService);
    });

    describe('App Service', () => {
        it('GET - getCountries - Should return Contries Data', async () => {
            const mockContries: CountryDTO[] = [
                {
                    name: 'American Samoas',
                    capital: 'Pago Pago',
                    region: 'Oceania',
                    subregion: 'Polynesia',
                    flag: 'https://flagcdn.com/w320/as.png',
                },
            ];

            mockedAxios.get.mockResolvedValue(mockContries);

            const contries = await appService.getCountries('en');
            expect(contries).toEqual(mockContries);
        });
    });
});
