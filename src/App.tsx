import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import ChatRoom, { chatLoader } from './components/ChatRoom'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from "@/components/ui/toaster"
import ErrorPage from './components/ErrorPage'

function App() {
  const router = createBrowserRouter([
    {path: "/", element: <Home />, errorElement: <ErrorPage />},
    {path: "/chat", element: <ChatRoom/>, loader: chatLoader, errorElement: <ErrorPage />}
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
