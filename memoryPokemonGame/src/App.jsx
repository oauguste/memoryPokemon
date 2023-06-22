import Title from "./components/Title";
import "./App.css";
import CurrentScoreBtn from "./components/CurrentScoreBtn";
import Level from "./components/Level";
import BestScoreBtn from "./components/BestScoreBtn";
import CardComponent from "./components/CardComponent";
import { useEffect, useState } from "react";

function App() {
  // const [currentScore, setCurrentScore] = useState(0);
  // const [bestScore, setBestScore] = useState([]);
  const [level, setLevel] = useState(2);
  const [cardNumber, setCardNumber] = useState(5);
  const [images, setImages] = useState([]);

  const x = 10;

  useEffect(() => {
    const request = async () => {
      try {
        for (let i = 0; i < cardNumber; i++) {
          const randomNumber = Math.floor(
            Math.random() * 1010
          );
          const url = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
          const urlResponse = await fetch(url);
          const json = await urlResponse.json();
          const sprite = json.sprites.front_default;
          const spriteName = json.name;
          console.log(sprite);
          setImages((prevState) => {
            const newState = [...prevState];
            newState[i] = {
              pokemon: sprite,
              name: spriteName,
            };
            return newState;
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }, [cardNumber]);

  return (
    <div className="app">
      <div className="title">
        <Title />
      </div>
      <div className="score">
        <CurrentScoreBtn />
        <Level />
        <BestScoreBtn />
      </div>
      <div className="cards">
        {images.map((image, index) => (
          <CardComponent
            key={index}
            img={image.pokemon}
            name={image.name}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
