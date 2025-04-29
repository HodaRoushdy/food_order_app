import { useEffect, useState } from "react";
import styles from "./meals.module.css";
import { useCartHook } from "../../hooks/useCartHook";
import { ADD_ITEM } from "../../utils/constants";
import Lottie from "lottie-react";
import errorAnimation from '../../../public/error.json';
import loadingAnimation from '../../../public/loading.json';

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { dispatch } = useCartHook();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );
        const allMeals = await res.json();
        setIsLoading(false)
        if (!allMeals.meals) {
          setMeals([]);
          return;
        }
        const mealsWithPrices = await allMeals.meals.map((meal) => ({
          id: meal.idMeal,
          name: meal.strMeal,
          image: meal.strMealThumb,
          price: `${(Math.random() * 15 + 5).toFixed(2)} $`, // random price between 5 and 20
        }));
        setMeals(mealsWithPrices);
      } catch (error) {
        setError(error)
        console.log(error, "error while fetching data");
      }
    };
    fetchMeals();
  }, []);

  return (
    <div className={styles.mealsContainer}>
      {error ? <Lottie animationData={errorAnimation} loop={true} /> : (!isLoading ? meals.map((meal) => (
        <div className={styles.mealCard} key={meal.id}>
          <img src={meal.image} />
          <h3>{meal.name}</h3>
          <p>{meal.price}</p>
          <button
            onClick={() => dispatch({ type: ADD_ITEM, payload: meal })}
            className="globalbutton"
          >
            Add To Cart
          </button>
        </div>
      )) : <Lottie animationData={loadingAnimation} loop={true} />)}
    </div>
  );
};
export default Meals;
