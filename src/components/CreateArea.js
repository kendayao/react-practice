import React, {useState} from "react";
import "./CreateArea.css"

function CreateArea(props) {

  const [noteInput, setNoteInput] = useState({
    title: "",
    content: ""
  })

  function handleChange(event){

    const {name , value}=event.target

    setNoteInput(prevValue=>{
      return{
        ...prevValue,
        [name]: value
      }
    })
    }
  
  function submitNote(event){
      event.preventDefault()
      props.onAdd(noteInput)
      setNoteInput({
        title: "",
        content: ""
      })

    }

 
  

    return (
        <div>
          <form >
            <input onChange={handleChange} name="title" placeholder="Title" value={noteInput.title}/>
            <textarea onChange={handleChange}  name="content" placeholder="Take a note..." rows="3" value={noteInput.content} />
            <button onClick={submitNote}>Add</button>
          </form>
        </div>
      );
}

export default CreateArea