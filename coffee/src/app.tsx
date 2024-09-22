import { useEffect, useState } from "preact/hooks";
import "./app.css";
import coffeeLogo from "/coffee.gif";
import init, { clock } from "../pkg/coffee_break_wasm.js";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const runClock = async () => {
      await init();

      const updateClock = () => {
        setCurrentTime(clock());
      };

      const intervalId = setInterval(updateClock, 1000);
      updateClock();

      return () => clearInterval(intervalId);
    };

    runClock();
  }, []);

  return <div id="clock">{currentTime}</div>;
};

const GifAnimation = () => {
  useEffect(() => {
    const gif = document.getElementById("gif");

    const showGif = () => {
      gif!.style.display = "block";
      setTimeout(
        () => {
          gif!.style.display = "none";
        },
        5 * 60 * 1000,
      );
    };

    const intervalId = setInterval(showGif, 25 * 60 * 1000);
    showGif();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div id={"gif"}>
      <p>Break Time for 5 min</p>
      <img src={coffeeLogo} alt="Animal Coffee" />
      <img src={coffeeLogo} alt="Animal Coffee" />
      <img src={coffeeLogo} alt="Animal Coffee" />
    </div>
  );
};

const App = () => (
  <div>
    <Clock />
    <GifAnimation />

    <footer className={"footer"}>
      <p>© {new Date().getFullYear()} Create by komisan19</p>
      <a href="https://www.buymeacoffee.com/komisan19">
        <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=komisan19&button_colour=100f0f&font_colour=ffffff&font_family=Cookie&outline_colour=ffffff&coffee_colour=FFDD00" />
      </a>
    </footer>
  </div>
);

export default App;
