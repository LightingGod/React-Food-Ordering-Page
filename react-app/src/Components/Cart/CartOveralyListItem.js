import React from "react";
import styles from "./CartListItem.module.css";

const CartItemCard = (props)=>{
    const buttonclickHandler1 = (event)=>{
        event.preventDefault();
        props.removeitem(props.alldata.id);
    }

    const buttonclickHandler2 = (event)=>{
        event.preventDefault();
        props.additem({
            id: props.alldata.id,
            name: props.alldata.name,
            amount: 1,
            price: props.alldata.price
        })
    }

    return (
        <div className={styles.formclass}>
            <div>
                <h2>{props.alldata.name}</h2>
                <div className={styles.summary}>
                    <p className={styles.price}>{props.alldata.price}</p>
                    <p className={styles.amount}>X {props.alldata.amount}</p>
                </div>
            </div>
            <div>
                <button className={styles["cart-itembutton"]} onClick={buttonclickHandler1}>-</button>
                <button className={styles["cart-itembutton"]} onClick={buttonclickHandler2}>+</button>
            </div>
        </div>
    )
}

export default CartItemCard;