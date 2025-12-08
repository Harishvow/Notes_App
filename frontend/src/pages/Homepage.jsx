import React, { useEffect, useState } from 'react'
import NavBar from "../components/NavBar";
import RateLimitedUI  from '../components/RateLimitedUI';
import axios from "axios";
import toast from 'react-hot-toast';
import NoteCard  from '../components/NoteCard';
import NotesNotFound  from '../components/NotesNotFound';

const Homepage = () => {
  
   const[isRateLimited,setIsRateLimited]=useState(false)
   const[notes,setNotes]=useState([])
   const[loading,setloading]=useState(true)

   useEffect(()=>{
    const fetchNotes=async()=>{
      try{
           const res= await axios.get("http://localhost:5002/api/notes")
           console.log(res.data)
           setNotes(res.data)
           setIsRateLimited(false)

      }
      catch(error){
        console.log("error fetching notes;",error)
        if(error.response?.status===429){
          setIsRateLimited(true)
        }
        else{
          toast.error("failed to fetch notes")
        }
        
      }
      finally{
        setloading(false)
      }
       };
       fetchNotes();
   },[])
  return (
    <div className='min-h-screen'>
  
    <NavBar/>
    {isRateLimited&&<RateLimitedUI/>}
    <div className='max-w-7xl mx-auto p-4 mt-6'>
      {notes.length==0&&!isRateLimited&&<NotesNotFound/>}
      {notes.length>0&&!loading&&(
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {notes.map(note=>(
            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
          ))}
        </div>
      )}

    </div>
    </div>
  )
}

export default Homepage;