import { NextFunction, Request, Response } from 'express';
import { User } from '@interfaces/users.interface';
import GuardianService from '@/services/guardians.service';
import { Guardian } from '@/interfaces/guardians.interface';
import { CreateGuardianDto } from '@/dtos/guardians.dto';
import { ethers, TransactionRequest } from 'ethers';

class GuardiansController {
  public guardianService = new GuardianService();

  public getGuardianSignature = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const safeAddress: string = req.params.safeAddress;
      const chainId: string = req.params.chainId;
      const findOneUserData: Guardian = await this.guardianService.findGuardianBySafeAddressAndChainId(safeAddress, chainId);

      const wallet = new ethers.Wallet(findOneUserData.guardianPrivateKey);

      const transaction = req.body.transaction;
      console.log(transaction);
      transaction.value = transaction.value || 0;
      transaction.gasLimit = transaction.gasLimit.hex;
      transaction.maxFeePerGas = transaction.maxFeePerGas.hex;
      transaction.maxPriorityFeePerGas = transaction.maxPriorityFeePerGas.hex;

      console.log(transaction);
      res.status(200).json({
        signature: await wallet.signTransaction(transaction),
      });
    } catch (error) {
      next(error);
    }
  };

  public getGuardianBySafeAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const safeAddress: string = req.params.safeAddress;
      const chainId: string = req.params.chainId;

      const findOneUserData: Guardian = await this.guardianService.findGuardianBySafeAddressAndChainId(safeAddress, chainId);

      res.status(200).json({
        data: {
          safeAddress: findOneUserData.safeAddress,
          chainId: findOneUserData.chainId,
          guardianPublicAddress: findOneUserData.guardianPublicAddress,
        },
        message: 'findOne',
      });
    } catch (error) {
      next(error);
    }
  };

  public createGuardian = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const guardianData: CreateGuardianDto = req.body;
      const createGuardianData: Guardian = await this.guardianService.createGuardian(guardianData);

      res.status(201).json({
        data: {
          safeAddress: createGuardianData.safeAddress,
          chainId: createGuardianData.chainId,
          guardianPublicAddress: createGuardianData.guardianPublicAddress,
        },
        message: 'created',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default GuardiansController;
