import { useEffect, useState } from "react";
import MainCard from "../layout/MainCard";
import { useLogin } from "../state/UserContext";
import { useAlbum } from "../state/AlbumContext";
import { useNavigate } from "react-router-dom";

function AlbumList() {
  const { state } = useLogin();
  const { albumState ,albumDispatch } = useAlbum();
  
  const [albums, setAlbums] = useState([]);
  const [selected, setSelected] = useState(albumState?.selectedAlbum);
  const navigate = useNavigate();

  

  const handleDetail = () => {
    if (selected) {
      albumDispatch({ type: "SELECT", payload: selected });
      navigate("/album/detail");
    } else {
      alert("앨범을 선택해주세요");
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    fetch(
      "https://jsonplaceholder.typicode.com/albums?userId=" + state.user.userId,{signal: controller.signal}
    )
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data);
      }).catch((error) => {
        console.log(error);
        }
        );
        return () => {
           controller.abort();
        }

  }, [state.user.userId]);

  return (
    <MainCard title="앨범 리스트">
      <div className="row">
        <div className="col-9">
          {albums?.map((album) => {
            return <div key={album.id} style={{ userSelect: "none" }}>
              {album?.id === selected?.id ? (
                <h4
                  className="rounded border border-success border-5 p-2 fit-content"
                  onClick={() => {
                    setSelected();
                  }}
                >
                  ✔{album.title}
                </h4>
              ) : (
                <h4
                  className="rounded border border-secondary border-5 p-2 fit-content"
                  onClick={() => {
                    setSelected(album);
                  }}
                >
                  {album.title}
                </h4>
              )}
            </div>
        })}
        </div>
        <div className="col-3">
          <button onClick={handleDetail} className="btn btn-success btn-lg">
            앨범 상세보기
          </button>
        </div>
      </div>
    </MainCard>
  );
}

export default AlbumList;
