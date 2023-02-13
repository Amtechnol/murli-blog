import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import "./single.css";
import { Container, Row, Col } from "react-bootstrap";
const Single = () => {
  return (
    <div className="single">
      <Container>
        <Row>
          <Col md={9}>
            <SinglePost />
          </Col>
          <Col md={3}>
            <Sidebar />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Single;
