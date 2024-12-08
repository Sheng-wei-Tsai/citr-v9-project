import React from "react";
import { createRoot } from "react-dom/client";
import Pizza from "./Pizza";

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Padre Gino's"),
    React.createElement(Pizza, {
      name: "The Pepperoni Pizza",
      description: "Some dope pizze yo",
    }),
    React.createElement(Pizza, {
      name: "Americano Pizza",
      description: "French fries and hot dogs, wft Italy",
    }),
    React.createElement(Pizza, {
      name: "Chicken Pizza?",
      description: "Chicken nuggies on your pizza, wft UK",
    }),
    React.createElement(Pizza, {
      name: "Baked Potato Pizza",
      description: "Unholy potato mash, wft Minnesota",
    }),
    React.createElement(Pizza),
  ]);
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
