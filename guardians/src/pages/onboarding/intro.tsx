import React from 'react'
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Fireblocks from '../../assets/img/fireblocks'
import Header from '../../components/header'
// import productDemo from '../../assets/img/product-demo.png'
import ChainIndicator from '../../components/chain-indicator'
// import Secure from '../../assets/img/secure'

const Intro = () => {
  const navigate = useNavigate()

  return (
    <Box>
      <Header />
      <Container sx={{ mt: 6 }}>
        <Stack direction="row">
          <Stack sx={{ p: 4 }}>
            <Typography variant="h2" sx={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', width: '300px' }}>
              Make self-custody secure
            </Typography>
            <Typography
              variant="h6"
              sx={{ mt: 6, textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', width: '500px', color: '#f8fafcc4' }}
            >
              Account Recovery • Fraud protection • Trusted guardians
            </Typography>
            <Stack sx={{ mt: 4 }} spacing={2} direction="row" display="flex" alignItems="center">
              <Typography
                sx={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                variant="caption"
                textTransform="uppercase"
              >
                Secured by:
              </Typography>
              <Fireblocks style={{ width: '100px', padding: '4px 12px', background: 'black' }} />
              <img
                src="https://images.ctfassets.net/q5ulk4bp65r7/3TBS4oVkD1ghowTqVQJlqj/2dfd4ea3b623a7c0d8deb2ff445dee9e/Consumer_Wordmark.svg"
                width="100"
                alt="Coinbase Logo"
              ></img>
            </Stack>
            <Button
              size="large"
              sx={{ width: '250px', mt: 8 }}
              variant="contained"
              onClick={() => navigate('/guardians/initialize')}
            >
              SETUP GUARDIANS
            </Button>
          </Stack>
          <Box flexGrow={1} sx={{ p: 4, position: 'relative' }}>
            {/* <Secure style={{ width: '512px' }} /> */}
            <img
              width="512px"
              src="https://ethereum.org/static/4d030a46f561e5c754cabfc1a97528ff/3ba1a/impact_transparent.webp"
              alt="alt"
            />
          </Box>
        </Stack>
      </Container>
      <Container sx={{ mt: 20, mb: 10 }}>
        <Stack spacing={2}>
          <Stack display="flex" direction="row" sx={{ pl: 4 }}>
            <Typography flexGrow={1} variant="h6">
              Blogs & News
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography color="#f8fafcc4">View more</Typography>
              <svg
                color="#f8fafcc4"
                width="8px"
                viewBox="0 0 8 14"
                display="inline-block"
                focusable="false"
                role="presentation"
                className="css-2e0vbj"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.292893 0.707107C0.683417 0.316583 1.31658 0.316583 1.70711 0.707107L6.65685 5.65685L7.36396 6.36396C7.75448 6.75448 7.75449 7.38765 7.36396 7.77817L6.65685 8.48528L1.70711 13.435C1.31658 13.8256 0.683418 13.8256 0.292893 13.435C-0.0976314 13.0445 -0.0976307 12.4113 0.292893 12.0208L5.24264 7.07107L0.292893 2.12132C-0.097631 1.7308 -0.097631 1.09763 0.292893 0.707107Z"
                  fill="currentColor"
                ></path>
              </svg>
            </Stack>
          </Stack>
          <Stack spacing={3} direction="row" sx={{ pl: 4 }}>
            <Card sx={{ background: '#1e293b', width: 380, height: 290, p: 2 }}>
              <Box
                sx={{
                  p: 2,
                  background:
                    'repeating-linear-gradient(264deg, rgba(253, 246, 122, 0.03) 5%, rgba(12, 49, 102, 0.09) 28%), radial-gradient(circle at 20% 84%, rgba(240, 119, 144, 0.5) 6%, rgba(21, 86, 180, 0.894) 70%), radial-gradient(at 11% 65%, rgba(94, 94, 94, 0.51) 45%, rgba(218, 213, 255, 0.325) 58%), radial-gradient(at 24% 56%, rgba(231, 40, 78, 0.137) 22%, rgba(238, 60, 19, 0.54) 84%), repeating-conic-gradient(from 325deg at 58% 44%, rgb(67, 47, 14) 65%, rgb(49, 127, 237) 87%)',
                  borderRadius: 2,
                  height: '50%',
                }}
              >
                <ChainIndicator style={{ background: '#1876d294', color: '#F8FAFC', marginBottom: 18 }}>
                  Security - @vbutrin
                </ChainIndicator>
                <Typography variant="h3" color="#F8FAFC">
                  Recovery by Vitalik
                </Typography>
              </Box>
            </Card>
            <Card sx={{ background: '#1e293b', width: 380, height: 290, p: 2 }}>
              <Box
                sx={{
                  p: 2,
                  background:
                    'repeating-linear-gradient(264deg, rgba(253, 246, 122, 0.03) 5%, rgba(12, 49, 102, 0.09) 28%), radial-gradient(circle at 20% 84%, rgba(240, 119, 144, 0.5) 6%, rgba(21, 86, 180, 0.894) 70%), radial-gradient(at 11% 65%, rgba(94, 94, 94, 0.51) 45%, rgba(218, 213, 255, 0.325) 58%), radial-gradient(at 24% 56%, rgba(231, 40, 78, 0.137) 22%, rgba(238, 60, 19, 0.54) 84%), repeating-conic-gradient(from 325deg at 58% 44%, rgb(67, 47, 14) 65%, rgb(49, 127, 237) 87%)',
                  borderRadius: 2,
                  height: '50%',
                }}
              >
                <ChainIndicator style={{ background: '#1876d294', color: '#F8FAFC', marginBottom: 18 }}>
                  Account Abstraction - @safe
                </ChainIndicator>
                <Typography variant="h3" color="#F8FAFC">
                  AA with Safe
                </Typography>
              </Box>
            </Card>
            <Card sx={{ background: '#1e293b', width: 380, height: 290, p: 2 }}>
              <Box
                sx={{
                  p: 2,
                  background:
                    'repeating-linear-gradient(264deg, rgba(253, 246, 122, 0.03) 5%, rgba(12, 49, 102, 0.09) 28%), radial-gradient(circle at 20% 84%, rgba(240, 119, 144, 0.5) 6%, rgba(21, 86, 180, 0.894) 70%), radial-gradient(at 11% 65%, rgba(94, 94, 94, 0.51) 45%, rgba(218, 213, 255, 0.325) 58%), radial-gradient(at 24% 56%, rgba(231, 40, 78, 0.137) 22%, rgba(238, 60, 19, 0.54) 84%), repeating-conic-gradient(from 325deg at 58% 44%, rgb(67, 47, 14) 65%, rgb(49, 127, 237) 87%)',
                  borderRadius: 2,
                  height: '50%',
                }}
              >
                <ChainIndicator style={{ background: '#1876d294', color: '#F8FAFC', marginBottom: 18 }}>
                  Guardians - @vbutrin
                </ChainIndicator>
                <Typography variant="h3" color="#F8FAFC">
                  Choosing Guardians
                </Typography>
              </Box>
            </Card>
          </Stack>
        </Stack>
      </Container>
      {/* <Box
        sx={{
          p: 5,
          backgroundRepeat: 'no-repeat',
          background: 'url(https://localhost:3000/abstract-background.jpg)',
          backdropFilter: 'blur(10px)',
          backgroundSize: 'cover',
          backgroundPosition: '709px 999px',
        }}
      >
        <Typography variant="h2" textAlign="center" sx={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
          Protect your safe
        </Typography>
        <Stack spacing={2} direction="row" display="flex" alignItems="center" justifyContent="center">
          <Typography
            sx={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
            variant="caption"
            textTransform="uppercase"
          >
            Secured by:
          </Typography>
          <Fireblocks style={{ width: '100px', padding: '4px 12px', background: 'black' }} />
          <img
            src="https://images.ctfassets.net/q5ulk4bp65r7/3TBS4oVkD1ghowTqVQJlqj/2dfd4ea3b623a7c0d8deb2ff445dee9e/Consumer_Wordmark.svg"
            width="100"
            alt="Coinbase Logo"
          ></img>
        </Stack>
      </Box> */}
      {/* <Typography align="justify" variant="body1" color="text.secondary">
        All your transactions are co-signed by Guardian service which helps you protect against frauds and help you
        recover your safe if your private keys are compromised, click <Link>learn more</Link> to know how.
      </Typography>
      <CardActions sx={{ pl: 4, pr: 4, width: '100%' }}>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Button size="lg" variant="contained" onClick={() => navigate('/guardians/initialize')}>
            SETUP GUARDIANS
          </Button>
        </Stack> */}
      {/* </CardActions> */}
    </Box>
  )
}

export default Intro
