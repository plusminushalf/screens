import { Identicon, Loader } from '@gnosis.pm/safe-react-components'
import { Box, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material'
import React from 'react'
import ChainIndicator from '../chain-indicator'
import ForwardIcon from '@mui/icons-material/Forward'
import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk'
import { AddressBookItem } from '../../hooks/owners'

const CurrentOwnersChange = ({
  owners,
  guardian,
  showChange = true,
}: {
  owners: Array<AddressBookItem | null>
  guardian: AddressBookItem | undefined
  showChange?: boolean
}) => {
  const { safe } = useSafeAppsSDK()

  return !guardian || !owners ? (
    <Box sx={{ padding: 2 }}>
      <Loader size="md" />
    </Box>
  ) : (
    <Box sx={{ p: showChange ? 4 : 0, background: '#1e293b' }}>
      <Typography color="#F8FAFC" variant="h6">
        {showChange ? 'Changes to ' : ''}Safe owners
      </Typography>
      <List sx={{ paddingTop: 2 }}>
        <ListItem
          key={guardian.address}
          secondaryAction={
            <ChainIndicator style={{ backgroundColor: '#005546', color: 'rgb(255, 255, 255)' }}>
              {showChange ? 'NEW GUARDIAN' : 'GUARDIAN'}
            </ChainIndicator>
          }
          style={{ backgroundColor: '#0f172a' }}
          divider={true}
          alignItems="flex-start"
        >
          <ListItemAvatar>
            <Identicon address={guardian.address} size="lg" />
          </ListItemAvatar>
          <ListItemText
            primary={<Typography color="#F8FAFC">{guardian.name}</Typography>}
            secondary={
              <Stack direction="row">
                <Typography variant="caption" fontWeight="600" color="#F8FAFC">
                  gor:&nbsp;
                </Typography>
                <Typography variant="caption" textTransform="uppercase" color="#F8FAFC">
                  {guardian?.address}
                </Typography>
              </Stack>
            }
          />
        </ListItem>
        {owners.map((owner) =>
          owner ? (
            <ListItem key={owner.address} divider={true} alignItems="flex-start">
              <ListItemAvatar>
                <Identicon address={owner.address} size="lg" />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography color="#F8FAFC">{owner.name}</Typography>}
                secondary={
                  <Stack direction="row">
                    <Typography variant="caption" fontWeight="600" color="#F8FAFC">
                      gor:&nbsp;
                    </Typography>
                    <Typography variant="caption" textTransform="uppercase" color="#F8FAFC">
                      {owner.address}
                    </Typography>
                  </Stack>
                }
              />
            </ListItem>
          ) : null,
        )}
      </List>
      <Typography sx={{ paddingTop: 4 }} color="#F8FAFC" variant="h5">
        {showChange ? 'Changes to ' : ''}Required confirmations
      </Typography>
      <Typography color="#F8FAFC98" variant="body1" sx={{ paddingTop: 1 }}>
        Any transaction requires the confirmations of:
      </Typography>
      <Stack
        spacing={4}
        direction="row"
        sx={{ pt: 2, color: '#F8FAFC' }}
        display="flex"
        alignItems="center"
        justifyContent={showChange ? 'center' : 'flex-start'}
      >
        <Box sx={{ border: '1px solid #F02525', p: 1 }}>
          <Typography component="span" variant="h6">
            {safe.threshold}&nbsp;
          </Typography>
          <Typography component="span" variant="body1">
            out of&nbsp;
          </Typography>
          <Typography component="span" variant="h6">
            {owners.length}&nbsp;
          </Typography>
          <Typography component="span" variant="body1">
            owner(s)
          </Typography>
        </Box>
        {showChange ? <ForwardIcon /> : null}
        {showChange ? (
          <Box sx={{ border: '1px solid #008C73', p: 1 }}>
            <Typography component="span" variant="h6">
              2&nbsp;
            </Typography>
            <Typography component="span" variant="body1">
              out of&nbsp;
            </Typography>
            <Typography component="span" variant="h6">
              {owners.length + 1}&nbsp;
            </Typography>
            <Typography component="span" variant="body1">
              owner(s)
            </Typography>
          </Box>
        ) : null}
      </Stack>
    </Box>
  )
}

export default CurrentOwnersChange
