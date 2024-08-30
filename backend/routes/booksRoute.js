import express from "express";
import {Book} from "../model/bookModel.js"


const router = express.Router();

router.post("/",async(request,response)=>{
    try{
        if (!request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            response.status(400).send({message : "Send all required fields: title, author, publisherYear"})
        }

        const newBook = {
            title : request.body.title,
            author : request.body.author,
            publishYear : request.body.publishYear,
        }

        const book = await Book.create(newBook);

       return response.status(201).send(book);

    }
    catch (error){
        console.log(error.message);
        response.status(500).send({error : error.message});
    }
})

router.get("/",async (request,response) => {
    try {
        const book =await Book.find({});
        return response.status(201).send({
            Count : book.length,
            Data : book
        })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({error : error.message});
    }
})

router.get("/:id",async (request,response) => {
    try {
        const {id} = request.params;
        const book =await Book.findById(id);
        return response.status(201).send(book)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({error : error.message});
    }
})

router.put("/:id",async(request,response)=>{
    try{
        if (!request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            response.status(400).send({message : "Send all required fields: title, author, publisherYear"})
        }

        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id,request.body) 
        if (result) {
            return response.status(201).send("Book Update Successfully !");
        }
        else {
            return response.status(404).json({message : "Book not found"});

        }

    }
    catch (error){
        console.log(error.message);
        response.status(500).send({error : error.message});
    }
})


router.delete("/:id",async(request,response)=>{
    try{
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id) 
        if (result) {
            return response.status(201).send("Book Delete Successfully !");
        }
        else {
            return response.status(404).json({message : "Book not found"});

        }

    }
    catch (error){
        console.log(error.message);
        response.status(500).send({error : error.message});
    }
})

export default router;