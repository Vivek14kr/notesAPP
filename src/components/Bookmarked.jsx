import React, { useEffect, useState } from 'react'
import "./Home.css"

function Bookmarked() {
      const [bookmarked, setBookmarked] = useState([]);
     useEffect(() => {
       // Retrieve bookmarked notes from local storage on page load
       const storedBookmarked = JSON.parse(localStorage.getItem("bookmarked"));
       console.log(storedBookmarked);

       if (storedBookmarked) {
         setBookmarked(storedBookmarked);
       }
     }, []);
     
  const handleRemoveBookmark = (index) => {
    // Remove the specified note from the bookmarked array
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    
 

    for (let i = 0; i < storedNotes.length; i++){
        if (storedNotes[i].title === bookmarked[index].title && storedNotes[i].description === bookmarked[index].description){
            storedNotes[i].bookmarkedbool = false;
        }
    }
 
    
    localStorage.setItem("notes", JSON.stringify(storedNotes));
    const newBookmarked = bookmarked.filter((note, i) => i !== index);
    setBookmarked(newBookmarked);
    //update local storage
    localStorage.setItem("bookmarked", JSON.stringify(newBookmarked));
  };

 
  return (
    <div
      style={
        bookmarked.length < 8
          ? { height: "100vh", margin: "auto", textAlign: "center" }
          : { height: "fit-content", margin: "auto", textAlign: "center" }
      }
    
    >
      <div style={{ margin: "auto" }}>
        <h1>Bookmarked Notes</h1>
      </div>
      {bookmarked.length > 0 ? (
        <div className="notes">
          {bookmarked.map((note, index) => (
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
                onClick={() => handleRemoveBookmark(index)}
              >
                Remove Bookmark
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <b>No Bookmarked Item!</b>
        </div>
      )}
    </div>
  );
}

export default Bookmarked