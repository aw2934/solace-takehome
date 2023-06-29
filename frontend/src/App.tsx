import React, { useState, useEffect } from 'react';
import './App.css';
import { addNote, deleteNote, updateNote } from './api/api';
import { Note } from './components/Note';
import { Note as NoteType } from './types';
import { NoteInput } from './components/NoteInput';

const App: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [searchTerms, setSearchTerms] = useState('');

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

  const handleUpdateNote = async (id: number, newContent: string) => {
    const response = await updateNote({ id, note: newContent });
    const newNotesList: NoteType[] = await response.json();
    setNotes(newNotesList);
  };

  const handleDeleteNote = async (id: number) => {
    const response = await deleteNote({ id });
    const newNotesList: NoteType[] = await response.json();
    setNotes(newNotesList);
  };

  const filteredNotes = searchTerms == null
    ? notes
    : notes.filter(({ note }) => {
      const comparator = new RegExp(searchTerms);
      return comparator.test(note);
    });

  return (
    <div className="app">
      <input
        value={searchTerms}
        onChange={e => setSearchTerms(e.target.value)}
        className="search-bar"
        placeholder="Search notes"
      />
      {filteredNotes.map(({ id, note }) => (
        <div key={id}>
          <Note
            content={note}
            onUpdate={(newContent) => handleUpdateNote(id, newContent)}
            onDelete={() => handleDeleteNote(id)}
          />
        </div>
      ))}
      <NoteInput onSubmit={handleAddNote} />
    </div>
  );
}

export default App;
