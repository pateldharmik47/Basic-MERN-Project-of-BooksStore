// import React from "react"
import { useEffect,useState } from "react";
import axios from "axios";
import Spinner from '../../components/Spinner'
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
const ShowBooks = () => {
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  useEffect(()=>{
    apiGetBookById();
  },[])

  function apiGetBookById (){
    axios.get(`http://localhost:5555/books/${id}`)
    .then((res)=>{
        setBooks(res.data);
        setLoading(false)
    })
    .catch((error)=>{
      console.log("error",error);      
      setLoading(false)
    })
  }

  return (
    <div className="p-4">
      <BackButton/>
      <h1 className="text-3xl my-4">Show Book</h1>
      {
        loading ? (
          <Spinner/>
        ) :
        (
          <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
            <div className="my-4">
              <span className="text-xl mr-4 text-grey-500">Id</span>
              <span>{books._id}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-grey-500">Title</span>
              <span>{books.title}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-grey-500">Author</span>
              <span>{books.author}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-grey-500">Publish Year</span>
              <span>{books.publishYear}</span>
            </div>

          </div>
        )
      }
    </div>
  )
};

export default ShowBooks;
