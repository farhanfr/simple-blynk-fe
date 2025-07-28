import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [currentTime, setCurrentTime] = useState('')
  const [apiResult, setApiResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSendData = async () => {
    setIsLoading(true)
    setApiResult(null)
    try {
      const response = await axios.get(import.meta.env.VITE_API_BASE_URL)
      console.log(response.data)
      setApiResult(response.data.data)
    } catch (error) {
      console.error("Error fetching data:", error)
      setApiResult({ error: "Failed to fetch data" })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatNumber = (n) => n.toString().padStart(2, '0')

      const day = formatNumber(now.getDate())
      const month = formatNumber(now.getMonth() + 1)
      const year = now.getFullYear()

      const hours = formatNumber(now.getHours())
      const minutes = formatNumber(now.getMinutes())
      const seconds = formatNumber(now.getSeconds())

      const formatted = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
      setCurrentTime(formatted)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen px-4 py-6">
      <div className='flex flex-col gap-4'>
        {/* Time display */}
        <div>
          <p className="text-4xl font-mono">{currentTime}</p>
        </div>

        {/* Button */}
        <div className='flex flex-col items-start'>
          <p className='text-2xl'>
            Please click the button below for sending data to spreadsheet
          </p>
          <div className='mt-4'>
            <button
              onClick={handleSendData}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send data'}
            </button>
          </div>
        </div>

        {/* Box Result */}
        <div className='flex flex-col'>
          <p className='text-left' style={{ display: apiResult ? 'block' : 'none' }}>You send this data to spreadsheet :</p>
          <div className='mt-2'>
            <div className='w-full px-6 py-3 min-h-[300px] border rounded-md overflow-auto bg-white'>
              {isLoading ? (
                <p className="text-gray-500 font-mono">⏳ Loading...</p>
              ) : apiResult ? (
                <pre className="whitespace-pre-wrap text-sm font-mono text-left">
                  {Object.entries(apiResult).map(([key, value]) => (
                    `${key}: ${value}\n`
                  ))}
                </pre>
              ) : (
                <span className='text-gray-500'>Please send data first to see data you send to spreadsheet</span>
              )}
            </div>
          </div>
        </div>

        <div className='flex flex-col items-start'>
          <p className='text-2xl'>Click this link to see spreadsheet:</p>
          <a className='text-blue-600' href="https://docs.google.com/spreadsheets/d/1OvHOLqOI-PIN387ICWNf_hB-GBcCHSBEVyR2aQd90b0/edit?usp=sharing" target="_blank" rel="noopener noreferrer">https://docs.google.com/spreadsheets/d/1OvHOLqOI-PIN387ICWNf_hB-GBcCHSBEVyR2aQd90b0/edit?usp=sharing</a>
        </div>

      </div>
    </div>
  )
}

export default App
