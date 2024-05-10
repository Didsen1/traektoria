import { useEffect, useState } from 'react';
import { getVehicles } from '../../shared/api/api';
import Card from '../../card';
import { VehecleData } from '../model/types/VehecleData';
import styles from './App.module.scss'

function App() {
  const [cardList, setCardList] = useState<VehecleData[]>([])
  const [sortByPriceState, setSortByPriceState] = useState<boolean>(false)
  const [sortByYearState, setSortByYearState] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehicles = await getVehicles()
        setCardList(vehicles)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData()
  }, [])

  const sortByPrice = () => {
    const sortedCards = [...cardList].sort((a, b) => {
      if (sortByPriceState) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setSortByPriceState(!sortByPriceState)
    setCardList(sortedCards);
  }

  const sortByYear = () => {
    const sortedCards = [...cardList].sort((a, b) => {
      if (sortByYearState) {
        return a.year - b.year;
      } else {
        return b.year - a.year;
      }
    });
    setSortByYearState(!sortByYearState)
    setCardList(sortedCards)
  }

  const onDelete = (id: number) => {
    const sortedCards = cardList.filter(card => card.id !== id);
    setCardList(sortedCards)
  }

  const onUpdate = (id: number, newData: any) => {
    const sortedCards = cardList.map(card => {
      if (card.id === id) {
        return {
          ...card,
          name: newData.name,
          model: newData.model,
          price: newData.price,
        };
      }
      return card;
    });
    setCardList(sortedCards)
  }

  return (
    <div className={styles.App}>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} type='button' onClick={sortByPrice}>Сортировать по цене</button>
        <button className={styles.button} type='button' onClick={sortByYear}>Сортировать по году</button>
      </div>
      <main className={styles.main}>
        {cardList.map((card: any) => (
          <Card key={card.id} id={card.id} color={card.color} model={card.model} name={card.name} price={card.price} year={card.year} onDelete={onDelete} onUpdate={onUpdate} />
        ))}
      </main>
    </div>
  );
}

export default App;
