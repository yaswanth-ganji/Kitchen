import React from "react";
import ReactDom from "react-dom";
import Swiggy from "./components/swiggy";
import { CartProvider } from "react-use-cart";

class App extends React.Component {
  render() {
    return (
      <CartProvider>
        <Swiggy />
      </CartProvider>
    );
  }
}
ReactDom.render(
  <App />,

  document.getElementById("root")
);
