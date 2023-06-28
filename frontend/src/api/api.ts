interface UpdateProps {
  id: number;
  note: string;
}

export const addNote = async ({ note }: { note: string }) => {
  const result = await fetch('/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ note })
  });

  return result;
};

export const updateNote = async ({ id, note }: UpdateProps) => {
  const result = await fetch('/notes', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, note })
  });

  return result;
};

export const deleteNote = async ({ id }: { id: number }) => {
  const result = await fetch('/notes', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id })
  });

  return result;
};
