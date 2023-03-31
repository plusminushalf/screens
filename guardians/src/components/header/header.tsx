import { Identicon } from '@gnosis.pm/safe-react-components'
import { Box, Stack, Typography } from '@mui/material'
import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk'
import React from 'react'
import LogoHorizontal from '../../assets/img/logo-horizontal'

const Header = () => {
  const { safe } = useSafeAppsSDK()

  return (
    <Stack
      display="flex"
      alignItems="center"
      direction="row"
      spacing={4}
      sx={{ height: '60px', background: '#0F172A', padding: '8px 16px', position: 'sticky' }}
    >
      <LogoHorizontal style={{ height: 60 }} />
      <Typography>Docs</Typography>
      <Typography>About</Typography>
      <Typography>Blog</Typography>
      <Typography>Architecture</Typography>
      <Box flexGrow={1}></Box>
      <Stack
        display="flex"
        alignItems="center"
        direction="row"
        spacing={1}
        sx={{ background: '#1e293b', p: 1, borderRadius: '6px' }}
      >
        <Identicon size="sm" address={safe.safeAddress} />
        <Typography>
          {safe.safeAddress.substring(0, 5)}...
          {safe.safeAddress.substring(safe.safeAddress.length - 5)}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default Header
