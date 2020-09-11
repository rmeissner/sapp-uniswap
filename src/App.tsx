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
    await safe.asyncSendTransactions([
      {
        "to": safe.getSafeInfo().safeAddress,
        "value": 0,
        "data": "0x"
      }
    ])
    setSubmitting(false)
  }, [safe])
  return <>
    {safe.getSafeInfo().safeAddress}<br/>
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
