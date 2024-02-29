import "./App.css";
import NavigationScroll from "./layout/NavigationScroll";
import Routes from "./routes";
import { LoginProvider } from "./state/UserContext";
import { AlbumProvider } from "./state/AlbumContext";

function App() {
  return (
    <LoginProvider>
      <AlbumProvider>
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </AlbumProvider>
    </LoginProvider>
  );
}

export default App;
