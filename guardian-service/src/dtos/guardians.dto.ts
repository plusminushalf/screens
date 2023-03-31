import { IsString } from 'class-validator';

export class CreateGuardianDto {
  @IsString()
  public safeAddress: string;

  @IsString()
  public chainId: string;
}
