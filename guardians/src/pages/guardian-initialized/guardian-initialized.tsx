import React from 'react'
import { Box, Card, CardContent, Container, Stack, Typography } from '@mui/material'
import Lottie from 'lottie-react'
import confetti from '../../assets/lottie/confetti.json'
import { Button } from '@gnosis.pm/safe-react-components'
import { useNavigate } from 'react-router-dom'
// import Header from '../../components/header'
import check from '../../assets/lottie/check.json'

const GuardianInitialized = () => {
  const navigate = useNavigate()

  return (
    <Box>
      {/* <Header /> */}
      <Container sx={{ p: 2 }}>
        <Stack spacing={2} sx={{ mt: 4, height: '100%' }} alignItems="center">
          <Card sx={{ width: '100%', background: '#1e293b' }}>
            <CardContent>
              <Typography color="#F8FAFC" textAlign="center" variant="h4" gutterBottom>
                Congratulations
              </Typography>
              <Stack spacing={2} sx={{ pt: 4, width: '40vW', margin: 'auto', color: '#F8FAFC' }}>
                <Stack direction="row" spacing={2}>
                  <Lottie style={{ width: 60, height: 60 }} animationData={check} loop={false} />
                  <Typography sx={{ lineHeight: '60px' }} variant="body1">
                    Fraud detection enabled
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Lottie style={{ width: 60, height: 60 }} animationData={check} loop={false} />
                  <Typography sx={{ lineHeight: '60px' }} variant="body1">
                    Account Recovery enabled
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Lottie style={{ width: 60, height: 60 }} animationData={check} loop={false} />
                  <Typography sx={{ lineHeight: '60px' }} variant="body1">
                    Pay GAS from your Safe
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography color="#566976" variant="body1">
                    Every transaction with be co-signed for{' '}
                    <Typography component="span" color="#17b96a">
                      safety and fraud protection
                    </Typography>
                  </Typography>
                </Stack>
                <Button onClick={() => navigate('/')} style={{ marginTop: 30, zIndex: 1000 }} size="lg">
                  CONTINUE
                </Button>
              </Stack>
            </CardContent>
          </Card>
          <Lottie style={{ position: 'absolute' }} animationData={confetti} loop={false} />
        </Stack>
      </Container>
    </Box>
  )
}

export default GuardianInitialized
