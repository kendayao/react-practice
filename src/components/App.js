import React from 'react'
import Header from "./Header"
import Note from "./Note"
import Footer from "./Footer"
import notes from "./notes"


function App(){
    return (
        <div>
            <Header />
            <Note key={notes.key} title={notes.titles} content={notes.content}/>
            <Footer />
        </div>

    )
}

export default App