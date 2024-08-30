// import React from "react"
import {useState } from "react";
import axios from "axios";
import Spinner from '../../components/Spinner'
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";

const CreateBooks = () => {
  const [title,setTitle] = useState();
  const [author,setAuthor] = useState();
  const [publishYear,setPublishYear] = useState();
  const [loading,setLoading] = useState(true);

  const navigate = useNavigate();

  const handleSaveBook = ()=>{
    const payload = {
      title,
      author,
      publishYear
    }
    axios.post('http://localhost:5555/books',payload)
    .then(()=>{
      setLoading(false);
      navigate('/');
    })
    .catch((error)=>{
      setLoading(false);
      alert('Thers somethig Error, Check colsole for more Detail');
      console.log("Error ",error);
      
    })
  }

  return (
    <div className="p-4">
      <BackButton/>
      <h1 className="text-3xl my-4">
        Create Book
      </h1>
       {loading ? <Spinner/> : ""}
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className="text-xl mr-4 text-grey-500">Title</label>
            <input type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-grey-500">Author</label>
            <input type="text" 
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-grey-500">Publish Year</label>
            <input type="number" 
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
            />
          </div>
          <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
            Save
            </button>
        </div>
      
    </div>
  )
};

export default CreateBooks;
