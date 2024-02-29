import React, { useReducer, useContext, createContext } from "react";
// 로그인 정보를 저장할 context를 생성합니다.
const LoginContext = createContext();

// 로그인 정보를 관리할 reducer를 정의합니다.
function loginReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("userName", action.payload.userName);
      return { ...state, user: action.payload };
    case "LOGOUT":
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      return { ...state, user: null };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

// context provider 컴포넌트를 정의합니다.
export function LoginProvider({ children }) {
  const [state, dispatch] = useReducer(loginReducer, { user: null });
  if( state.user === null && localStorage.getItem("userId") !== null){
    dispatch({ type: "LOGIN", payload: { userId: localStorage.getItem("userId"), userName: localStorage.getItem("userName") } });   
  }

  return (
    <LoginContext.Provider value={{ state, dispatch }}>
      {children}
    </LoginContext.Provider>
  );
}

// 로그인 정보를 가져오는 커스텀 훅을 정의합니다.
export function useLogin() {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
}
