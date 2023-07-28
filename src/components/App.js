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

    function deleteNote(id){
        setNotes(prevValues=>{
             return prevValues.filter((note,index)=>{
                return index !== id})
        })
            
        }
    

    
    

    return (
        <div>
            <Header />
            <CreateArea onAdd={addNote}/>
            {notes.map((noteItem, index)=>{
                return <Note key={index} id={index} title={noteItem.title} content={noteItem.content} onDelete={deleteNote}/>
            })}
            
            <Footer />
        </div>

    )
}

export default App