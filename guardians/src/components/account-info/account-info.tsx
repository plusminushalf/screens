import { Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
// import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Identicon } from '@gnosis.pm/safe-react-components'
import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk'
import ChainIndicator from '../chain-indicator'

const AccountInfo = () => {
  const { sdk, safe } = useSafeAppsSDK()
  const [safeName, setSafeName] = useState<string>('')
  //   const [fiatTotal, setFiatTotal] = useState<string>('')

  useEffect(() => {
    const getSafeBalance = async () => {
      //   const balance = await sdk.safe.experimental_getBalances({ currency: 'usd' })
      //   setFiatTotal(balance.fiatTotal)
      const addressBook = await sdk.safe.requestAddressBook()
      setSafeName(
        addressBook.reduce((result, address) => {
          return address.address === safe.safeAddress ? address.name : result
        }, ''),
      )
    }

    getSafeBalance()
  }, [sdk, safe])

  return (
    <Stack sx={{ p: 4, background: '#1e293b' }} direction="row" display="flex" alignItems="center">
      <Stack flexGrow={1} direction="row" spacing={2}>
        <Identicon address={safe.safeAddress} size="lg" />
        <Stack spacing="8px">
          <Typography sx={{ color: '#F8FAFC' }} variant="body1">
            {safeName}
          </Typography>
          <Typography sx={{ color: '#F8FAFC98' }} variant="body2" textTransform="uppercase" color="#00000094">
            {safe.safeAddress}
          </Typography>
          {/* <Typography variant="body2" fontWeight="600">
              {fiatTotal} USD
            </Typography> */}
        </Stack>
      </Stack>
      <Stack>
        {safe.chainId === 5 ? (
          <ChainIndicator style={{ backgroundColor: 'rgb(77, 153, 235)', color: 'rgb(255, 255, 255)' }}>
            Goerli
          </ChainIndicator>
        ) : null}
      </Stack>
    </Stack>
    // <Box
    //   component="div"
    //   display="flex"
    //   flexDirection="row"
    //   justifyContent="space-between"
    //   alignItems="center"
    //   sx={{
    //     backgroundColor: '#162031',
    //     color: '#F8FAFC',
    //     padding: '24px 24px 0px 24px',
    //     position: 'relative',
    //   }}
    // >
    //   <Stack spacing={1}>
    //     <Stack direction="row" spacing={1}>
    //       <Identicon address={safe.safeAddress} size="lg" />
    //       <Stack spacing="2px">
    //         <Typography variant="body1">{safeName}</Typography>
    //         <Stack direction="row">
    //           <Typography variant="body2" fontWeight="600">
    //             gor:&nbsp;
    //           </Typography>
    //           <Typography variant="body2" textTransform="uppercase">
    //             {safe.safeAddress.substring(0, 5)}...
    //             {safe.safeAddress.substring(safe.safeAddress.length - 5)}
    //           </Typography>
    //         </Stack>
    //         {/* <Typography variant="body2" fontWeight="600">
    //           {fiatTotal} USD
    //         </Typography> */}
    //       </Stack>
    //     </Stack>
    //   </Stack>
    //   <Stack spacing={1} direction="row">
    //     {safe.chainId === 5 ? (
    //       <ChainIndicator style={{ backgroundColor: 'rgb(77, 153, 235)', color: 'rgb(255, 255, 255)' }}>
    //         Goerli
    //       </ChainIndicator>
    //     ) : null}
    //   </Stack>
    //   {showOptions && <MoreVertIcon sx={{ position: 'absolute', right: 0 }} />}
    // </Box>
  )
}

export default AccountInfo
