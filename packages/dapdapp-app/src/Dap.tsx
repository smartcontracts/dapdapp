import { useEffect, useState, useRef } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import QRCode from 'react-qr-code'
import { QrReader as QRScanner } from 'react-qr-reader'

import { protocol } from './protocol/protocol'

import './Dap.css'

function Dap() {
  const TIMEOUT_MS = 10_000
  const [ timeout, setTimeout ] = useState(0)
  const [ announcement, setAnnouncement ] = useState('initializing')
  const [ status, setStatus ] = useState('initializing')

  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  let time = useRef(0)
  useEffect(() => {
    time.current = timeout
  })

  return (
    <div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <QRCode
          bgColor='#FFAAAA'
          level='M'
          value={announcement as string}
          style={{
            height: "auto",
            margin: "32px",
            width: "50%",
            backgroundColor: "#FFAAAA",
            border: "10px solid #FFAAAA",
            borderRadius: "16px",
          }}
        />
      </div>

      <QRScanner
        scanDelay={50}
        constraints={{ facingMode: 'user' }}
        containerStyle={{ display: 'none' }}
        onResult={(result, error) => {
          protocol(
            isConnected ? address as string : '0xBaF6dC2E647aeb6F510f9e318856A1BCd66C5e19',
            result?.getText(),
            TIMEOUT_MS,
            setAnnouncement,
            setStatus,
            setTimeout,
            () => {
              return time.current
            }
          )
        }}
      />
      <p>current status is {status}</p>
    </div>
  )
}

export default Dap
