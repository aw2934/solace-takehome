import React, { useState } from 'react';
import './NoteInput.css';

interface Props {
  note?: string;
  onSubmit: (newNote: string) => Promise<void>;
}

const NoteInput: React.FC<Props> = ({ note, onSubmit }) => {
  const [newNote, setNewNote] = useState(note || '');

  const showNewNoteErrorState = newNote.length > 0 && (
    newNote.length < 20 || newNote.length > 300
  );

  const handleSubmit = () => {
    onSubmit(newNote);
    setNewNote('');
  };

  return (
    <div className="note-input">
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
        onClick={handleSubmit}
        disabled={showNewNoteErrorState || newNote.length === 0}
        className="submit-button"
      >
        Submit
      </button>
    </div>
  );
};

export default NoteInput;
