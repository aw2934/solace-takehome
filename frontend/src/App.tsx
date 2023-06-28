import React, { useState, useEffect } from 'react';
import './App.css';
import { deleteNote, updateNote } from './api/api';
import { Note } from './components/Note';
import { Note as NoteType } from './types';

const App: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    const getNotes = async () => {
      const res = await fetch(`/notes`);
      const notesList: NoteType[] = await res.json();
      setNotes(notesList);
    };
    getNotes();    
  }, []);

  const handleUpdateNote = (newContent: string) => async (id: number) => {
    const response = await updateNote({ id, note: newContent });
    const newNotesList: NoteType[] = await response.json();
    setNotes(newNotesList);
  };

  const handleDeleteNote = async (id: number) => {
    const response = await deleteNote({ id });
    const newNotesList: NoteType[] = await response.json();
    setNotes(newNotesList);
  };

  return (
    <div className="App">
      {notes.map(({ id, note }) => (
        <div key={id}>
          <Note
            content={note}
            onUpdate={(newContent) => handleUpdateNote(newContent)(id)}
            onDelete={() => handleDeleteNote(id)}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
