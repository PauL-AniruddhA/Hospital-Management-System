import { useState } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="app-container">
      <AppRoutes />
    </div>
  );
}

export default App // this "App" will now act as an entry point into this folder and use this folder
