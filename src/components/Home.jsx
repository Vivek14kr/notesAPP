import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.css"
function NoteApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bookmarkedbool, setBookmarkedbool] = useState(false)
  const [date, setDate] = useState("");
  const [bookmarked, setBookmarked] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

 

  useEffect(() => {
    
    const storedBookmarked = JSON.parse(localStorage.getItem("bookmarked"));
    console.log(storedBookmarked);
    
    if (storedBookmarked) {
      setBookmarked(storedBookmarked);
    }
  }, []);

 

  const handleSubmit = (e) => {
    e.preventDefault();
   
 setNotes([...notes, { title, description, date, bookmarkedbool }]);
 localStorage.setItem(
   "notes",
   JSON.stringify([...notes, { title, description, date, bookmarkedbool }])
 );
 setTitle("");
 setDescription("");
 setDate("");
    
  };
  const handleDelete = (index) => {
    
    const newNotes = notes.filter((note, i) => i !== index);
    setNotes(newNotes);
    //update local storage
    localStorage.setItem("notes", JSON.stringify(newNotes));
   
   
};

  const handleBookmark = (index) => {
 
     const selectedNote = notes[index];
     selectedNote.bookmarkedbool = true;
     const newNotes = notes
     for (let i = 0; i < newNotes.length; i++){
        if (newNotes[i].title === selectedNote.title){
         newNotes[i].bookmarkedbool = true;
         
     }
    }
     setNotes(newNotes);

     localStorage.setItem("notes", JSON.stringify(newNotes));
     setBookmarked([...bookmarked, selectedNote]);
  
     localStorage.setItem(
       "bookmarked",
       JSON.stringify([...bookmarked, selectedNote])
     );
  };

  console.log(notes, bookmarked, " checking")

  return (
    <div className="note-app" style={notes < 4 ? {height:"100vh"} :{height:"fit-content"}}>
        <div onClick={()=> navigate("/bookmarked")} style={{position:"absolute", left:"80%", width:"fit-content", backgroundColor:"black",color:"white", padding:"30px", borderRadius:"40px", border:"2px solid white", cursor:"pointer"}}>
            Bookmarked Notes
        </div>
      <div>
        <h1>Note Taking App</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ textAlign: "center", margin: "auto" }}
      >
        <div
          style={{
            width: "fit-content",
            margin: "auto",
            textAlign: "left",
            backgroundColor: "white",
            padding: "49px",
            borderRadius:"20px",
            display: "flex",
          }}
        >
          <div style={{ margin: "1em" }}>
            <label style={{ margin: "1em", fontWeight: "bold" }}>Title</label>
            <br />
            <label style={{ margin: "1em", fontWeight: "bold" }}>
              Description
            </label>
            <br />
            <label style={{ margin: "1em", fontWeight: "bold" }}>Date</label>
          </div>
          <div style={{ margin: "1em" }}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <br />
          </div>
        </div>
        <button type="submit" style={{backgroundColor:"black", color:"white"}}>Add Note</button>
      </form>
      <div className="notes">
        {notes.map((note, index) => (
          <div
            key={index}
            className="note"
            style={{
              border: "5px solid black",
              backgroundColor: "white",
              borderRadius: "20px",
              width: "fit-content",
              padding: "15%",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <b>Title</b>
              <br />
              <div className="note-title">{note.title}</div>
              <b>Description</b>
              <br />
              <div className="note-description">{note.description}</div>
              <b>Date</b>
              <div className="note-date">{note.date}</div>
            </div>

            <button
              style={{
                backgroundColor: "black",
                marginTop: "35px",
                color: "white",
              }}
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
            {notes[index].bookmarkedbool ? (
              <button
              
                style={{ backgroundColor: "white", color: "black" }}
              >
               Bookmarked
              </button>
            ) : (
              <button
                style={{ backgroundColor: "white", color: "black" }}
                onClick={() => handleBookmark(index)}
              >
                Bookmark
              </button>
            )}
          </div>
        ))}
      </div>
     
    </div>
  );
}

export default NoteApp;