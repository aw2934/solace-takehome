import React, { useState } from 'react';
import { NoteInput } from '../NoteInput';

interface Props {
  content: string;
  onUpdate: (newContent: string) => void;
  onDelete: () => Promise<void>;
}

const Note: React.FC<Props> = ({ content, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteContent, setNoteContent] = useState(content);

  // add loading state
  const handleUpdate = async () => {
      onUpdate(noteContent);
      setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <NoteInput note={content} onSubmit={handleUpdate} />
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Note;
