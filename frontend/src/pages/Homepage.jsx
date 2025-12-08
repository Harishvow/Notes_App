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

   // Use environment variable for API URL
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002';

   useEffect(()=>{
    const fetchNotes=async()=>{
      try{
           const res= await axios.get(`${API_URL}/api/notes`)
           console.log(res.data)
           setNotes(res.data)
           setIsRateLimited(false)

      }
      catch(error){
        console.log("error fetching notes:",error)
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
   },[API_URL])
   
  return (
    <div className='min-h-screen'>
  
    <NavBar/>
    {isRateLimited&&<RateLimitedUI/>}
    <div className='max-w-7xl mx-auto p-4 mt-6'>
      {loading && (
        <div className='text-center text-gray-500'>Loading notes...</div>
      )}
      
      {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound/>}
      
      {!loading && notes.length > 0 && !isRateLimited && (
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