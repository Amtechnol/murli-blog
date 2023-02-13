import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router";

// import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import Banner from "../../components/banner/Banner";
import Post from "../../components/post/Post";

const Homepage = () => {
  const location = useLocation();
  console.log(location);

  return (
    <>
      <Banner />
      <div className="home">
        <Container>
          <Row>
            <Col md={9}>
              <Post />
            </Col>
            <Col md={3}>
              <Sidebar />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Homepage;
