import React, { useState, useEffect } from 'react';
import './App.css';
import { addNote, deleteNote, updateNote } from './api/api';
import { Note } from './components/Note';
import { Note as NoteType } from './types';
import { NoteInput } from './components/NoteInput';

const App: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    const getNotes = async () => {
      const response = await fetch(`/notes`);
      const notesList: NoteType[] = await response.json();
      setNotes(notesList);
    };
    getNotes();    
  }, []);

  const handleAddNote = async (content: string) => {
    const response = await addNote({ note: content });
    const newNotesList: NoteType[] = await response.json();
    setNotes(newNotesList);
  };

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
    <div className="app">
      {notes.map(({ id, note }) => (
        <div key={id}>
          <Note
            content={note}
            onUpdate={(newContent) => handleUpdateNote(newContent)(id)}
            onDelete={() => handleDeleteNote(id)}
          />
        </div>
      ))}
      <NoteInput onSubmit={handleAddNote} />
    </div>
  );
}

export default App;
