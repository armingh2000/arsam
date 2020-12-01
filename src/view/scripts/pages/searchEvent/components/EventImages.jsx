import React from "react";
import {
  Carousel,
  Image} from "antd";

const EventImages = (props) =>
{


    const imagesArray = props.images;
    console.log(imagesArray);
    if(imagesArray.length > 0)
    {
      return (<Carousel autoplay autoplaySpeed="50" speed="1000" fade className="carousel">
            {
              imagesArray.map((img) => {
                return <div className="image-div">
                  {
                  // <Image src={img}  alt="event image"/>
                  }
                  {
                    <Image src={`data:image/jpeg;base64,${img}`}  alt="event image"/>
                  }
                </div>
            })
          }
              </Carousel>
            );
    }
    else{
      return <div></div>;
    }
}

export default EventImages;