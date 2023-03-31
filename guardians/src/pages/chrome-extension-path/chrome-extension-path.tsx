import { Box, Card, CardContent, Container, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import Lottie from 'lottie-react'
import { useSearchParams } from 'react-router-dom'
import searchTx from '../../assets/lottie/search-tx.json'
import guardianSigning from '../../assets/lottie/guardian-signing.json'
import signature from '../../assets/lottie/signature.json'
import check from '../../assets/lottie/check.json'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import EthersAdapter from '@safe-global/safe-ethers-lib'
import { ethers } from 'ethers'
import GuardianSigner from '../../services/GuardianSigner'
import { getGuardianFromBackend } from '../../hooks/guardians'
import { useAccount, useProvider, useSigner } from 'wagmi'
import Safe from '@safe-global/safe-core-sdk'
import { Loader } from '@gnosis.pm/safe-react-components'

enum Steps {
  'analyse-tx',
  'user-signing',
  'analysing-signature',
  'guardian-signing',
}

const ChromeExtensionPath = () => {
  const provider = useProvider()
  const [searchParams] = useSearchParams()
  const [loadingOwnerSignature, setLoadingOwnerSignature] = useState<boolean>(false)
  const [doneLoadingGuardingSignature, setDoneLoadingGuardingSignature] = useState<boolean | string>(false)
  const [stage, setStatge] = useState<Steps>(Steps['analyse-tx'])
  const [showAnalysedCheck, setShowAnalysedCheck] = useState<boolean>(false)
  const { address, isConnected } = useAccount()
  const { data: ownerSigner, isError, isLoading } = useSigner()
  const [guardianData, setGuardianData] = useState<
    | {
        safeAddress: string
        chainId: string
        guardianPublicAddress: string
      }
    | undefined
  >(undefined)

  console.log(loadingOwnerSignature)

  const [tx, origin, safeAddress, chainId] = useMemo(() => {
    return [
      JSON.parse(searchParams.get('tx') || ''),
      searchParams.get('origin'),
      searchParams.get('safeAddress'),
      searchParams.get('chainId'),
    ]
  }, [searchParams])

  useEffect(() => {
    if (chainId && safeAddress) {
      getGuardianFromBackend(safeAddress, chainId).then(setGuardianData)
    }
  }, [chainId, safeAddress])

  useEffect(() => {
    const requestGuardianSignature = async (signedSafeTransaction: any) => {
      if (chainId && safeAddress) {
        const guardianData = await getGuardianFromBackend(safeAddress, chainId)

        const guardianSigner = new GuardianSigner(guardianData.guardianPublicAddress, safeAddress, provider)

        const ethAdapterOwner = new EthersAdapter({ ethers: ethers, signerOrProvider: guardianSigner })
        const safeSdk: Safe = await Safe.create({ ethAdapter: ethAdapterOwner, safeAddress })

        const executionResult = await safeSdk.executeTransaction(signedSafeTransaction)
        setDoneLoadingGuardingSignature(executionResult.hash)
      }
    }

    const getOwnerSignature = async () => {
      if (ownerSigner && guardianData) {
        const ethAdapterOwner = new EthersAdapter({ ethers: ethers, signerOrProvider: ownerSigner })
        const safeSdk: Safe = await Safe.create({ ethAdapter: ethAdapterOwner, safeAddress: guardianData.safeAddress })
        tx.value = tx.value || '0'

        const safeTransaction = await safeSdk.createTransaction({
          safeTransactionData: [tx],
          options: { refundReceiver: guardianData.guardianPublicAddress },
        })

        setLoadingOwnerSignature(true)
        const signedSafeTransaction = await safeSdk.signTransaction(safeTransaction)
        setLoadingOwnerSignature(false)
        setStatge(Steps['guardian-signing'])
        requestGuardianSignature(signedSafeTransaction)
      }
    }

    if (address && isConnected && !isError && !isLoading && stage === Steps['user-signing']) {
      // TODO check address is the safe owner
      getOwnerSignature()
    }
  }, [address, chainId, guardianData, isConnected, isError, isLoading, ownerSigner, provider, safeAddress, stage, tx])

  useEffect(() => {
    const checkStageAndTakeAction = async () => {
      if (stage === Steps['analyse-tx']) {
        const timer = setTimeout(() => {
          setShowAnalysedCheck(true)
        }, Math.random() * 3000 + 2500)

        return () => clearTimeout(timer)
      } else if (stage === Steps['analysing-signature']) {
        const timer = setTimeout(() => {
          setStatge(Steps['guardian-signing'])
        }, Math.random() * 3000 + 2500)

        return () => clearTimeout(timer)
      }
    }

    checkStageAndTakeAction()
  }, [chainId, provider, safeAddress, stage, tx])

  return (
    <Container sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ width: '100%', position: 'relative', background: '#1e293b', p: 4 }}>
        <CardContent>
          <Typography color="#F8FAFC" textAlign="center" variant="h5" gutterBottom>
            Transaction requested
          </Typography>

          <Stepper activeStep={stage} sx={{ mt: 6 }}>
            <Step key={Steps['analyse-tx']}>
              <StepLabel>
                <Typography color={stage === Steps['analyse-tx'] ? '#F8FAFC' : '#F8FAFC98'}>Decting Fraud</Typography>
              </StepLabel>
            </Step>
            <Step key={Steps['user-signing']}>
              <StepLabel>
                <Typography color={stage === Steps['user-signing'] ? '#F8FAFC' : '#F8FAFC98'}>
                  Sign transaction
                </Typography>
              </StepLabel>
            </Step>
            <Step key={Steps['guardian-signing']}>
              <StepLabel>
                <Typography color={stage === Steps['guardian-signing'] ? '#F8FAFC' : '#F8FAFC98'}>
                  Guardian signing
                </Typography>
              </StepLabel>
            </Step>
          </Stepper>
          <Box sx={{ mt: 6 }} display={'flex'} justifyContent="center" alignItems={'center'}>
            {(stage === Steps['analyse-tx'] || stage === Steps['analysing-signature']) && (
              <Stack display="flex" justifyContent="center" alignItems="center">
                {!showAnalysedCheck ? (
                  <Lottie style={{ width: 200, height: 200 }} animationData={searchTx} loop={true} />
                ) : (
                  <Lottie
                    style={{ width: 200, height: 200 }}
                    animationData={check}
                    loop={false}
                    onComplete={() => {
                      setStatge(Steps['user-signing'])
                      showAnalysedCheck && setShowAnalysedCheck(false)
                    }}
                  />
                )}
                {stage === Steps['analyse-tx'] ? (
                  <Typography color="#F8FAFC98" variant="body1">
                    {!showAnalysedCheck ? 'Analysing transaction from ' : 'No fraud detected from '}
                    <Typography component="span" color="#17b96a">
                      {origin}
                    </Typography>
                  </Typography>
                ) : (
                  <Typography color="#F8FAFC98" variant="body1">
                    {!showAnalysedCheck ? 'Analysing signature from ' : 'Transaction approved from '}
                    <Typography component="span" color="#17b96a">
                      {address?.substring(0, 6) + '...' + address?.substring(address?.length - 4)}
                    </Typography>
                  </Typography>
                )}
              </Stack>
            )}
            {loadingOwnerSignature ? (
              <Card
                style={{
                  padding: 30,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  zIndex: 100,
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  background: '#0f172a',
                }}
              >
                <Loader size="md" />
                <Typography variant="h6" color="#F8FAFC">
                  Awaiting transaction signature
                </Typography>
              </Card>
            ) : null}
            {stage === Steps['user-signing'] && (
              <Stack
                sx={{ filter: loadingOwnerSignature ? 'blur(5px)' : undefined }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Lottie style={{ width: 200, height: 200 }} animationData={signature} loop={false} />
                <Typography textAlign="center" color="#F8FAFC98" variant="body1">
                  Sign transaction from one of the safe owners.
                </Typography>
                <Box sx={{ mt: '32px' }} display="flex">
                  <ConnectButton label={'Sign transaction'.toUpperCase()} />
                </Box>
              </Stack>
            )}
            {stage === Steps['guardian-signing'] ? (
              <Stack
                display="flex"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ width: '40vW', margin: 'auto' }}
              >
                {!doneLoadingGuardingSignature ? (
                  <Lottie style={{ width: 200, height: 200 }} animationData={guardianSigning} loop={true} />
                ) : (
                  <Lottie style={{ width: 200, height: 200 }} animationData={check} loop={false} />
                )}
                {!doneLoadingGuardingSignature ? (
                  <Typography color="#F8FAFC98" variant="body1">
                    Guardian is requested for signature for tx from&nbsp;
                    <Typography component="span" color="#17b96a">
                      {origin}
                    </Typography>
                  </Typography>
                ) : (
                  <Typography color="#F8FAFC98" variant="body1">
                    Transaction has been sent to the blockchain. Tx Hash: <pre>{doneLoadingGuardingSignature}</pre>
                  </Typography>
                )}
              </Stack>
            ) : null}
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default ChromeExtensionPath
