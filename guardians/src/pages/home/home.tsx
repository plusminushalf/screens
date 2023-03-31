import React from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from '@mui/material'
import AccountInfo from '../../components/account-info'
import CurrentOwnersChange from '../../components/current-owners-change'
import { useOwners } from '../../hooks/owners'
import { useGuardians } from '../../hooks/guardians'
import { Loader } from '@gnosis.pm/safe-react-components'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SecuredTransactions from '../../components/secured-transactions/secured-transactions'
import Header from '../../components/header'

const Initialize = () => {
  const [loadingOwners, owners] = useOwners()
  const [loadingGuardian, guardian] = useGuardians()

  return loadingOwners || loadingGuardian ? (
    <Stack spacing={2} sx={{ height: '100%' }} justifyContent="center" alignItems="center">
      <Loader size="md" />
    </Stack>
  ) : (
    <Box>
      <Header />
      <Container sx={{ mt: 6 }}>
        <Stack spacing={2} sx={{ height: '100%' }} justifyContent="center" alignItems="center">
          <Card sx={{ width: '100%', ml: 4, mr: 4, mt: 2, mb: 2 }}>
            <AccountInfo />
          </Card>
          <Accordion sx={{ width: '100%', background: '#1e293b' }}>
            <AccordionSummary
              sx={{ pl: 4, pt: 2 }}
              expandIcon={<ExpandMoreIcon htmlColor="#F8FAFC" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography color="#F8FAFC" variant="h6">
                Safe configuration
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pl: 4, pt: 2 }}>
              <CurrentOwnersChange showChange={false} owners={owners} guardian={guardian} />
              <Button sx={{ mt: 4 }} color="error">
                Remove Guardian
              </Button>
            </AccordionDetails>
          </Accordion>
          <Card sx={{ width: '100%', background: '#1e293b', ml: 4, mr: 4, mt: 2, mb: 2 }}>
            <CardContent sx={{ p: 2 }}>
              <SecuredTransactions />
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  )
}

export default Initialize
