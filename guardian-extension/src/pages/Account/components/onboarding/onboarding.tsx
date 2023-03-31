import {
  Box,
  Button,
  CardActions,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControl,
  FormGroup,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { ethers } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';
import { OnboardingComponent, OnboardingComponentProps } from '../types';

const Onboarding: OnboardingComponent = ({
  accountName,
  onOnboardingComplete,
}: OnboardingComponentProps) => {
  const [safeAddress, setSafeAddress] = useState<string>('');
  const [isAddress, setIsAddress] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const checkAndSetSafeAddress = useCallback(
    (address: string) => {
      const isAddress = ethers.utils.isAddress(address);
      setIsAddress(isAddress);
      setSafeAddress(address);
    },
    [setIsAddress, setSafeAddress]
  );

  const completeSafeSetup = useCallback(() => {
    setShowLoader(true);
    if (isAddress) {
      onOnboardingComplete({
        safeAddress: safeAddress,
      });
    }
    setShowLoader(false);
  }, [isAddress, onOnboardingComplete, safeAddress]);

  return (
    <>
      <CardContent>
        <Typography textAlign="center" variant="h3" gutterBottom>
          Setup SAFE
        </Typography>
        <Typography textAlign="center" variant="body1" color="text.secondary">
          Enter your SAFE address that you would like to use.
        </Typography>
        <FormGroup sx={{ p: 2, pt: 4 }}>
          <FormControl sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="safe-address">Safe address</InputLabel>
            <OutlinedInput
              value={safeAddress}
              onChange={(e) => checkAndSetSafeAddress(e.target.value)}
              autoFocus
              id="safeAddress"
              type="text"
              label="Safe Address"
            />
          </FormControl>
          <Stack direction="row" alignItems="center">
            <Checkbox defaultChecked />
            Use screen connect as your default wallet
          </Stack>
        </FormGroup>
      </CardContent>
      <CardActions sx={{ width: '100%', pl: 2, pr: 2, pt: 0 }}>
        <Stack spacing={2} sx={{ width: '100%', pl: 2, pr: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <Button
              sx={{ width: '100%' }}
              disabled={!isAddress || showLoader}
              size="large"
              variant="contained"
              onClick={completeSafeSetup}
            >
              Set safe address
            </Button>
            {showLoader && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
        </Stack>
      </CardActions>
    </>
  );
};

export default Onboarding;
