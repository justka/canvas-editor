import NiceModal from "@ebay/nice-modal-react";

import "./App.css";
import { Layout } from "./features/Layout/Layout";

function App() {
  return (
    <NiceModal.Provider>
      <Layout />
    </NiceModal.Provider>
  );
}

export default App;
