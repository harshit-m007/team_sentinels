import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./components/Landingpage"

import Upload from "./components/Upload"

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
