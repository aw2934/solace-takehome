import React, { useState } from 'react';
import { NoteInput } from '../NoteInput';
import './Note.css';

interface Props {
  content: string;
  onUpdate: (newContent: string) => void;
  onDelete: () => Promise<void>;
}

const Note: React.FC<Props> = ({ content, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (noteContent: string) => {
    onUpdate(noteContent);
    setIsEditing(false);
  };

  return (
    <div className="note-container">
      {isEditing ? (
        <>
          <NoteInput note={content} onSubmit={handleUpdate} />
          <button
            onClick={() => setIsEditing(false)}
            className="cancel-btn"
          >
            Cancel
          </button>
        </>
      ) : (
        <div className="note-readonly">
          <div className="note-content">
            <h4 className="less-margin">Note:</h4>
            <p className="less-margin">{content}</p>
          </div>
          <div className="note-buttons">
            <button
              onClick={() => setIsEditing(true)}
              className="note-btn"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="note-btn delete"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
