import { ethers } from 'ethers'

export const protocol = (
  address: string,
  message: string | undefined,
  timeout: number,
  setAnnouncement: (announcement: string) => void,
  setStatus: (status: string) => void,
  setTimeout: (timeout: number) => void,
  getTimeout: () => number,
): void => {
  if (message !== undefined) {
    // Parse the incoming message.
    let head: string | undefined
    let body: string | undefined
    try {
      const split = message.split(':')
      head = ethers.utils.getAddress(split[0])
      body = split[1] === undefined ? split[1] : ethers.utils.getAddress(split[1])
    } catch (err) {
      console.log('received invalid message')
    }

    // We always announce the incoming head as our body.
    setAnnouncement(`${address}:${head}`)

    // If the incoming body is our address, we're ready to execute.
    if (body === address) {
      setStatus('ready')
      // navigator.vibrate(200);
    } else {
      setStatus('announcing')
    }

    // Update the timeout.
    setTimeout(Date.now() + timeout)
  } else {
    // If we've timed out, reset to the waiting state.
    if (Date.now() > getTimeout()) {
      setStatus(`waiting, ${address}`)
      setAnnouncement(address)
    }
  }
}
