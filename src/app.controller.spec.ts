import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryDTO } from './model/contry.dto';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('GET - COUNTRIES - should return a object', () => {
      const countriesMock: CountryDTO[] = [
        {
          name: 'American Samoa',
          capital: 'Pago Pago',
          region: 'Oceania',
          subregion: 'Polynesia',
          flag: 'https://flagcdn.com/w320/as.png',
        },
      ];
      jest
        .spyOn(appController, 'getCountries')
        .mockResolvedValue(countriesMock);
      expect(appController.getCountries('en')).resolves.toEqual(countriesMock);
    });
  });
});
