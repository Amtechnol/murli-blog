import "./banner.css";

const Banner = () => {
  return (
    <div className="header">
      {/* <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">BLOG</span>
      </div> */}
      <img className="headerImg" src="images/banner.png" alt="" />
    </div>
  );
};

export default Banner;
