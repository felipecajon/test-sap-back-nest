import { Module } from '@nestjs/common';
import { ContriesController } from './controller/countries.controller';
import { CountriesService } from './services/countries.service';
import { LogService } from './services/log.service';

@Module({
  imports: [],
  controllers: [ContriesController],
  providers: [CountriesService, LogService],
})
export class CountriesModule {}
