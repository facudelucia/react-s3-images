import { useContext, useEffect } from "react";
import { Context } from '../context/Context';
import ImageCard from "./ImageCard";
import Error from "./Error";

function ImageList() {

  const { listImages, images, error } = useContext(Context)

  useEffect(() => {
    listImages()
  }, []);


  return (
    <div className="container">
      <h1 className="text-center">Image List</h1>
      {
        error && <Error />
      }
      <div className="row">
        {images.length > 0 && images.map((image) => (
          <ImageCard key={image.Key} image={image} />
        ))}
      </div>
    </div>
  );
}

export default ImageList;