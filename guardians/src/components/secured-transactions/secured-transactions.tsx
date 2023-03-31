import React from 'react'
import { Box, Typography } from '@mui/material'
import emptyList from '../../assets/img/empty-list.svg'

const SecuredTransactions = () => {
  return (
    <Box sx={{ padding: 2, color: '#F8FAFC' }}>
      <Typography variant="h6">Secured transactions</Typography>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 6 }}>
        <img height={250} src={emptyList} className="App-logo" alt="emptyList" />
        <Typography sx={{ mt: 4 }} color="#5D6D74">
          You future transaction status will show up here
        </Typography>
      </Box>
    </Box>
  )
}

export default SecuredTransactions
