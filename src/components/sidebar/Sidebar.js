import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pathObj from "../../utils/apiPath";
import "./sidebar.css";

const Sidebar = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [blogData, setBlogData] = useState({});

  const getCategoryData = async () => {
    const res = await axios.get(
      process.env.REACT_APP_API_PATH + pathObj.getCategories,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    setCategoryData(res?.data);
  };

  console.log("categoryData", categoryData);

  const getAllBlog = async () => {
    const res = await axios.get(
      process.env.REACT_APP_API_PATH + pathObj.getAllBlog,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    setBlogData(res?.data);
  };

  useEffect(() => {
    getCategoryData();
    getAllBlog();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem border p-4 rounded mb-4">
        <span className="sidebar-heading">About Me</span>
        {/* <img src="images/node.png" alt="" /> */}
        <p className="text-center">
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
      {/* <div className="sidebarItem border p-4 rounded mb-4">
        <span className="sidebar-heading">Categories</span>
        <ul className="sidebarList">
          {categoryData &&
            categoryData.map((item, i) => {
              return (
                <li className="sidebarListItem">
                  <Link className="link" to={`/cat/${item?.name}`}>
                    {item?.name}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div> */}

      <div className="sidebarItem border p-4 rounded mb-4">
        <span className="sidebar-heading mb-4">Popular Posts</span>

        <ul className="m-0 p-0 list-unstyled">
          {blogData.length > 0 &&
            blogData
              .map((item, i) => {
                return (
                  <li className="mb-3">
                    <Link
                      to={`/post/${item?._id}`}
                      className="d-flex text-black text-decoration-none"
                    >
                      <div>
                        <img src={item.photo} alt="" className="topImg" />
                      </div>
                      <div>
                        <h6>{item.title}</h6>
                        <span className="postDate text-start">
                          {" "}
                          {new Date(item?.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })
              .slice(0, 4)
              .reverse()}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
