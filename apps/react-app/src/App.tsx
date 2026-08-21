import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { AuthGate } from './auth/AuthGate.tsx'
import { HomePage } from './components/pages/HomePage.tsx'
import { LoginPage } from './components/pages/LoginPage.tsx'

const SignUpPage = lazy(() =>
  import('./components/pages/SignUpPage.tsx').then((module) => ({
    default: module.SignUpPage,
  })),
)

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route
            path="/"
            element={
              <AuthGate>
                <HomePage />
              </AuthGate>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
