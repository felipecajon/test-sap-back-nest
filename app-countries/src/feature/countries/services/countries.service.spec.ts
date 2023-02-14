import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { CountryDTO } from '../model/contry.dto';
import { CountriesService } from './countries.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../providers/destination.provider', () => ({
  destination: new Promise((resolve) => {
    const mockLanguage = 'en';
    const mockURL = `https://restcountries.com/v2/lang/${mockLanguage}`;
    resolve({ url: mockURL });
  }),
}));

describe('CountriesService', () => {
  let countriesService: CountriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountriesService],
    }).compile();

    countriesService = module.get<CountriesService>(CountriesService);
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

      const contries = await countriesService.getCountries('en');
      expect(contries).toEqual(mockContries);
    });
  });
});
