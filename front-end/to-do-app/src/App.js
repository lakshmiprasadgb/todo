import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./components/root";
import store from "./components/redux-store/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Root />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
