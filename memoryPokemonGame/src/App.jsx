import Title from "./components/Title";
import "./App.css";
import CurrentScoreBtn from "./components/CurrentScoreBtn";
import Level from "./components/Level";
import BestScoreBtn from "./components/BestScoreBtn";
import CardComponent from "./components/CardComponent";
import { useEffect, useState } from "react";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  // const [bestScore, setBestScore] = useState([]);
  const [level, setLevel] = useState(2);
  const [cardNumber, setCardNumber] = useState(4);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [name, setName] = useState([]);
  const [expectedOrder, setExpectedOrder] = useState(0);
  const [secondClone, setSecondClone] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);

  useEffect(() => {
    const request = async () => {
      try {
        for (let i = 0; i < cardNumber; i++) {
          const randomNumber = Math.floor(
            Math.random() * 1009
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
              order: i,
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

  useEffect(() => {
    const request = async () => {
      try {
        for (let i = 0; i < name.length; i++) {
          const pokeName = name[i].name;
          const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
          const urlResponse = await fetch(url);
          const json = await urlResponse.json();
          const sprite = json.sprites.front_default;
          const spriteName = json.name;
          console.log(sprite);
          setNewImages((prevState) => {
            const newState = [...prevState];
            newState[i] = {
              pokemon: sprite,
              name: spriteName,
              order: name[i].order,
            };
            return newState;
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }, [name]);

  const addNametoNewArray = (addedName) => {
    setName((prevName) => [...prevName, addedName]);
  };
  const removeItems = (indexToRemove) => {
    const nameToRemove = images[indexToRemove].name;
    const orderToKeep = images[indexToRemove].order;
    const newImages = images.filter(
      (_, index) => index !== indexToRemove
    );
    setImages(newImages);
    addNametoNewArray({
      name: nameToRemove,
      order: orderToKeep,
    });
    setOriginalOrder((prevOrder) => [
      ...prevOrder,
      nameToRemove,
    ]);
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  useEffect(() => {
    const newImagesDeepCopy = JSON.parse(
      JSON.stringify(newImages)
    );

    // console.log(newImagesDeepCopy);
    shuffleArray(newImagesDeepCopy);
    setSecondClone([...newImagesDeepCopy]);
  }, [newImages]);

  const removes = (nameToRemove) => {
    const imageIndex = secondClone.findIndex(
      (item) => item.name === nameToRemove
    );
    if (
      imageIndex !== -1 &&
      nameToRemove === originalOrder[expectedOrder]
    ) {
      setExpectedOrder(expectedOrder + 1);
      const newImagesArray = secondClone.filter(
        (item) => item.name !== nameToRemove
      );
      scoring();
      if (newImagesArray.length === 0) {
        resetGame();
      } else {
        setSecondClone(newImagesArray);
      }
    } else {
      console.log("Wrong order!");
    }
  };

  //scoring
  const resetGame = () => {
    setCardNumber(cardNumber + 2); // Increase the card number by 2
    setCurrentScore(0); // Reset current score
    setImages([]);
    setNewImages([]);
    setName([]);
    setExpectedOrder(0);
    setOriginalOrder([]);
    setSecondClone([]); // Reset the secondClone state
  };

  const scoring = () => {
    setCurrentScore(currentScore + 1);
  };
  const increaseCardCount = () => {
    if (currentScore === secondClone.length + 1) {
      resetGame(); // Call resetGame if currentScore equals the length of secondClone
    }
  };

  return (
    <div className="app">
      <div className="title">
        <Title />
      </div>
      <div className="score">
        <CurrentScoreBtn number={currentScore} />
        <Level />
        <BestScoreBtn />
      </div>
      <div className="cards">
        {images.map((image, index) => (
          <CardComponent
            key={image.name}
            img={image.pokemon}
            name={image.name}
            remove={() => {
              removeItems(index);
            }}
          />
        ))}

        <div className="removedPokemon">
          {images.length === 0
            ? secondClone.map((image, index) => (
                <CardComponent
                  key={image.name}
                  img={image.pokemon}
                  name={image.name}
                  remove={() => {
                    removes(image.name);
                    increaseCardCount();
                  }}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default App;
