import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import EditClient from './pages/client/editClient'
import Home from './pages/home'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/"}
            element={<Home />}
          />

          <Route
            path="/client/edit/:id"
            element={<EditClient />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
