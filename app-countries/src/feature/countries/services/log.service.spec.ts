import { Test, TestingModule } from '@nestjs/testing';
import { LogService } from './log.service';
import * as teste from '@sap/hana-client';

jest.mock('@sap/xsenv', () => ({
  cfServiceCredentials: () => '',
}));

describe('LogService', () => {
  let logService: LogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogService],
    }).compile();

    logService = module.get<LogService>(LogService);
  });

  describe('App Service', () => {
    it('Should exec CreateConnection', async () => {
      const objFunc = {
        connect: (connOptions, callback) => {
          callback();
        },
        prepare: () => {
          return {
            execBatch: (dateArray, callback) => {
              callback();
            },
          };
        },
      };
      jest.spyOn(teste, 'createConnection').mockReturnValue(objFunc);
      await logService.log('data', 'test@email.com');
      expect(teste.createConnection).toBeCalled();
    });
  });
});
