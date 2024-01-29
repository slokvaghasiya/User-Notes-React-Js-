import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {

    let host = "http://localhost:4000"
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    const getAllNote = async () => {

        const res = await fetch(`${host}/api/note/allNote`, {
            method: 'GET',
            headers: {
                'Content-Type' :'application/json',
                "auth-token": localStorage.getItem('token')
            },
        })
        const json = await res.json();
        // console.log("DATA",json);
        setNotes(json.data)
    }

//  Add Note
        const addNote = async (title, description, tag) => {

            const res = await fetch(`${host}/api/note/addNote`, {
                method: 'POST',
                headers: {
                    'Content-Type' :'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            })
            const note =await res.json();
        }
            // setNotes(notes.concat(note))
// Delete Note
        const deleteNote =async (id) => {
            const res = await fetch(`${host}/api/note/deleteNote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type' :'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            })
            const newNote = notes.filter((note) => {
                return note._id !== id
            })
            setNotes(newNote)
        }

// Edit Note
        const editNote = async (id, title, description, tag) => {
            const res = await fetch(`${host}/api/note/updateNote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type' :'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            })
            // const json = res.json();

            let newNote = JSON.parse(JSON.stringify(notes))
            for (let index = 0; index < newNote.length; index++) {
                const element = newNote[index];
                if (element._id === id) {
                    newNote[index].title = title;
                    newNote[index].description = description;
                    newNote[index].tag = tag
                    break;
                }
            }
            setNotes(newNote);
        }
        return (
            <noteContext.Provider value={{ notes,getAllNote, addNote, deleteNote, editNote }} >
                {props.children}
            </noteContext.Provider>
        )
    }

export default NoteState;