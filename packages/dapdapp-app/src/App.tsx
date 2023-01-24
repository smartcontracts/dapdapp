import React from 'react'
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'

import './App.css'
import Dap from './Dap'

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

function App() {
  return (
    <WagmiConfig client={client}>
      <Dap />
    </WagmiConfig>
  )
}

export default App
