import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BASE_URL } from './constants';

const App: React.FC = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const res = await fetch(`/notes`);
      const notesJson = await res.json();
      setNotes(notesJson);
    };
    getNotes();    
  }, []);

  return (
    <div className="App">
    </div>
  );
}

export default App;
