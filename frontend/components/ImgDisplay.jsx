import React from "react";
 
const ImgDisplay = (props) => {
  
  const { imgList } = props;
  const {selectedImage, setSelectedImage} = props;

  const handleClick = (e) => {
    setSelectedImage(e.key)
  }

  return ( 

    <div className="img-result">
      {/* {imgList.data.map((el.url, i) => 
        <div>   
          <img 
          src={el.url} 
          key={i}
          />
        </div>
      )} */}
      image display 
    </div>
   );
}
 
export default ImgDisplay;