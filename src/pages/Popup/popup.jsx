import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../../style.css";
const App = () => {
  return (
    <section className="flex w-[400px] flex-col justify-start gap-4 bg-slate-800 px-8 py-4 text-green-600 ">
      <h1 className="text-lg ">ReadMojo</h1>
    </section>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
