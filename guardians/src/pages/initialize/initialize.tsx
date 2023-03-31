import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material'
import AccountInfo from '../../components/account-info'
import CurrentOwnersChange from '../../components/current-owners-change'
import { Loader } from '@gnosis.pm/safe-react-components'
import { useOwners } from '../../hooks/owners'
import { useGuardians } from '../../hooks/guardians'
import Header from '../../components/header'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useAccount, useDisconnect, useSigner } from 'wagmi'
import { SafeTransaction } from '@safe-global/safe-core-sdk-types'
import EthersAdapter from '@safe-global/safe-ethers-lib'
import { ethers } from 'ethers'
import Safe from '@safe-global/safe-core-sdk'
import { useNavigate } from 'react-router-dom'
import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk'

const Initialize = () => {
  const navigate = useNavigate()
  const { safe } = useSafeAppsSDK()
  const { openConnectModal } = useConnectModal()
  const { address, isConnected } = useAccount()
  const { data: signer, isError, isLoading } = useSigner()
  const { disconnect } = useDisconnect()

  const [safeTransaction, setSafeTransaction] = useState<SafeTransaction | undefined>(undefined)
  const [loader, showLoader] = useState<boolean>(false)

  const [loadingOwners, owners] = useOwners()
  const [loadingGuardian, guardian] = useGuardians()

  const connectAndSendTransaction = useCallback(() => {
    openConnectModal && openConnectModal()
  }, [openConnectModal])

  useEffect(() => {
    const prepareTx = async () => {
      if (isConnected && !isLoading && !isError && signer && guardian && address) {
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

  return loadingOwners || loadingGuardian ? (
    <Box>
      <Header />
      <Stack spacing={2} sx={{ height: '100%' }} justifyContent="center" alignItems="center">
        <Loader size="md" />
      </Stack>
    </Box>
  ) : (
    <Box sx={{ position: 'relative' }}>
      <Header />
      {loader ? (
        <div
          style={{
            zIndex: 100,
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
      <Container sx={{ p: 2, filter: loader ? 'blur(2px);' : undefined }}>
        <Stack direction="row" alignItems="center" sx={{ mt: 4 }} spacing={2}>
          <ArrowBackIosNewIcon />
          <Typography variant="h4">Setup Safe</Typography>
        </Stack>
        <Card sx={{ width: '100%', mt: 2, mb: 4 }}>
          <AccountInfo />
        </Card>
        <Card sx={{ width: '100%', mt: 2, mb: 2 }}>
          <CurrentOwnersChange owners={owners} guardian={guardian} />
        </Card>
        <Stack spacing={2} sx={{ width: '100%', pt: 4, mb: 8 }}>
          <Typography textAlign="center" color="#F8FAFC98" variant="body1" sx={{ paddingTop: 1 }}>
            Send transaction from one of your owners
          </Typography>
          <Button variant="contained" disabled={loadingGuardian} size="large" onClick={connectAndSendTransaction}>
            Connect & send transaction
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default Initialize
