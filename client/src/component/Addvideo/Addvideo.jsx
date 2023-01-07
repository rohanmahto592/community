import React, { useState } from "react";
import { categories } from "../Sidebar/categories";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Confetti from "react-confetti";
import Alertmessage from "../Alert/Alertmessage";
const Addvideo = ({user}) => {
    const navigate = useNavigate();
  const [video, setvideo] = useState("");
  const [check, setcheck] = useState(false);
  const [title, setTitle] = useState("");
  const [category,setcategory]=useState('')
  const [text,setText]=useState('')
  const [wrongfile,setwrongfile]=useState(false)
  const [files,setfiles]=useState('')
  const [link,setlink]=useState('')
  const [lapse, setlapse] = useState(false);
  const[videofiles,setvideofiles]=useState(null)
  const [open,setOpen]=useState(false)
  const [check2,setcheck2]=useState(false);
  let videofile=[]
  let links=[]
  let Videos=[]
  let videolink=[]
  const videos = (e) => {
     Videos.push(e.target.files[0]);
     console.log(e.target.files[0])
    if (e.target.files[0].type === "video/mp4" || e.target.files[0].type === "video/mov" ||e.target.files[0].type === "video/quicktime" ) {
      setcheck(false);
      setvideo(Videos[0]);
      videofile.push(URL.createObjectURL(Videos[0]));
      setvideofiles([...videofile])
      
    } else {
      setcheck(true);
    }
}
    const uploadfiles = async (e) => {
        if (e.target.files[0].type === "application/pdf") {
          setwrongfile(false);
          var file = e.target.files[0];
          console.log(file);
          setfiles(file);
        } else {
          setwrongfile(true);
        }
      };
      const Uploadvideo=async()=>{
         
        if (files) {
            var formdata = new FormData();
            formdata.append("file", files);
            formdata.append("cloud_name", "gcet");
            formdata.append("upload_preset", "pdf_Files");
            await fetch("https://api.cloudinary.com/v1_1/gcet/auto/upload", {
              method: "post",
              mode: "cors",
              body: formdata,
            }).then(async (res) => {
              let json = await res.json();
              links.push(json.secure_url);
              
            });
          }
         
          if(video)
          {
            var Formdata = new FormData();
            Formdata.append("file", video);
            Formdata.append("cloud_name", "gcet");
            Formdata.append("upload_preset", "pdf_Files");
            await fetch("https://api.cloudinary.com/v1_1/gcet/auto/upload", {
              method: "post",
              mode: "cors",
              body: Formdata,
            }).then(async (res) => {
              let json = await res.json();
              videolink.push(json.secure_url);
              
              
            });
          }
          if(videolink.length<=0)
          {
            setOpen(true)
            setcheck2(true);
          }
          else
          {

          
          const data={
            title: title,
            text: text,
            category: category,
            Address: link,
            video: videolink[0],
            pdf: links[0],
            created_by:user?._id,
            created_At: Date.now(),
            created_by_image: user?.imageUrl,

          }
          axios.post("http://localhost:3001/posts/videos", data).then((response) => {
      setlapse(true);
      setTimeout(() => {
        setlapse(false);
        navigate("/");
      }, 7000);
    });
  }


      }
  return (
    <>
   {check2===true && <Alertmessage message="Hey u forgot to upload Videos" open={open} setOpen={setOpen} type="error" setcheck={setcheck2}/>}
    {
        lapse?<Confetti/>:
        <div
      style={{ margin: "auto", marginTop: "5vh" }}
      class="max-w-xl justify-center items-center p-6 bg-white  border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
    {
       videofiles?
       <video class="w-full max-w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700" controls>
         <source src={videofiles[0]} type="video/mp4"/>
         Your browser does not support the video tag.
       </video>:
       <>
       <label
        style={{ fontFamily: "comic sans ms" }}
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
        for="file_input"
      >
        Upload Video Shots
      </label>
      <div class="max-w-xl flex items-center justify-center w-full mt-5">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center rounded-md justify-center w-full h-64 border-2 border-gray-300 border-dashed  cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                      <span class="font-semibold text-sky-700">Click to upload</span> 
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-500">
                      MP4 , MOV , (MAX 40 MB)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                    multiple
                    onChange={videos}
                  />
                </label>
              </div>
      </>
       
    }
        
      
      {check ? (
        <p
          style={{ fontFamily: "comic sans ms" }}
          class="mt-1 text-sm text-gray-500 dark:text-pink-500"
          id="file_input_help"
        >
          Wrong File Type.Please select .mp4,.mov
        </p>
      ) : null}
      <div class="mb-6">
        <label
          style={{ fontFamily: "comic sans ms" }}
          for="small-input"
          class="block mb-2 mt-2 text-md font-medium text-gray-900 dark:text-gray-200"
        >
          Title
        </label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          id="small-input"
          class="block border-none w-full p-2 text-violet-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-violet-500 dark:focus:ring-violet-500 dark:focus:border-blue-500"
        />
        <label
          style={{ fontFamily: "comic sans ms" }}
          for="small-input"
          class="block mb-2 mt-2 text-md font-medium text-gray-900 dark:text-gray-200"
        >
         Your thoughts
        </label>
        <textarea
              id="message"
              rows="4"
              onChange={(e) => setText(e.target.value)}
              class="block p-2.5 w-full text-sm text-violet-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-violet-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
        <label
              style={{ fontFamily: "comic sans ms" }}
              class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-200"
              for="file_input"
            >
              Upload file for refrence
            </label>
            <input
              style={{ fontFamily: "comic sans ms" }}
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              onChange={uploadfiles}
            />
            <label
              style={{ fontFamily: "comic sans ms" }}
              class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-200"
              for="file_input"
            >
              Add Link Address
            </label>
            <input
              style={{ fontFamily: "comic sans ms" }}
              class="block w-full text-md text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="text"
              onChange={(e) => setlink(e.target.value)}
            />
            {wrongfile ? (
              <p
                style={{ fontFamily: "comic sans ms" }}
                class="mt-1 text-sm text-gray-500 dark:text-gray-200"
                id="file_input_help"
              >
                Wrong File Type.Please select PDF
              </p>
            ) : (
              <p
                style={{ fontFamily: "comic sans ms" }}
                class="mt-1 text-sm text-gray-500 dark:text-gray-200"
                id="file_input_help"
              >
                Pdf(MAX 20MB).
              </p>
            )}
        <div className="flex flex-col">
              <label
                for="message"
                style={{ fontFamily: "comic sans ms" }}
                class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-200"
              >
                Select a Tag!!
              </label>
              <select
                onChange={(e) => setcategory(e.target.value)}
                className="outline-none w-2/5 bg-gray-600 text-white  border-b-2 p-2 rounded-md cursor-pointer "
              >
                <option value="other" className="text-sky-700">
                  Tag
                </option>
                {categories?.map((item) => (
                  <option
                    className="text-base border-0 outline-none capitalize bg-white text-black font-bold"
                    value={item?.name}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            
      </div>
      <button
            style={{ fontFamily: "comic sans ms" }}
            type="button"
            class=" focus:outline-none text-white bg-violet-800 hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-sky-800 dark:hover:bg-violet-700 dark:focus:ring-violet-900"
            onClick={Uploadvideo}
          >
            Publish Post
          </button>
    </div>

    }
    
    
    </>
  );
};

export default Addvideo;
