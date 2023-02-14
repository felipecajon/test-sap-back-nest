import { Module } from '@nestjs/common';
import { CountriesModule } from './feature/countries/countries.module';

@Module({
  imports: [CountriesModule],
})
export class AppModule {}
