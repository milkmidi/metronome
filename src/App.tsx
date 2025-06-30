import React from 'react';
import Metronome from './components/Metronome';

function App(): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">節拍器 - Metronome</h1>
      <p className="text-lg mb-8">歡迎使用節拍器應用</p>
      <Metronome />
    </div>
  );
}

export default App;
