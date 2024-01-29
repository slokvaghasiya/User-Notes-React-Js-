import React,{useContext} from 'react'
import noteContext from '../Context/notes/noteContext'

export default function NoteItem(props) {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const { note,updateNote } = props;

    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <p className="card-text">{note.tag}</p>
                        <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Note Deleted Successfully","Success")}} ></i>
                        <i className="fa-sharp fa-solid fa-pen-to-square mx-2"  onClick={()=>{updateNote(note)}} ></i>
                    </div>
            </div>
        </div>
    )
}
