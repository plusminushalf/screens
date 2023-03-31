import React from 'react';
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import logo from '../../../../assets/img/logo.svg';
import { useNavigate } from 'react-router-dom';

const Intro = () => {
  const navigate = useNavigate();

  return (
    <Stack
      spacing={2}
      sx={{ height: '100%' }}
      justifyContent="center"
      alignItems="center"
    >
      <Box
        component="span"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: 600,
          p: 2,
          border: '1px solid #d6d9dc',
          borderRadius: 5,
          background: '#F8FAFC',
        }}
      >
        <CardContent>
          <Typography textAlign="center" variant="h3" gutterBottom>
            Screen connect
          </Typography>
          <Typography textAlign="center" variant="body1" color="text.secondary">
            Enable fraud detection, account recovery & paymaster service for
            your exisiting SAFE. Click here to&nbsp;
            <Link>learn more</Link> about how this works.
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ p: 5 }}
          >
            <img height={250} src={logo} className="App-logo" alt="logo" />
          </Box>
          <Typography
            textAlign="center"
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            A product by Screen protocol
          </Typography>
        </CardContent>
        <CardActions sx={{ pl: 4, pr: 4, width: '100%' }}>
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Button
              size="large"
              variant="contained"
              onClick={() => navigate('/accounts/new')}
            >
              Setup Safe
            </Button>
          </Stack>
        </CardActions>
      </Box>
    </Stack>
  );
};

export default Intro;
