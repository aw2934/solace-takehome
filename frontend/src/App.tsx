import React, { useState, useEffect } from 'react';
import './App.css';
import { addNote, deleteNote, updateNote } from './api/api';
import { Note } from './components/Note';
import { Note as NoteType } from './types';

const App: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [newNote, setNewNote] = useState('');

  const showNewNoteErrorState = newNote.length > 0 && (
    newNote.length < 20 || newNote.length > 300
  );

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
      <div className="add-new-note">
        <h4 className="heading">Add new note</h4>
        <textarea
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
          className="text-area"
          placeholder="Must be between 20 and 300 characters."
        />
        <p className="char-count">
          <span className={showNewNoteErrorState ? 'count-error' : ''}>
            {newNote.length}{' '}
          </span>
          / 300
        </p>
        <button
          onClick={() => handleAddNote(newNote)}
          disabled={showNewNoteErrorState || newNote.length === 0}
        >
          Add note
        </button>
      </div>
    </div>
  );
}

export default App;
