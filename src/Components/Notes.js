import React, { useContext, useEffect, useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import noteContext from '../Context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote'
import { toast,Bounce} from 'react-toastify';

export default function Notes(props) {
  const navigate = useNavigate()

  const context = useContext(noteContext);
  const { notes, getAllNote, editNote } = context;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getAllNote()
    } else {
      navigate('/login')
    }
    // eslint-disable-next-line 
  }, [])

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }
  const ref = useRef(null)
  const refClose = useRef(null)
  
  const [note, setNote] = useState({ id: '', etitle: '', edescription: '', etag: '' })
  
  const handleClick = (e) => {
    ref.current.click();
    editNote(note.id,note.etitle, note.edescription, note.etag);
    toast.info('Note Updated !', {
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
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div className='container' >
      <AddNote />
      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label"  >Title</label>
                  <input className="form-control" id='etitle' value={note.etitle} name='etitle' type="text" placeholder="Enter Your Note Title" onChange={onChange} aria-label="default input example"></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label" >Description</label>
                  <input className="form-control" id='edescription' value={note.edescription} name='edescription' type="text" placeholder="Enter Your Note Description" onChange={onChange} ></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label" >Tag</label>
                  <input className="form-control" id='etag' name='etag' type="text" value={note.etag} placeholder="Enter Your Note Tag" onChange={onChange} ></input>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose}  className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length < 3 || note.edescription.length < 5 || note.etag.length < 3} onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row md-3'>
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </div>
  )
}
