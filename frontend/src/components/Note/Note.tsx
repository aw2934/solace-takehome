import React, { useState } from 'react';

interface Props {
  content: string;
  onUpdate: (newContent: string) => void;
}

const Note: React.FC<Props> = ({ content, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteContent, setNoteContent] = useState(content);

  // add loading state
  const handleUpdate = () => {
    onUpdate(noteContent);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <textarea
            value={noteContent}
            onChange={e => setNoteContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Submit</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Note;
