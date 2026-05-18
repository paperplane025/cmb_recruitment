import { RouterProvider } from 'react-router'
import { router } from '@/shared/routes/routes.tsx'

function App() {
  return <RouterProvider router={router} />
}

export default App
