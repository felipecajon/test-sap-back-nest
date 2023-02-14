import { Test, TestingModule } from '@nestjs/testing';
import { CountryDTO } from '../model/contry.dto';
import { CountriesService } from '../services/countries.service';
import { LogService } from '../services/log.service';
import { ContriesController } from './countries.controller';

class mockContriesService {
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

class mockLogService {
  log(lang, email) {
    return { lang, email };
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
          useClass: mockContriesService,
        },
        {
          provide: LogService,
          useClass: mockLogService,
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

      const req = {
        query: { lang: 'pt' },
        authInfo: {
          checkLocalScope: () => true,
          getEmail: () => 'test@email.com',
        },
      };

      const contries = await contriesController.getCountries(req);
      expect(contries).toEqual(countriesMock);
    });
  });
});
