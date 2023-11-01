import { useState, useEffect } from 'react'

function useConnectionStatus() {
  const [isOnline, setIsOnline] = useState<boolean|null>(
    window != undefined ? window.navigator.onLine : null
  )

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    if (window != undefined) {
      window.addEventListener('online', handleOnline)
      window.addEventListener('offline', handleOffline)
    }    

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
   }, [])
  return isOnline
}

export default useConnectionStatus;


// /***** USAGE OF useConnectionStatus *****/

// App.tsx
/* 
import useConnectionStatus from '../hooks/useConnectinStatus';

export default function App() {
  const isOnline = useConnectionStatus()
  console.log(isOnline)
  return (
    <div>App</div>
  )
} */
