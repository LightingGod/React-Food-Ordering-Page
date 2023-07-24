import React,{useState,useEffect} from "react";
import ListItem from "./ListItems";
import styles from "./MainList.module.css";

const ListArea = () => {
    const [All_MEALS,SetMeals] = useState([]);

    useEffect(()=>{
        const myinterval = setInterval(async () => {
            const response = await fetch('/getAllFoodItems');
            const alldata = await response.json();
            
            const tempAll_Meal= [];
            for(let i = 0;i<alldata.body.length;i++){
                tempAll_Meal.push({
                    id: alldata.body[i].ProductId,
                    name: alldata.body[i].FoodName,
                    description: alldata.body[i].FoodDescription,
                    price: alldata.body[i].Price
                })
            }
            if(JSON.stringify(All_MEALS)!==JSON.stringify(tempAll_Meal)){
                console.log("Meal Data Recieved");
                SetMeals(tempAll_Meal);
            }
        }, 4000);

        return ()=>{
            clearInterval(myinterval);
        }
        
    },[All_MEALS]);

    return (
        <div className={styles.mainArea}>
            {All_MEALS.map((meal) => {
                return (
                        <ListItem key = {meal.id} alldata = {meal}/>
                )
            })}
        </div>
    )
}

export default ListArea;