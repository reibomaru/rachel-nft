import { Routes, Route } from "react-router-dom";
import Web3Provider from "./components/organisms/Web3Provider";
import Header from "./components/organisms/Header";
import HomePage from "./components/pages/HomePage";
import CreatePage from "./components/pages/CreatePage";
import DetailPage from "./components/pages/DetailPage";
import IndexPage from "./components/pages/IndexPage";
import "./App.css";
function App() {
  return (
    <div style={{ margin: 10 }}>
      <Web3Provider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nfts" element={<IndexPage />} />
          <Route path="/nfts/new" element={<CreatePage />} />
          <Route path="/nfts/:token" element={<DetailPage />} />
        </Routes>
      </Web3Provider>
      <br />
    </div>
  );
}

export default App;
