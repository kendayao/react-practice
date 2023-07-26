import React, {useState} from "react";
import "./CreateArea.css"

function CreateArea() {

  const [noteInput, setNoteInput] = useState({
    title: "",
    content: ""
  })

  function handleChange(event){
    event.preventDefault()

    const {name , value}=event.target

    setNoteInput(prevValue=>{
      return{
        ...prevValue,
        [name]: value
      }
    })


  }

console.log(noteInput)


    return (
        <div>
          <form>
            <input onChange={handleChange} name="title" placeholder="Title" value={noteInput.title}/>
            <textarea onChange={handleChange}  name="content" placeholder="Take a note..." rows="3" value={noteInput.content} />
            <button>Add</button>
          </form>
        </div>
      );
}

export default CreateArea