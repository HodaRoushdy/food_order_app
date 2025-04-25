import { useEffect, useState } from "react";
import styles from './meals.module.css';
import { useCartHook } from "../../hooks/useCartHook";

const Meals = () => {

    const [meals, setMeals] = useState([]);
    const { state, dispatch } = useCartHook();

    useEffect(() => {
        const fetchMeals = async () => {
            const res =  await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
            const allMeals = await res.json()
            console.log(allMeals.meals)
        const mealsWithPrices = await allMeals.meals.map(meal => ({
                id: meal.idMeal,
                name: meal.strMeal,
                image: meal.strMealThumb,
                price: (Math.random() * 15 + 5).toFixed(2), // random price between 5 and 20
        }));
            setMeals(mealsWithPrices)
        }
        fetchMeals()
    },[])

    return (
        <div className={styles.mealsContainer}>
            {meals.map(meal =>
            (
                <div className={styles.mealCard} key={meal.id}>
                    <img src={meal.image}  />
                    <h3>{meal.name}</h3>
                    <p>{meal.price}$</p>
                    <button onClick={() => dispatch({ type: 'addItem', payload: meal })} className="globalbutton">Add To Cart</button>
                </div>
            ))}
        </div>
    )
}
export default Meals;