import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import guardianModel from '@/models/guardians.model';
import { Guardian } from '@/interfaces/guardians.interface';
import { CreateGuardianDto } from '@/dtos/guardians.dto';
import { ethers } from 'ethers';

class GuardianService {
  public guardians = guardianModel;

  public async findGuardianBySafeAddressAndChainId(safeAddress: string, chainId: string): Promise<Guardian> {
    if (isEmpty(safeAddress)) throw new HttpException(400, 'safeAddress is empty');
    if (isEmpty(chainId)) throw new HttpException(400, 'chainId is empty');

    const findGuardian: Guardian = await this.guardians.findOne({ safeAddress: safeAddress, chainId: chainId });
    if (!findGuardian) throw new HttpException(409, "Guardian doesn't exist");

    return findGuardian;
  }

  public async createGuardian(guardianData: CreateGuardianDto): Promise<Guardian> {
    if (isEmpty(guardianData)) throw new HttpException(400, 'guardianData is empty');

    const findGuardian: User = await this.guardians.findOne({ safeAddress: guardianData.safeAddress, chainId: guardianData.chainId });
    if (findGuardian) throw new HttpException(409, `The Guardian for this safe address ${guardianData.safeAddress} already exists`);

    const guardian = ethers.Wallet.createRandom();

    const createGuardianData: Guardian = await this.guardians.create({
      safeAddress: guardianData.safeAddress,
      chainId: guardianData.chainId,
      guardianPublicAddress: guardian.address,
      guardianPrivateKey: guardian.privateKey,
    });

    return createGuardianData;
  }
}

export default GuardianService;
