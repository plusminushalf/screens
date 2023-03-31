import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk'
import { useEffect, useState } from 'react'

export type AddressBookItem = {
  address: string
  chainId: string
  name: string
}

const useOwners = (): [boolean, Array<AddressBookItem | null>] => {
  const { sdk, safe } = useSafeAppsSDK()
  const [loadingOwners, setLoadingOwners] = useState<boolean>(true)
  const [owners, setOwners] = useState<Array<AddressBookItem | null>>([])

  useEffect(() => {
    const fetchOwners = async () => {
      const addressBook = await sdk.safe.requestAddressBook()
      setOwners(
        safe.owners.map((owner) =>
          addressBook.reduce<AddressBookItem | null>((result, address) => {
            return address.address === owner ? address : result
          }, null),
        ),
      )
      setLoadingOwners(false)
    }

    fetchOwners()
  }, [sdk, safe])

  return [loadingOwners, owners]
}

export { useOwners }
