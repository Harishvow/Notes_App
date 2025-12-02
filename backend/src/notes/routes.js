import express from"express";
import { createnotes,getNoteById, deletenote, getnotes, updatenote } from "../controllers/notescontroller.js";


const router=express.Router();

router.get("/",getnotes);

router.get("/:id",getNoteById);


router.post("/",createnotes);

router.put("/:id",updatenote);

router.delete("/:id",deletenote);

export default router;
