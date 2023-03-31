import { Identicon, Loader } from '@gnosis.pm/safe-react-components'
import {
  Alert,
  Box,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk'
import React, { useEffect, useState } from 'react'
import { useAccount, useDisconnect, useSigner } from 'wagmi'
import ChainIndicator from '../../components/chain-indicator'
import { useGuardians } from '../../hooks/guardians'
import { useOwners } from '../../hooks/owners'
import { ethers } from 'ethers'
import EthersAdapter from '@safe-global/safe-ethers-lib'
import Safe from '@safe-global/safe-core-sdk'
import { SafeTransaction } from '@safe-global/safe-core-sdk-types'
import { useNavigate } from 'react-router-dom'

const AddGuardianTx = () => {
  const navigate = useNavigate()
  const { safe } = useSafeAppsSDK()
  const { address, isConnected } = useAccount()
  const { data: signer, isError, isLoading } = useSigner()
  const { disconnect } = useDisconnect()

  const [loadingOwners, owners] = useOwners()
  const [loadingGuardian, guardian] = useGuardians()

  const [loader, showLoader] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const [safeTransaction, setSafeTransaction] = useState<SafeTransaction | undefined>(undefined)

  useEffect(() => {
    const prepareTx = async () => {
      if (isConnected && !isLoading && !isError && signer && guardian && address) {
        if (safeTransaction && safeTransaction.signatures.has(address.toLocaleLowerCase())) {
          disconnect()
          setOpen(true)
          return
        }
        const ethAdapterOwner = new EthersAdapter({ ethers: ethers, signerOrProvider: signer })
        const safeSdk: Safe = await Safe.create({ ethAdapter: ethAdapterOwner, safeAddress: safe.safeAddress })
        const params = {
          ownerAddress: guardian.address,
          threshold: 2, // Optional. If `threshold` is not provided the current threshold will not change.
        }
        let toSignTransaction
        if (!safeTransaction) {
          toSignTransaction = await safeSdk.createAddOwnerTx(params)
        } else {
          toSignTransaction = safeTransaction
        }
        if ((safeTransaction ? safeTransaction.signatures.entries.length : 0) + 1 === safe.threshold) {
          showLoader(true)
          const executeTxResponse = await safeSdk.executeTransaction(toSignTransaction)
          await executeTxResponse.transactionResponse?.wait()
          localStorage.setItem('initialised', 'initialised')
          navigate('/guardians/initialized')
        } else {
          const signedSafeTransaction = await safeSdk.signTransaction(toSignTransaction)
          disconnect()
          setSafeTransaction(signedSafeTransaction)
          return
        }
      }
    }
    prepareTx()
  }, [
    address,
    isConnected,
    guardian,
    isLoading,
    isError,
    signer,
    safe.safeAddress,
    safe.threshold,
    safeTransaction,
    disconnect,
    navigate,
  ])

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return loadingOwners || loadingGuardian ? (
    <Stack spacing={2} sx={{ height: '100%' }} justifyContent="center" alignItems="center">
      <Loader size="md" />
    </Stack>
  ) : (
    <Stack spacing={2} sx={{ height: '100%' }} justifyContent="center" alignItems="center">
      <Card sx={{ width: '62vw', ml: 4, mr: 4, mt: 2, mb: 2, position: 'relative' }}>
        {loader ? (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Loader size="md" />
            <Typography variant="h6">Awaiting transaction confirmation</Typography>
          </div>
        ) : null}

        <Box sx={{ padding: 2, filter: loader ? 'blur(2px);' : undefined }}>
          <Typography variant="h5">Connect & sign transaction</Typography>
          <Typography color="#5D6D74" variant="body2" sx={{ paddingTop: 1 }}>
            You must sign from a minimum of {safe.threshold} signer(s) to send the transaction:
          </Typography>
          <List sx={{ paddingTop: 2 }}>
            {owners.map((owner) =>
              owner ? (
                <ListItem
                  key={owner.address}
                  divider={true}
                  alignItems="flex-start"
                  secondaryAction={
                    <ChainIndicator style={{ backgroundColor: '#E8663D', color: 'rgb(255, 255, 255)' }}>
                      Not signed
                    </ChainIndicator>
                    // <ConnectButton
                    //   label={
                    //     'Connect & ' +
                    //     (signedTxs.length + 1 === safe.threshold ? 'Send Transaction' : 'Sign Transaction')
                    //   }
                    // />
                    // <Button variant="outlined" style={{ borderColor: '#005546', color: '#005546' }}>
                    //   Connect & {signedTxs.length + 1 === safe.threshold ? 'Send Transaction' : 'Sign Transactio'}
                    // </Button>
                  }
                >
                  <ListItemAvatar>
                    <Identicon address={owner.address} size="lg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={owner.name}
                    secondary={
                      <Stack direction="row">
                        <Typography variant="caption" fontWeight="600">
                          gor:&nbsp;
                        </Typography>
                        <Typography variant="caption" textTransform="uppercase">
                          {owner.address}
                        </Typography>
                      </Stack>
                    }
                  />
                </ListItem>
              ) : null,
            )}
          </List>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ pt: 2 }}>
            <ConnectButton
              label={
                'Connect & ' +
                ((safeTransaction ? safeTransaction.signatures.entries.length : 0) + 1 === safe.threshold
                  ? 'Send Transaction'
                  : 'Sign Transaction')
              }
            />
          </Box>
        </Box>
      </Card>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Transaction is already signed by this signer, please connect to some other signer.
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default AddGuardianTx
