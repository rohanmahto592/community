import React, { useState } from "react";
import { categories } from "../Sidebar/categories";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import axios from "axios";
import doubt from './article.png'
import Alertmessage from "../Alert/Alertmessage";
const Article = ({ user }) => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [lapse, setlapse] = useState(false);
  const [link, setlink] = useState("");
  const [files, setfiles] = useState(null);
  const [wrongfile, setwrongfile] = useState(false);
  const [alert,setalert]=useState(false)
  const [open,setOpen]=useState(false)
 
  const uploadfiles = async (e) => {
    if (e.target.files[0].type === "application/pdf") {
      setwrongfile(false);
      var file = e.target.files[0];
      console.log(file)
      setfiles(file);
    } else {
      setwrongfile(true);
    }
  };
  const publishArticle = async() => {
    let filelink=[];
    if(files)
    {
      var  formdata=new FormData()
    formdata.append('file',files)
    formdata.append('cloud_name','gcet')
    formdata.append('upload_preset','pdf_Files')
    let res = await fetch(
      "https://api.cloudinary.com/v1_1/gcet/auto/upload",
      {
        method: "post",
        mode: "cors",
        body: formdata
      }
    );

    let json = await res.json();
    filelink.push(json.secure_url);

    }
    
    const data = {
      title: title,
      text: text,
      category: category,
      Address:link,
      pdf:filelink[0],
      created_by:user?._id,
      created_by_image: user?.imageUrl,
      Date: Date.now(),
    };
    axios.post("http://localhost:3001/posts/article", data).then((response) => {
      setlapse(true);
      setalert(true)
      setOpen(true);
      setTimeout(() => {
        setlapse(false);
       
        navigate("/");

      }, 6000);
    });
  };
  return (
    <>
    {alert && <Alertmessage open={open} setOpen={setOpen} type="success" message="Article added successfully!!"/>}
      {lapse ? (
        <Confetti />
      ) : (
        <div
          style={{ margin: "auto", marginTop: "5vh" }}
          class="max-w-xl  justify-center items-center p-6 bg-white  border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
        >
          <p
            style={{ fontFamily: "comic sans ms", textAlign: "center" }}
            class="mb-4 text-xl font-normal text-gray-700 dark:text-sky-600"
          >
            Contribute to the community by adding an article!!.
          </p>
          <figure class="max-w-lg justify-center items-center ">
       
        <img
          class="mx-auto max-w-lg sm: h-56 md: h-56 lg:h-full rounded-lg"
          src={doubt}
          alt="image description"
        />
      </figure>
          
          

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
              x-webkit-speech
              class="block border-none w-full p-4 text-violet-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-violet-500 focus:border-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-violet-500 dark:focus:ring-violet-500 dark:focus:border-blue-500"
            />

            <label
              for="message"
              style={{ fontFamily: "comic sans ms" }}
              class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Thoughts!!
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
              class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Add Link Address
            </label>
            <input
              style={{ fontFamily: "comic sans ms" }}
              class="block w-full text-md text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="text"
              x-webkit-speech
              onChange={(e) => setlink(e.target.value)}
            />

            <label
              style={{ fontFamily: "comic sans ms" }}
              class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
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
            {wrongfile?(<p
              style={{ fontFamily: "comic sans ms" }}
              class="mt-1 text-sm text-gray-500 dark:text-red-500"
              id="file_input_help"
            >
              Wrong File Type.Please select PDF
            </p>):(
              <p
              style={{ fontFamily: "comic sans ms" }}
              class="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              Pdf(MAX 20MB).
            </p>

            )
            }
            <div className="flex flex-col">
              <label
                for="message"
                style={{ fontFamily: "comic sans ms" }}
                class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select a Tag for your article!!
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
            class=" focus:outline-none text-white bg-sky-800 hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-sky-800 dark:hover:bg-violet-700 dark:focus:ring-violet-900"
            onClick={publishArticle}
          >
            Publish Article
          </button>
        </div>
      )}
    </>
  );
};

export default Article;
