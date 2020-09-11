import React, { useCallback } from 'react';
import './App.css';
import { useSafe } from '@rmeissner/safe-apps-react-sdk';
import { Button } from '@gnosis.pm/safe-react-components';

const App = () => {
  const safe = useSafe()  
  const submitTx = useCallback(async () => {
    await safe.asyncSendTransactions([
      {
        "to": safe.getSafeInfo().safeAddress,
        "value": 0,
        "data": "0x"
      }
    ])
    console.log("Submitted")
  }, [safe])
  return <>
    {safe.getSafeInfo().safeAddress}<br/>
    <Button size="lg" color="primary" onClick={submitTx}>Submit</Button>
  </>
}

export default App
