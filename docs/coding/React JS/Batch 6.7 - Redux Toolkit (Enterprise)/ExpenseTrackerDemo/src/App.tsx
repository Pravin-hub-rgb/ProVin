import { useState } from 'react'
import './App.css'
import ExpensesPage from './components/ExpensesPage'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import Category from './components/Category'
import Summary from './components/Summary'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ExpensesPage />} />
            <Route path="/category" element={<Category />} />
            <Route path="/summary" element={<Summary />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App