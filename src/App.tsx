import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import ChatRoom from './components/ChatRoom'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from "@/components/ui/toaster"

function App() {
  const router = createBrowserRouter([
    {path: "/", element: <Home />},
    {path: "/chat", element: <ChatRoom />}
  ])

  return (
    <div className='app'>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster />
      </ThemeProvider>
    </div>
  )
}

export default App
