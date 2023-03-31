import { BigNumber, BigNumberish, ethers } from 'ethers';
import { UserOperationStruct } from '@account-abstraction/contracts';

import { AccountApiParamsType, AccountApiType } from './types';
import {
  MessageSigningData,
  MessageSigningRequest,
} from '../../Background/redux-slices/signing';
import { TransactionDetailsForUserOp } from '@account-abstraction/sdk/dist/src/TransactionDetailsForUserOp';
import { WebauthnAccount, WebauthnAccountFactory } from './typechain-types';
import { GasOverheads, PaymasterAPI } from '@account-abstraction/sdk';
import { NotPromise } from '@account-abstraction/utils';

export type QValues = {
  credentialId: string;
  q0: string;
  q1: string;
};

/**
 * An implementation of the BaseAccountAPI using the SimpleAccount contract.
 * - contract deployer gets "entrypoint", "owner" addresses and "index" nonce
 * - owner signs requests using normal "Ethereum Signed Message" (ether's signer.signMessage())
 * - nonce method is "nonce()"
 * - execute method is "execFromEntryPoint()"
 */
class WebAuthnAccountAPI extends AccountApiType {
  safeAddress: string;
  provider: ethers.providers.Provider;
  overheads?: Partial<GasOverheads> | undefined;
  entryPointAddress: string;
  accountAddress?: string | undefined;
  paymasterAPI?: PaymasterAPI | undefined;

  /**
   * our account contract.
   * should support the "execFromEntryPoint" and "nonce" methods
   */
  accountContract?: WebauthnAccount;

  factory?: WebauthnAccountFactory;

  constructor(
    params: AccountApiParamsType<{
      safeAddress: string;
    }>
  ) {
    super(params);
    if (!params.context?.safeAddress) throw new Error('Need safeAddress');

    this.safeAddress = params.context?.safeAddress;

    this.provider = params.provider;
    this.entryPointAddress = params.entryPointAddress;
  }

  signMessage = (
    request?: MessageSigningRequest<MessageSigningData> | undefined,
    context?: any
  ): Promise<string> => {
    throw new Error('Method not implemented.');
  };

  signUserOpWithContext(
    userOp: UserOperationStruct,
    context?: any
  ): Promise<UserOperationStruct> {
    throw new Error('Method not implemented.');
  }

  init(): Promise<this> {
    throw new Error('Method not implemented.');
  }
  getAccountInitCode(): Promise<string> {
    throw new Error('Method not implemented.');
  }
  getNonce(): Promise<BigNumber> {
    throw new Error('Method not implemented.');
  }
  encodeExecute(
    target: string,
    value: BigNumberish,
    data: string
  ): Promise<string> {
    throw new Error('Method not implemented.');
  }
  signUserOpHash(userOpHash: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  checkAccountPhantom(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getCounterFactualAddress(): Promise<string> {
    throw new Error('Method not implemented.');
  }
  async getInitCode(): Promise<string> {
    return '0x';
  }
  getVerificationGasLimit(): Promise<BigNumberish> {
    throw new Error('Method not implemented.');
  }
  getPreVerificationGas(userOp: Partial<UserOperationStruct>): Promise<number> {
    throw new Error('Method not implemented.');
  }
  packUserOp(userOp: NotPromise<UserOperationStruct>): string {
    throw new Error('Method not implemented.');
  }
  encodeUserOpCallDataAndGasLimit(
    detailsForUserOp: TransactionDetailsForUserOp
  ): Promise<{ callData: string; callGasLimit: BigNumber }> {
    throw new Error('Method not implemented.');
  }
  getUserOpHash(userOp: UserOperationStruct): Promise<string> {
    throw new Error('Method not implemented.');
  }
  getAccountAddress = async (): Promise<string> => {
    return this.safeAddress;
  };
  async estimateCreationGas(
    initCode?: string | undefined
  ): Promise<BigNumberish> {
    return ethers.BigNumber.from(0);
  }
  createUnsignedUserOp(
    info: TransactionDetailsForUserOp
  ): Promise<UserOperationStruct> {
    throw new Error('Method not implemented.');
  }
  signUserOp(userOp: UserOperationStruct): Promise<UserOperationStruct> {
    throw new Error('Method not implemented.');
  }
  createSignedUserOp(
    info: TransactionDetailsForUserOp
  ): Promise<UserOperationStruct> {
    throw new Error('Method not implemented.');
  }
  getUserOpReceipt(
    userOpHash: string,
    timeout?: number | undefined,
    interval?: number | undefined
  ): Promise<string | null> {
    throw new Error('Method not implemented.');
  }

  serialize = async (): Promise<object> => {
    return {
      safeAddress: this.safeAddress,
    };
  };
}

export default WebAuthnAccountAPI;
