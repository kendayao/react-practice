import React , {useState} from 'react'
import Header from "./Header"
import Note from "./Note"
import Footer from "./Footer"
import CreateArea from "./CreateArea"
import notes from "./notes"


function App(){

    const [notes, setNotes] = useState([])

    

    function addNote(note){
        return setNotes([...notes,note])
    }
    
    console.log(notes)

    return (
        <div>
            <Header />
            <CreateArea onAdd={addNote}/>
            {notes.map((noteItem, index)=>{
                return <Note key={index} id={index} title={noteItem.title} content={noteItem.content}/>
            })}
            
            <Footer />
        </div>

    )
}

export default App