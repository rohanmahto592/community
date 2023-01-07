import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import { Stack, Chip, Avatar } from "@mui/material";
import Divider from "../Feed/Divider";
import upvote from "../../assests/icons/upvote.png";
import Tooltip from "@mui/material/Tooltip";
import github from "../../assests/icons/github.png";
import linkd from "../../assests/icons/linkedln.png";
import twitter from "../../assests/icons/twitter.webp";
import leetcode from '../../assests/icons/leetcode.png'
import gfg from '../../assests/icons/gfg.png'
import codechef from '../../assests/icons/codechef.png'
import codeforces from '../../assests/icons/codeforces.png'
import Articlepin from "../pages/Articlepin";
import axios from "axios";
import Masonry from "react-masonry-css";
import Videopin from "../pages/Videopin";
import save from "../../assests/icons/change.webp";
import Button from "@mui/material/Button";
import Rating from "../Rating/Rating";
const breakpointobj = {
  default: 4,
  3000: 6,
  2000: 4,
  1200: 3,
  1000: 2,
  500: 1,
};
let background = [];
let img = [];
let imagearray = [];
const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-35 outline-none";
const notActiveBtnStyles =
  "bg-white mr-4 text-black font-bold p-2 rounded-full w-35 outline-none";
const Userprofile = ({ user }) => {
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const [pins, setpins] = useState(null);
  const [pins2, setpins2] = useState(null);
  const [rate, setRate] = useState(0);
  const [profile, setprofile] = useState("No");
  const [tempimage, setimage] = useState(null);
  const [userinfo, setuserinfo] = useState(null);
  const [profilepic, setprofilepic] = useState(null);
  const navigate = useNavigate();
  const User =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  const { userId } = useParams();
  const logout = () => {
    localStorage.clear();

    navigate("/login");
  };
  const uploadBackground = (e) => {
    console.log(e.target.files[0]);
    background.push(e.target.files[0]);
    setimage(URL.createObjectURL(e.target.files[0]));
  };
  let arr = [];
  let arr2 = [];
  useEffect(() => {
    const id = userId;
    axios.get(`http://localhost:3001/users/${id}`).then((response) => {
      console.log("userinfo", response.data);
      setuserinfo(response.data);
      const savepin = response.data?.savepin;
      savepin?.map(
        async (item) =>
          await axios
            .get(`http://localhost:3001/posts/article/savepin/${item}`)
            .then((response) => {
              console.log("pinss", response.data);
              if (response?.data) {
                arr.push(response.data);
                setpins([...arr]);
              }
            })
      );
      console.log("pin1", arr);

      savepin?.map(
        async (item) =>
          await axios
            .get(`http://localhost:3001/posts/videos/savepin/${item}`)
            .then((response) => {
              if (response?.data) {
                if (arr2.includes(response.data)) {
                } else {
                  arr2.push(response?.data);
                  setpins2(null);
                  setpins2([...new Set(arr2)]);
                }
              }
            })
      );
    });
  }, []);

  const saveBackground = async () => {
    console.log(background[0]);
    if (background.length > 0) {
      var formdata = new FormData();
      formdata.append("file", background[0]);
      formdata.append("cloud_name", "gcet");
      formdata.append("upload_preset", "pdf_Files");
      formdata.append("api_key", "372991464257781");
      await fetch("https://api.cloudinary.com/v1_1/gcet/auto/upload", {
        method: "post",
        mode: "cors",
        body: formdata,
      }).then(async (res) => {
        let json = await res.json();
        console.log(json.secure_url);
        img.push(json.secure_url);
      });
      const id = user?._id;
      axios
        .put(`http://localhost:3001/users/background/${id}`, { data: img[0] })
        .then((response) => {});
    }
  };
  const delBackground = (id) => {
    axios
      .delete(`http://localhost:3001/users/delbackground/${id}`)
      .then((response) => {
        window.location.reload();
      });
  };

  const changeprofile = (e) => {
    console.log(e.target.files[0]);
    setprofilepic(e.target.files[0]);
    imagearray.push(URL.createObjectURL(e.target.files[0]));
    console.log("user-profile", imagearray[0]);
    if (imagearray.length > 0) {
      setprofile("yes");
    }
  };
  const updateprofile = async () => {
    var formdata = new FormData();
    formdata.append("file", profilepic);
    formdata.append("cloud_name", "gcet");
    formdata.append("upload_preset", "pdf_Files");
    formdata.append("api_key", "372991464257781");
    await fetch("https://api.cloudinary.com/v1_1/gcet/auto/upload", {
      method: "post",
      mode: "cors",
      body: formdata,
    }).then(async (res) => {
      let json = await res.json();
      const link = json.secure_url;
      console.log(link);
      const id = user?._id;
      axios
        .put(`http://localhost:3001/users/update/${id}`, { data: link })
        .then((response) => {
          window.location.reload();
        });
    });
  };

  return (
    <div className="relative pb-2 mb-5 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-4">
          <div className="flex flex-col justify-center items-center">
            {userinfo?.backgroundImage ? (
              <img
                className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
                src={userinfo?.backgroundImage}
                alt="user-pic"
              />
            ) : tempimage ? (
              <img
                className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
                src={tempimage}
                alt="user-pic"
              />
            ) : (
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
                    <span class="font-semibold">Add Background Image</span>
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  class="hidden"
                  onChange={uploadBackground}
                />
              </label>
            )}

            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={
                profile === "yes" && imagearray.length > 0
                  ? imagearray[0]
                  : userinfo?.imageUrl
              }
              alt="user-pic"
            />
            {userinfo?.googleId === User.googleId &&
              (profile === "yes" && imagearray.length > 0 ? (
                <Button
                  sx={{ marginTop: "10px", color: "whitesmoke" }}
                  variant="outlined"
                  onClick={updateprofile}
                >
                  Update Profile
                </Button>
              ) : (
                <>
                  <label
                    htmlFor="filePicker"
                    className="border-2 border-sky-500 px-2 py-1 mt-4 text-sm text-white rounded-xl"
                  >
                    Select Image
                  </label>
                  <input
                    id="filePicker"
                    style={{
                      visibility: "hidden",
                      whiteSpace: "nowrap",
                      border: "none",
                      padding: "7px 15px",
                      fontWeight: "700",
                      borderRadius: "3px",
                    }}
                    onChange={changeprofile}
                    accept="image/*"
                    type="file"
                  />
                </>
              ))}
          </div>
          <p
            style={{
              fontFamily: "comic sans ms",
              color: "whitesmoke",
              fontSize: "2.5vh",
            }}
            className="font-bold text-md  text-center mt-1 "
          >
            {userinfo?.userName}
          </p>
          <h4
            style={{ fontFamily: "comic sans ms" }}
            className="font-bold text-gray-200 text-lg text-center mt-3"
          >
            {userinfo?.about}
          </h4>
          <div className="absolute top-0 z-4 right-0 p-2">
            {userinfo?.googleId === User.googleId && (
              <GoogleLogout
                clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                render={(renderProps) => (
                  <button
                    type="button"
                    className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <AiOutlineLogout color="red" fontSize={21} />
                  </button>
                )}
                onLogoutSuccess={logout}
                cookiePolicy="single_host_origin"
              />
            )}
          </div>
          {userinfo?.googleId === User.googleId &&
            (userinfo?.backgroundImage ? (
              <div className=" absolute top-10 right-0 z-4  p-2">
                <button
                  style={{ fontFamily: "comic sans ms" }}
                  className=" bg-sky-500 p-1 mt-5 text-sm text-white rounded-md"
                  onClick={() => delBackground(user?._id)}
                >
                  Delete Background
                </button>
              </div>
            ) : (
              <div className="absolute top-10 right-0 z-4  p-2">
                <button
                  style={{ fontFamily: "comic sans ms" }}
                  className="bg-violet-600 p-2 mt-5 text-white rounded-md"
                  onClick={saveBackground}
                >
                  Set Background
                </button>
              </div>
            ))}
          <Stack
            sx={{
              justifyContent: "center",
              marginTop: "3vh",
              maxWidth: "100vw",
            }}
            direction="row"
            spacing={1}
          >
            {userinfo?.github?.length > 0 && (
              <Tooltip
                title="Github"
                onClick={() => window.location.assign(userinfo.github)}
              >
                <Avatar alt="Natacha" src={github} />
              </Tooltip>
            )}
            {userinfo?.leetcode?.length > 0 && (
              <Tooltip
                title="leetcode"
                onClick={() => window.location.assign(userinfo.leetcode)}
              >
                <Avatar alt="Natacha" src={leetcode} />
              </Tooltip>
            )}
            
            
            {userinfo?.gfg?.length > 0 && (
              <Tooltip
                title="GeeksForGeeks"
                onClick={() => window.location.assign(userinfo.gfg)}
              >
                <Avatar alt="Natacha" src={gfg} />
              </Tooltip>
            )}
            {userinfo?.codechef?.length > 0 && (
              <Tooltip
                title="Codechef"
                onClick={() => window.location.assign(userinfo.codechef)}
              >
                <Avatar alt="Natacha" src={codechef} />
              </Tooltip>
            )}
            {userinfo?.codeforces?.length > 0 && (
              <Tooltip
                title="Codeforces"
                onClick={() => window.location.assign(userinfo.codeforces)}
              >
                <Avatar alt="Natacha" src={codeforces} />
              </Tooltip>
            )}
            {userinfo?.linkedln?.length > 0 && (
              <Tooltip
                title="Linkedln"
                onClick={() => window.location.assign(userinfo.linkedln)}
              >
                <Avatar alt="Natacha" src={linkd} />
              </Tooltip>
            )}
            {userinfo?.twitter?.length > 0 && (
              <Tooltip
                title="Twitter"
                onClick={() => window.location.assign(userinfo.twitter)}
              >
                <Avatar alt="Natacha" src={twitter} />
              </Tooltip>
            )}
          </Stack>
          <Rating
            id={userId}
            loginId={user?._id}
            rate={rate}
            setRate={setRate}
          />
        </div>
      </div>
      {userinfo?.googleId === User.googleId && (
        <div className="text-center mb-7">
          {/* <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('created');
            }}
            className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Created
          </button> */}
          <button
            type="button"
            style={{ fontSize: "1.8vh", fontFamily: "comic sans ms" }}
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("saved");
            }}
            className={`${activeBtnStyles}`}
          >
            Saved Pins
          </button>
        </div>
      )}
      {userinfo?.googleId === User.googleId && (
        <div className="px-2 ">
          <Divider value=" Saved Articles" />
          <Masonry
            className="flex   animate-slide-fwd"
            breakpointCols={breakpointobj}
          >
            {pins?.length > 0 &&
              pins?.map((pin) => (
                <Articlepin
                  user={userinfo && userinfo}
                  key={pin?._id}
                  pin={pin}
                  check="True"
                />
              ))}
          </Masonry>
          <Divider value=" Saved Shots" />
          <Masonry
            className="flex   animate-slide-fwd"
            breakpointCols={breakpointobj}
          >
            {pins2?.length > 0 &&
              pins2?.map((pin) => (
                <Videopin
                  user={userinfo && userinfo}
                  key={pin?._id}
                  pin={pin}
                  check="True"
                />
              ))}
          </Masonry>
        </div>
      )}
      
    </div>
  );
};

export default Userprofile;
