import Note  from "../models/Note.js";
export  async function getnotes(req,res){
    try{
        const notes=await Note.find().sort({createAt:-1});
        res.status(200).json(notes);
    }
    catch(error){
        console.error("error occur ",error);
        res.status(500).json({message:"interna sever error"});

    }

}
export async function getNoteById(req,res){
    try{
        const finNote=await Note.findById(req.params.id);
        if (!finNote){ return res.status(404).json({message:"note not found"})};
        res.status(200).json(finNote);
    
    }
    catch(error){
        res.status(500).json({message:"interna sever error"});

    }
}

export async function createnotes(req,res){
    try{
        const{title,content}=req.body;
        const newNote=new Note({title,content})
        const Savednote=await newNote.save()
        res.status(201).json({message:Savednote});

    }catch(error){
        console.error("create of note has error",error)
        res.status(500).json({message:"note not created "})

    }
}

export async function updatenote(req,res){
    try{
        const{title,content}=req.body;
        await Note.findByIdAndUpdate(req.params.id,{title,content});
        res.status(200).json({message:"note updated sucessfully"});
}
catch(error){
    console.error("not updated",error);
    res.status(404).json({message:"note not updated "});

}

    
}

export async function deletenote(req,res){
    try{
      const deletedNote=await Note.findByIdAndDelete(req.params.id)
      if (!deletedNote) return res.status(500).json({message:"note not found"});
      res.status(200).json({ message: "Note deleted successfully" });
    }
    catch(error){
         res.status(500).json({message:"internal error "});


    }
}