import { Provider, TransactionRequest } from '@ethersproject/providers'
import { Bytes, Signer, TypedDataDomain, TypedDataField } from 'ethers'
import { Deferrable, defineReadOnly, resolveProperties } from 'ethers/lib/utils.js'
import { getTransactionSignature } from '../hooks/guardians'
// import { getSignature } from '../hooks/guardians'

/**
 * a signer that wraps account-abstraction.
 */
export class GuardianSigner extends Signer {
  guardianAddress: string
  safeAddress: string

  constructor(guardianAddress: string, safeAddress: string, provider: Provider) {
    super()
    defineReadOnly(this, 'provider', provider || null)
    this.guardianAddress = guardianAddress
    this.safeAddress = safeAddress
  }

  connect(provider: Provider): Signer {
    return new GuardianSigner('', '', provider)
  }

  async getAddress(): Promise<string> {
    return this.guardianAddress
  }

  async signMessage(message: Bytes | string): Promise<string> {
    console.log(message)
    throw new Error('signMessage: unsupported by AA')
  }

  async signTransaction(transaction: Deferrable<TransactionRequest>): Promise<string> {
    const resaolvedTransaction = await resolveProperties<TransactionRequest>(transaction)
    return getTransactionSignature(
      this.safeAddress,
      (await this.provider?.getNetwork())?.chainId || 5,
      resaolvedTransaction,
    )
  }

  async _signTypedData(
    domain: TypedDataDomain,
    types: Record<string, Array<TypedDataField>>,
    value: Record<string, any>,
  ): Promise<string> {
    console.log(domain, types, value)
    return 'Garvit'
  }
}

export default GuardianSigner
