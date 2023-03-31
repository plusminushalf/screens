import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk'
import { useEffect, useState } from 'react'
import { TransactionRequest } from '@ethersproject/providers'
import { AddressBookItem } from './owners'

export const GUARDIAN_SERVICE_URL = 'http://localhost:8080/guardians'

export const getTransactionSignature = async (
  safeAddress: string,
  chainId: string | number,
  transaction: TransactionRequest,
) => {
  const data = await (
    await fetch(`${GUARDIAN_SERVICE_URL}/${safeAddress}/${chainId}/signTransaction`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        safeAddress: safeAddress,
        chainId: chainId.toString(),
        transaction: transaction,
      }),
    })
  ).json()

  return data.signature
}

const getGuardianFromBackend = async (safeAddress: string, chainId: string | number) => {
  const {
    data,
  }: {
    data: {
      safeAddress: string
      chainId: string
      guardianPublicAddress: string
    }
  } = await (await fetch(`${GUARDIAN_SERVICE_URL}/${safeAddress}/${chainId}`)).json()

  return data
}

const useGuardians = (): [boolean, AddressBookItem | undefined] => {
  const { safe } = useSafeAppsSDK()
  const [loadingGuardian, setLoadingGuardian] = useState<boolean>(true)
  const [guardian, setGuardian] = useState<AddressBookItem | undefined>(undefined)

  useEffect(() => {
    const getGuardian = async () => {
      const data: {
        safeAddress: string
        chainId: string
        guardianPublicAddress: string
      } = await getGuardianFromBackend(safe.safeAddress, safe.chainId)

      let guardian: AddressBookItem

      if (data) {
        guardian = {
          address: data.guardianPublicAddress,
          chainId: data.chainId,
          name: 'Guardian Assigned',
        }
      } else {
        const {
          data: createdGuardianData,
        }: {
          data: {
            safeAddress: string
            chainId: string
            guardianPublicAddress: string
          }
        } = await (
          await fetch(`${GUARDIAN_SERVICE_URL}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              safeAddress: safe.safeAddress,
              chainId: safe.chainId.toString(),
            }),
          })
        ).json()
        guardian = {
          address: createdGuardianData.guardianPublicAddress,
          chainId: createdGuardianData.chainId,
          name: 'Guardian Assigned',
        }
      }

      setGuardian(guardian)
      setLoadingGuardian(false)
    }

    getGuardian()
  }, [safe, setLoadingGuardian])

  return [loadingGuardian, guardian]
}

export { useGuardians, getGuardianFromBackend }
