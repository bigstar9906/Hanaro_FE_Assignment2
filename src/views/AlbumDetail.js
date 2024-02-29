import React, { useState, useEffect } from "react";
import MainCard from "../layout/MainCard";
import { useNavigate } from "react-router-dom";
import { useAlbum } from "../state/AlbumContext";
function AlbumDetail() {
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();

  const {albumState} = useAlbum();
  const albumId = albumState.selectedAlbum.id;
  
  

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`, {signal: controller.signal})
      .then((response) => response.json())
      .then((data) => setPhotos(data)).catch((error) => {
        console.log(error);
        }
        );
        return () => {
        }
  }, [albumId]);
  return (
    <MainCard title={albumState.selectedAlbum.title}>
      <div className="grid gap-2">
        <div className="row row-gap-5 row-cols-5">
          {photos.map((photo) => (
            <div key={photo.id} className="col">
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
            />
            </div>
          ))}
          <div className="h-10"></div>
          <div className="w-100 bg-white fixed-bottom p-2">
                <button onClick={()=>{navigate('/album')}} className="ms-5 btn btn-primary btn-lg">뒤로</button>
            </div>
        </div>
      </div>
    </MainCard>
  );
}

export default AlbumDetail;
