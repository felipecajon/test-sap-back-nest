import { Test, TestingModule } from '@nestjs/testing';
import { CountryDTO } from '../model/contry.dto';
import { CountriesService } from '../services/countries.service';
import { ContriesController } from './countries.controller';

class mockAppService {
  getCountries() {
    const mockContries = [
      {
        name: 'American Samoa',
        capital: 'Pago Pago',
        region: 'Oceania',
        subregion: 'Polynesia',
        flags: {
          png: 'https://flagcdn.com/w320/as.png',
        },
      },
    ];

    return new Promise((resolve) => {
      resolve({ data: mockContries });
    });
  }
}

describe('ContriesController', () => {
  let contriesController: ContriesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ContriesController],
      providers: [
        {
          provide: CountriesService,
          useClass: mockAppService,
        },
      ],
    }).compile();

    contriesController = app.get<ContriesController>(ContriesController);
  });

  describe('root', () => {
    it('GET - COUNTRIES - should return a object', async () => {
      const countriesMock: CountryDTO[] = [
        {
          name: 'American Samoa',
          capital: 'Pago Pago',
          region: 'Oceania',
          subregion: 'Polynesia',
          flag: 'https://flagcdn.com/w320/as.png',
        },
      ];

      const contries = await contriesController.getCountries({
        query: { laneg: 'pt' },
      });
      expect(contries).toEqual(countriesMock);
    });
  });
});
