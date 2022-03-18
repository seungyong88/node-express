import React, { useEffect } from 'react'
import axios from 'axios';

function RendingPage() {

  useEffect(() => {
    axios.get('/api/hello').then(res => console.log(res.data));
  }, [])

  return (
    <div>RendingPage</div>
  )
}

export default RendingPage