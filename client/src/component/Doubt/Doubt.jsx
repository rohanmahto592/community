import React, { useState } from "react";
import doubt from "./doubts.png";
import Carasol from "../Carasoul/Carasol";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from "react-toastify";
import addNotification from 'react-push-notification';
 import AlertMessage from '../Alert/Alertmessage'
const Doubt = ({ user }) => {
  const [sliderImages, setSliderImages] = useState(null);
  const [Images, setimages] = useState([]);
  const [link, setlink] = useState("");
  const [text, setText] = useState("");
  const [lapse, setlapse] = useState(false);
  const [title, setTitle] = useState("");
  const [open,setOpen]=useState(false)
  const [check,setcheck]=useState(false)
  let imagearray = [];
  const navigate = useNavigate();
  let images = [];
  const uploadimages = (e) => {
    let Images = e.target.files;
    setimages(Images);
    Object.keys(Images).forEach((key) => {
      imagearray.push(URL.createObjectURL(Images[key]));
    });
    setSliderImages([...imagearray]);
  };
  const notify = () => {
    toast.success("Post uploaded successfully!!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const AddPost = async () => {
    const data = {
      title: title,
      text: text,
      address: link,
      images: images,
      doubt: "unresolved",
      created_by:user?._id,
      Date: Date.now(),
      created_by_image: user?.imageUrl,
      upvote:[],
      likes:[]
    };
    await axios.post("http://localhost:3001/posts/doubt", data).then((response) => {
      setlapse(true);
      setOpen(true);
      setcheck(true)
      setTimeout(() => {
        setlapse(false);
        navigate("/");
      }, 4000);
    });
  };
  const UploadDoubt = () => {
    if(Object.keys(Images).length>0)
    {
      console.log("images",Images)
    Object.keys(Images).forEach(async (key) => {
      var formdata = new FormData();
      formdata.append("file", Images[key]);
      formdata.append("cloud_name", "gcet");
      formdata.append("upload_preset", "pdf_Files");
      await fetch("https://api.cloudinary.com/v1_1/gcet/auto/upload", {
        method: "post",
        mode: "cors",
        body: formdata,
      }).then(async (res) => {
        let json = await res.json();
        
        images.push(json.secure_url);
      })
    })
    setTimeout(()=>{
      AddPost()
    },2000)
  }
  else
  {
    AddPost();
  }

    
  };
  return (
    <>
    {check && <AlertMessage open={open} setOpen={setOpen} type="success" message="doubt posted successfully"/>}
      {lapse ? (
        <Confetti />
      ) : (
        <div
          style={{ margin: "auto", marginTop: "5vh" }}
          class="max-w-xl  p-6 bg-white  border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
        >
          <figure class="max-w-lg justify-center items-center ">
            <figcaption
              style={{ fontFamily: "comic sans ms", fontWeight: "bolder" }}
              class="mt-2 mb-3 text-md text-center text-gray-500 dark:text-sky-600"
            >
              Got stuck?? clear your doubts here
            </figcaption>
            <img
              class="mx-auto max-w-lg sm: h-56 md: h-56 lg:h-full rounded-lg"
              src={doubt}
              alt="imagedescription"
            />
          </figure>
          <label
            style={{ fontFamily: "comic sans ms" }}
            class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            for="file_input"
          >
            Title
          </label>
          <input
            style={{ fontFamily: "comic sans ms" }}
            class="block p-2 w-full text-md text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            id="message"
            rows="4"
            onChange={(e) => setText(e.target.value)}
            class="block mt-3 p-2.5 w-full text-sm text-violet-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-violet-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your doubts here..."
          ></textarea>
          {sliderImages ? (
            <Carasol sliderImages={sliderImages} />
          ) : (
            <div class="max-w-xl rounded-md flex items-center justify-center w-full mt-5">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed  cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    class="w-10 h-10 mb-3 text-pink-500 text-xl"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p
                    style={{ fontFamily: "comic sans ms" }}
                    class="mb-2 text-xl text-gray-500 dark:text-violet-500"
                  >
                    <span class="font-semibold text-sky-600">
                      Click to add doubt photos
                    </span>
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-500">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  class="hidden"
                  multiple
                  onChange={uploadimages}
                />
              </label>
            </div>
          )}
          <label
            style={{ fontFamily: "comic sans ms" }}
            class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            for="file_input"
          >
            Paste link for reference or doubt
          </label>
          <input
            style={{ fontFamily: "comic sans ms" }}
            class="block w-full text-md text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="text"
            onChange={(e) => setlink(e.target.value)}
          />
          <button
            style={{ fontFamily: "comic sans ms" }}
            type="button"
            class=" mt-5 focus:outline-none text-white bg-sky-800 hover:bg-violet-800 focus:ring-4 focus:ring-sky-700 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-sky-800 dark:hover:bg-sky-700 dark:focus:ring-sky-900"
            onClick={UploadDoubt}
          >
            Post Doubt
          </button>
        </div>
      )}
    </>
  );
};

export default Doubt;
