import React, { useState } from "react";
import Carasol from "../Carasoul/Carasol";
import { categories } from "../Sidebar/categories";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import axios from "axios";
import { useEffect } from "react";
import Alertmessage from "../Alert/Alertmessage";
var images = [];
var imagearray = [];
var links = [];
const Addimages = ({ user }) => {
  const navigate = useNavigate();
  
  const [sliderImages, setSliderImages] = useState(null);
  const [category, setcategory] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [lapse, setlapse] = useState(false);
  const [link, setlink] = useState("");
  const [files, setfiles] = useState(null);
  const [wrongfile, setwrongfile] = useState(false);
  const [imagefile, setimagefile] = useState([]);
  const [Image, setimages] = useState(null);
  const [check,setcheck]=useState(false);
  const [open,setOpen]=useState(false)
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

  const uploadimages = (e) => {
    let Images = e.target.files;
    setimages(Images);
    Object.keys(Images).forEach((key) => {
      imagearray.push(URL.createObjectURL(Images[key]));
    });
    setSliderImages([...imagearray]);
  };
  const AddPost = async () => {
    if(images.length<=0)
    {
      
      setcheck(true);
      setOpen(true);
      
    }
    else
    {
    const data = {
      title: title,
      text: text,
      category: category,
      address: link,
      images: images,
      pdf: links[0],
      created_by:user?._id,
      created_At: Date.now(),
      created_by_image: user?.imageUrl,
    };
    axios.post("http://localhost:3001/posts/images", data).then((response) => {
      setlapse(true);
      setTimeout(() => {
        setlapse(false);
        navigate("/");
      }, 2000);
    });
  }
  };
  const UploadImages = async () => {
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
    if(Image)
    {
    Object.keys(Image).forEach(async (key) => {
      var formdata = new FormData();
      formdata.append("file", Image[key]);
      formdata.append("cloud_name", "gcet");
      formdata.append("upload_preset", "pdf_Files");
      await fetch("https://api.cloudinary.com/v1_1/gcet/auto/upload", {
        method: "post",
        mode: "cors",
        body: formdata,
      }).then(async (res) => {
        let json = await res.json();
        images.push(json.secure_url);
        
      });
    });
  }
    setTimeout(() => {
      AddPost();
    }, 1000);
  };
  
  return (
      <div
      style={{ margin: "auto", marginTop: "5vh" }}
      class="max-w-xl justify-center items-center p-6 bg-white  border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
    <Alertmessage message="Hey u forgot to upload images" open={open} setOpen={setOpen} type="error" setcheck={setcheck}/>
      {lapse ? (
        <Confetti />
      ) : (
        <>
          <div
            style={{ margin: "auto", marginTop: "5vh" }}
            className=" max-w-xl  bg-gray-800"
          >
            {sliderImages ? (
              <Carasol sliderImages={sliderImages} />
            ) : (
              
              <div class="max-w-xl flex items-center justify-center w-full mt-5">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed  cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                      <span class="font-semibold">Click to upload</span>
                    </p>
                    <p class="text-sm text-gray-500 dark:text-pink-500">
                      SVG, PNG, JPG or GIF (MAX 10 MB)
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
           
          </div>
         
          <div class="mb-6">
          
            <label
              style={{ fontFamily: "comic sans ms" }}
              for="small-input"
              class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              id="small-input"
              style={{ fontFamily: "comic sans ms" }}
              class="block w-full p-3 text-md text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              
             
            />

            <label
              for="message"
              style={{ fontFamily: "comic sans ms" }}
              class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your Thoughts!!
            </label>
            <textarea
              id="message"
              rows="4"
              onChange={(e) => setText(e.target.value)}
              style={{ fontFamily: "comic sans ms" }}
              class="block w-full text-md text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              
              type="text"
              placeholder="Write your thoughts here..."
            ></textarea>
            <label
              style={{ fontFamily: "comic sans ms" }}
              class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              for="file_input"
            >
              Add Link Address
            </label>
            <input
              style={{ fontFamily: "comic sans ms" }}
              class="block w-full p-2 text-md text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="text"
              onChange={(e) => setlink(e.target.value)}
            />

            <label
              style={{ fontFamily: "comic sans ms" }}
              class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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
            {wrongfile ? (
              <p
                style={{ fontFamily: "comic sans ms" }}
                class="mt-1 text-sm text-gray-500 dark:text-red-500"
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
                Pdf(MAX 10MB).
              </p>
            )}
            <div className="flex flex-col">
              <label
                for="message"
                style={{ fontFamily: "comic sans ms" }}
                class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Select a Tag!!
              </label>
              <select
                onChange={(e) => setcategory(e.target.value)}
                className="outline-none w-2/5 bg-gray-600 text-white  border-b-2 p-2 rounded-md cursor-pointer "
              >
                <option value="other" className="text-white">
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
            class=" focus:outline-none text-white bg-gray-800 hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-900"
            onClick={UploadImages}
          >
            Publish Post
          </button>
        </>
      )}
    </div>
  );
};

export default Addimages;
