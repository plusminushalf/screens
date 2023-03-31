import { UserOperationStruct } from '@account-abstraction/contracts';
import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ethers } from 'ethers';
import React, { useCallback, useEffect, useState } from 'react';
import {
  //   useBackgroundDispatch,
  useBackgroundSelector,
} from '../../../App/hooks';
import {
  getAccountInfo,
  getActiveAccount,
} from '../../../Background/redux-slices/selectors/accountSelectors';
import { selectCurrentOriginPermission } from '../../../Background/redux-slices/selectors/dappPermissionSelectors';
import { getActiveNetwork } from '../../../Background/redux-slices/selectors/networkSelectors';
import {
  selectCurrentPendingSendTransactionRequest,
  selectCurrentPendingSendTransactionUserOp,
} from '../../../Background/redux-slices/selectors/transactionsSelectors';
// import { createUnsignedUserOp } from '../../../Background/redux-slices/transactions';
import { EthersTransactionRequest } from '../../../Background/services/types';
import useAccountApi from '../../useAccountApi';

const Transaction = ({
  transaction,
  onComplete,
  onReject,
}: {
  transaction: EthersTransactionRequest;
  onComplete: (
    modifiedTransaction: EthersTransactionRequest,
    context: any
  ) => void;
  onReject: () => Promise<void>;
}) => {
  const [stage, setStage] = useState<'show-transaction' | 'awaiting-signature'>(
    'show-transaction'
  );
  const { result, loading, callAccountApi } = useAccountApi();

  //   const backgroundDispatch = useBackgroundDispatch();
  const activeAccount = useBackgroundSelector(getActiveAccount);
  const activeNetwork = useBackgroundSelector(getActiveNetwork);
  const accountInfo = useBackgroundSelector((state) =>
    getAccountInfo(state, activeAccount)
  );

  const sendTransactionRequest = useBackgroundSelector(
    selectCurrentPendingSendTransactionRequest
  );

  const pendingUserOp = useBackgroundSelector(
    selectCurrentPendingSendTransactionUserOp
  );

  //   useEffect(() => {
  //     if (activeAccount) {
  //       backgroundDispatch(createUnsignedUserOp(activeAccount));
  //     }
  //   }, [activeAccount, backgroundDispatch]);

  const originPermission = useBackgroundSelector((state) =>
    selectCurrentOriginPermission(state, {
      origin: sendTransactionRequest?.origin || '',
      address: activeAccount || '',
    })
  );

  useEffect(() => {
    const listenToMessageEvent = (
      { signature, clientDataJSON, authDataBuffer }: any,
      sender: any
    ) => {
      if (
        sender &&
        sender.url.includes('http://localhost:3000/iframe.html#/request-sign')
      ) {
        console.log(signature, 'signature');
        onComplete(transaction, { signature, clientDataJSON, authDataBuffer });
      }
    };

    window.addEventListener('message', listenToMessageEvent);

    chrome.runtime.onMessageExternal.addListener(listenToMessageEvent);

    return () =>
      chrome.runtime.onMessageExternal.removeListener(listenToMessageEvent);
  }, [onComplete, transaction]);

  //   useEffect(() => {
  //     callAccountApi('getUserOpHashToSignAndCredentialId', [transaction]);
  //   }, [callAccountApi, transaction]);

  useEffect(() => {
    if (activeAccount && sendTransactionRequest?.origin) {
      const baseUrl = 'https://localhost:3000';
      const url = new URL(
        `/extension/sign-transaction/${encodeURIComponent(chrome.runtime.id)}`,
        baseUrl
      );
      url.searchParams.set('tx', JSON.stringify(transaction));
      url.searchParams.set('origin', sendTransactionRequest?.origin);
      url.searchParams.set('safeAddress', activeAccount);
      url.searchParams.set('chainId', activeNetwork.chainID);
      window.open(url);
    }
  }, [
    transaction,
    sendTransactionRequest,
    activeAccount,
    activeNetwork.chainID,
  ]);

  return (
    <CardContent>
      {stage === 'awaiting-signature' ? (
        <Typography variant="h3" gutterBottom>
          Awaiting Signature
        </Typography>
      ) : null}
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
    </CardContent>
  );
};

export default Transaction;
