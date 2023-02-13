import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import pathObj from "../../utils/apiPath";
import EditPost from "./EditPost";
import "./singlePost.css";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  console.log("path", path);
  const [singlePost, setSinglePost] = useState({});

  const { user, dispatch, isFetching } = useContext(Context);

  const { navigate } = useNavigate();

  const [show, setShow] = useState();

  const handleToggle = () => {
    setShow(!show);
  };

  const getSinglePost = async () => {
    const res = await axios.get(
      process.env.REACT_APP_API_PATH + pathObj.singlePost + path,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    setSinglePost(res?.data);
  };

  console.log("singlePost", singlePost);

  const handleDelete = async () => {
    try {
      if (window.confirm(`Are you sure you want to delete?`)) {
        const res = await axios.delete(
          process.env.REACT_APP_API_PATH + pathObj.singlePost + singlePost._id,
          { data: { username: user.username } }
        );
        if (res.status == 200) {
          window.location.replace("/");
        }
      }
    } catch (error) {
      console.log("error in get all users list==>>>>", error.message);
    }
  };

  useEffect(() => {
    getSinglePost();
  }, [path]);

  // const PF = "https://murli-server.up.railway.app/images/";

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <div className="mb-4">
          {singlePost?.photo && (
            <img className="postImg" src={singlePost?.photo} alt="" />
          )}
        </div>
        <h1 className="singlePostTitle">
          {singlePost?.title}
          <div className="singlePostEdit">
            {singlePost?.username == user?.username && (
              <>
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => handleToggle()}
                ></i>

                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={() => handleDelete()}
                ></i>
              </>
            )}
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/posts/${singlePost?.username}`}>
                {singlePost?.username}
              </Link>
            </b>
          </span>
          <span>{new Date(singlePost?.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="singlePostDesc">{singlePost?.desc}</p>
      </div>

      {
        <EditPost
          show={show}
          handleToggle={handleToggle}
          singlePost={singlePost}
          getSinglePost={getSinglePost}
        />
      }
    </div>
  );
};

export default SinglePost;
