import React from 'react';
import { Link } from 'react-router-dom';
import Postings from './components/Postings';

const App: React.FC = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Postings />
    </div>
  );
};

export default App;
