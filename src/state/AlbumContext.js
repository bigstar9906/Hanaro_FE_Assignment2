import React, { useReducer, useContext, createContext } from "react";

// 선택된 앨범 정보를 저장할 context를 생성합니다.
const AlbumContext = createContext();

// 선택된 앨범 정보를 관리할 reducer를 정의합니다.
function albumReducer(state, action) {
  switch (action.type) {
    case "SELECT":
     localStorage.setItem("selectedAlbum", JSON.stringify(action.payload));
      return { ...state, selectedAlbum: action.payload };
    case "UNSELECT":
        localStorage.removeItem("selectedAlbum");
        return { ...state, selectedAlbum: null };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

// context provider 컴포넌트를 정의합니다.
export function AlbumProvider({ children }) {
  const [albumState, albumDispatch] = useReducer(albumReducer, { selectedAlbum: null });
  if (albumState.selectedAlbum===null){
    const selectedAlbum = localStorage.getItem("selectedAlbum");
    if(selectedAlbum){
      albumDispatch({ type: "SELECT", payload: JSON.parse(selectedAlbum) });
    }
  }

  return (
    <AlbumContext.Provider value={{ albumState, albumDispatch }}>
      {children}
    </AlbumContext.Provider>
  );
}

// 선택된 앨범 정보를 가져오는 커스텀 훅을 정의합니다.

export function useAlbum() {
    const context = useContext(AlbumContext);
    if (context === undefined) {
        throw new Error("useAlbum must be used within a AlbumProvider");
    }
    return context;
    }




