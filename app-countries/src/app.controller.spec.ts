import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryDTO } from './model/contry.dto';

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
        }
      },
    ];

    return new Promise((resolve) => {
      resolve({data: mockContries})
    })
  }
}

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{
        provide: AppService,
        useClass: mockAppService
      }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('GET - COUNTRIES - should return a object', async () => {
      const countriesMock: CountryDTO[] = [
        {
          name: 'American Samoa',
          capital: 'Pago Pago',
          region: 'Oceania',
          subregion: 'Polynesia',
          flag: 'https://flagcdn.com/w320/as.png'
        }
      ];

      const contries = await appController.getCountries({query: {laneg: 'pt'}}, 'res');
      
      expect(contries).toEqual(countriesMock);
    });
  });
});
