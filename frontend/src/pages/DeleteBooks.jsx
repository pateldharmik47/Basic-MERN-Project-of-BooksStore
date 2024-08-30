// import React from "react"
import {useState } from "react";
import axios from "axios";
import Spinner from '../../components/Spinner'
import { useNavigate,useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";

const DeleteBooks = () => {
  const [loading,setLoading] = useState(true);

  const navigate = useNavigate();
  const {id} = useParams();
  
  const handleDeleteBook = ()=>{
    axios.delete(`http://localhost:5555/books/${id}`)
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
    <h1 className="text-3xl my-4">Show Book</h1>
    {loading ? <Spinner/> : ""}
    <div className="flex flex-col item-center border-2  border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
      <h3 className="text-2xl">
        Are You Sure You Want to Delete This Book
      </h3>
      <button
      className="p-4 bg-red-600 text-white m-8 w-full"
      onClick={handleDeleteBook}
      >
        Yes, Delete it
      </button>
    </div>
  </div>
  )
};

export default DeleteBooks;
