import React, { useState, useEffect } from "react";
import { getNotes, addNote, deleteNote, clearToken } from "./api";

export default function Dashboard({ setUser }) {
  const [notes, setNotes] = useState([]);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to fetch notes from the API
  const fetchNotes = async () => {
    try {
      const res = await getNotes();
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
      // If token is invalid (401), log the user out
      if (err.response && err.response.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  // useEffect runs when the component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  // Handler for adding a new note
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;

    try {
      // For this simple case, we'll use the content as the title
      await addNote({ title: newNoteContent, content: newNoteContent });
      setNewNoteContent(""); // Clear the input
      fetchNotes(); // Refresh the notes list
    } catch (err) {
      console.error("Failed to add note:", err);
    }
  };

  // Handler for deleting a note
  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes(); // Refresh the notes list
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  // Handler for logging out
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    clearToken(); // Clear token from axios headers
    setUser(null); // Update app state to show login page
  };

  if (loading) {
    return <p>Loading notes...</p>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <form onSubmit={handleAddNote}>
        <h3>Add a New Note</h3>
        <input
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
          placeholder="What's on your mind?"
        />
        <button type="submit">Add Note</button>
      </form>

      <h3>Your Notes</h3>
      {notes.length > 0 ? (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              {note.title}
              <button onClick={() => handleDeleteNote(note.id)} style={{ marginLeft: "10px" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>You don't have any notes yet.</p>
      )}
    </div>
  );
}
