import React from 'react';
import ZScoreLineChart from './components/ZScoreLineChart';

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>График с подсветкой Z-Score</h1>
      <div style={{ width: '100%', height: '500px' }}>
        <ZScoreLineChart />
      </div>
    </div>
  );
};

export default App; 