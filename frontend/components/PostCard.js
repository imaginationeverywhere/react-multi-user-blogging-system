
import {
    Card,
    CardBody,
    CardImg,
    CardText
  } from "reactstrap";
  
  function PostCard(){
    return (
      <>
        <Card style={{ width: "20rem" }}>
          <CardImg
            alt="..."
            data-src="holder.js/100px180/?text=Image cap"
            top
          ></CardImg>
          <CardBody>
            <CardText>
              Some quick PostCard text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
          </CardBody>
        </Card>
      </>
    );
  }
  
  export default PostCard;