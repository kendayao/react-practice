import React , {useState} from 'react'
import Header from "./Header"
import Note from "./Note"
import Footer from "./Footer"
import CreateArea from "./CreateArea"
import notes from "./notes"


function App(){

    const [notes, setNotes] = useState([])

    return (
        <div>
            <Header />
            <CreateArea />
            <Note key={1} title="Note title" content="Note content" />
            <Footer />
        </div>

    )
}

export default App