import './styles.css';
import Puzzle from '../../assets/puzzle.png'
import cards from '../../cards';
import { useState } from 'react';
import CardBack from '../../assets/card-back.png'
import Congrats from '../../assets/congrats.png'


function Main() {
  const [card, setCard] = useState(cards);

  function handleshuffleCards() {
    let localCard = [...card];

    const shuffledCards = localCard.sort(() => Math.random() - 0.5);
    setCard(shuffledCards);
  }

  function handleResetCards() {
    let localCard = [...cards];

    localCard.forEach((card) => {
      card.turned = false;
    });

    setCard(localCard);
  }

  function handleTurnCard(cardId) {
    let localCard = [...card];

    if ((localCard.filter((card) => card.turned)).length >= 2) return;

    const findCard = localCard.find((card) => {
      return card.id === cardId;
    });

    findCard.turned = true;

    const turnedCards = localCard.filter((card) => {
      return card.turned;
    });

    if (turnedCards.length === 2) {

      setTimeout(() => {
        if (turnedCards[0].slug === turnedCards[1].slug) {
          localCard = localCard.filter((card) => {
            return !card.turned;
          });

          return setCard(localCard);
        }

        if (turnedCards[0].slug !== turnedCards[1].slug) {
          localCard = localCard.map((card) => {
            return { ...card, turned: false };
          });

          return setCard(localCard);
        }
      }, 1000);
    }

    setCard(localCard);

  }

  return (
    <div className='container'>
      <div className='bar-side'>
        <div className='cubos-info'>
          <img src={Puzzle} alt="puzzle" />
          <div
            className='cubos-puzzle-name'
          > CUBOS PUZZLE </div>
        </div>
        <div className='btn-div'>
          <button
            className='btn-embaralhar'
            onClick={() => handleshuffleCards()}
          > EMBARALHAR </button>
          <button
            className='btn-reset'
            onClick={() => handleResetCards()}
          > RESET </button>
        </div>
      </div>

      <div className='cards-side'>
        <div className='cards'>
          {card.length ?
            card.map((card) => (
              <img
                key={card.id}
                className='card'
                onClick={() => handleTurnCard(card.id)}
                src={card.turned ? card.image : CardBack}
                alt="Card"
              />
            )) :
            <div className='congrats'>
              <img src={Congrats} alt="Congrats" />
            </div>
          }
        </div>
      </div>
    </div>
  );
}



export default Main;
