import { Module } from '@nestjs/common';
import { ContriesController } from './controller/countries.controller';
import { CountriesService } from './services/countries.service';

@Module({
  imports: [],
  controllers: [ContriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
