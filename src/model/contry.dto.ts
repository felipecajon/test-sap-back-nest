import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Contry {
  @IsString()
  @ApiProperty({ description: 'Contry Name' })
  name: string;

  @IsString()
  @ApiProperty({ description: 'Capital' })
  capital: string;

  @IsString()
  @ApiProperty({ description: 'Region' })
  region: string;

  @IsString()
  @ApiProperty({ description: 'Subregion' })
  subregion: string;

  @IsString()
  @ApiProperty({ description: 'Flag' })
  flag: string;
}
