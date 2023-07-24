import {useRef} from 'react';
import React from "react";
import styles from "./ListItem.module.css";
import { Context } from 'react';
import { useContext } from 'react';
import CartContext from '../../Store/cart-context';


const ListItem = (props) => {
    const amountEnteredRef = useRef();
    const contextctx = useContext(CartContext);

    const FormSubmitEventHandler = (event) => {
        event.preventDefault();
        const EnteredAmount = amountEnteredRef.current.value;   
        const EnteredAmountNumber = +EnteredAmount;

        contextctx.addItem({
            id: props.alldata.id,
            name: props.alldata.name,
            amount: EnteredAmountNumber,
            price: props.alldata.price
        })
    }

    return (
        <form className={styles.listContainer}>
            <div>
                <p className={styles.name}>{props.alldata.name}</p>
                <p className={styles.description}>{props.alldata.description}</p>
                <p className={styles.price}>Rs {props.alldata.price}</p>
            </div>
            <div className={styles.container2}>
                <div>
                    <label className={`${styles.name} ${styles.mymargin}`}>Amount</label>
                    <input ref={amountEnteredRef} id={props.alldata.id} type="number" className={styles.myinput} defaultValue={1} min={1} max={5}></input>
                </div>
                <button type="submit" className={styles.mybutton} onClick={FormSubmitEventHandler}>+ Add</button>
            </div>
        </form>
    )
}

export default ListItem;