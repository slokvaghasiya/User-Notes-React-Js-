import React, { useContext } from 'react'
import noteContext from '../Context/notes/noteContext';
import { useState } from 'react';
import { toast,Bounce} from 'react-toastify';

export default function AddNote(props) {

  const context = useContext(noteContext);
  const { addNote } = context

  const [note, setNote] = useState({ title: '', description: '', tag: '' })

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Inside");
    addNote(note.title, note.description, note.tag);
    setNote({ title: '', description: '', tag: '' })
    toast.success('Note Added Successfully !', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className='container pt-5'>
        <h2 >Add a note</h2>
        <form onSubmit={handleClick} >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input className="form-control" id='title' name='title' type="text" value={note.title} placeholder="Enter Your Note Title" onChange={onChange} aria-label="default input example"></input>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label" >Description</label>
            <input className="form-control" id='description' name='description' value={note.description} type="text" placeholder="Enter Your Note Description" onChange={onChange} ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label" >Tag</label>
            <input className="form-control" id='tag' name='tag' type="text" value={note.tag} placeholder="Enter Your Note Tag" onChange={onChange} ></input>
          </div>
          <button type="submit" disabled={note.title.length < 3 || note.description.length < 5 || note.tag.length < 3} className="btn btn-primary" >Add Note</button>
        </form>
      </div>
    </>
  )
}
