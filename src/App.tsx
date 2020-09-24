import React, { useCallback, useState } from 'react';
import './App.css';
import { useSafe } from '@rmeissner/safe-apps-react-sdk';
import { Button } from '@gnosis.pm/safe-react-components';
import { CircularProgress } from '@material-ui/core';

const App = () => {
  const safe = useSafe()  
  const [submitting, setSubmitting] = useState(false)
  const submitTx = useCallback(async () => {
    setSubmitting(true)
    try {
      const safeTxHash = await safe.sendTransactions([
        {
          "to": safe.info.safeAddress,
          "value": "0",
          "data": "0x"
        }
      ])
      console.log({safeTxHash})
      const safeTx = await safe.loadSafeTransaction(safeTxHash)
      console.log({safeTx})
    } catch (e) {
      console.error(e)
    }
    setSubmitting(false)
  }, [safe])
  return <>
    {safe.info.safeAddress}<br/>
    {submitting ? 
    <>
    <CircularProgress color="secondary" /> 
    <Button size="lg" color="secondary" onClick={() => {setSubmitting(false)}}>Cancel</Button>
    </>
    : 
    <Button size="lg" color="primary" onClick={submitTx}>Submit</Button>
    }
  </>
}

export default App
