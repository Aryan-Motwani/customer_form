import ScratchCard from "react-scratchcard";
import couponCover from "./blue_card.png";
import squareImg from "./square.png";
import sample from "./sample.jpeg";
import { useEffect, useState } from "react";
import "./yt.css";

function Youtube() {
  let decider = [
    { w: 200, img: squareImg },
    { w: 500, img: couponCover },
  ];
  const idx = window.innerWidth <= 500 ? 0 : 1;

  const settings = {
    width: decider[idx]["w"],
    height: decider[idx]["w"],
    image: decider[idx]["img"],
    finishPercent: 90,
    onComplete: () => console.log("completed"),
  };

  useEffect(() => {
    setTimeout(() => {
      // document.querySelector("canvas").style.top = "30%";
      document.querySelector(".App").style.opacity = "100%";
      // document.querySelector(".txt").style.fontSize = "30px";
      if (idx == 0) {
        document.querySelector("canvas").style.left = "40%";
        document.querySelector(".imgg").style.position = "absolute";
        document.querySelector(".imgg").style.left = "40%";
        document.querySelector(".imgg").style.height = "200px";
        document.querySelector(".imgg").style.width = "200px";
        // document.querySelector(".txt").style.left = "100%";
      }
      // document.querySelector(".txt").style.left = "100%";
      // document.querySelector(".Text").style.top = "10%";
    }, 1000);
  }, []);
  const [scratchedText, setScratchedText] = useState("");
  const handleScratchComplete = () => {
    console.log("The card is now clear!");
    setScratchedText("Congratulations! You WON!");
  };

  return (
    <div className="App" style={{ opacity: 0 }}>
      <header className="App-header">
        <ScratchCard {...settings}>
          <img className="imgg" src={sample}></img>
        </ScratchCard>
      </header>
    </div>
  );
}

export default Youtube;
