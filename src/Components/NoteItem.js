import React,{useContext} from 'react'
import noteContext from '../Context/notes/noteContext'
import { toast,Bounce} from 'react-toastify';

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
                        <i className="fa-sharp fa-solid fa-trash mx-2" 
                        onClick={()=>{
                            deleteNote(note._id);
                            toast.success('Note Deleted Successfully !', {
                                position: "bottom-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                                transition: Bounce,
                                });
                            }} ></i>
                        <i className="fa-sharp fa-solid fa-pen-to-square mx-2"  
                        onClick={()=>{
                            updateNote(note);
                        }} ></i>
                    </div>
            </div>
        </div>
    )
}
