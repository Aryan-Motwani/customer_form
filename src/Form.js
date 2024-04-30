import React, { useEffect, useState } from "react";
import "./form.css";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./db";
import jamun from "./jamun.png";

function Form() {
  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const [dob, setDob] = useState();

  let handleSubmit = async (e) => {
    e.preventDefault();
    const doc = await addDoc(collection(db, "users"), {
      name: name,
      number: num,
      dob: dob,
    });
    console.log("done", doc);
    window.location = "/card";
  };

  return (
    <div class="container">
      <div class="card">
        <img className="jamun-img" src={jamun}></img>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="date"
            name="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <input
            type="number"
            name="number"
            value={num}
            onChange={(e) => setNum(e.target.value)}
            placeholder="Number"
            required
          />
          <button>Submit</button>
          {/* {`width = ${window.innerWidth} height = ${window.innerHeight} `} */}
          {/* {} */}
        </form>
      </div>
    </div>
  );
}

export default Form;
