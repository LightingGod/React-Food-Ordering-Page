import React from "react";
import ReactDom from "react-dom";
import styles from "./CartOverlay.module.css"
import CartItemCard from "./CartOveralyListItem";
import CartContext from "../../Store/cart-context";
import { useState,useContext,useReducer,useRef } from "react";

const CartOverlay = (props) => {
    const [ToOrder,SetToOrder] = useState(false);
    const cartCtx = useContext(CartContext);
    const nameInputRef = useRef();
    const addressInputRef = useRef();

    const CloseButtonHandler = (event) => {
        event.preventDefault();
        props.close();
    }

    const OrderClickHandler1 = (event)=>{
        event.preventDefault();
        if(cartCtx.totalAmount>0){
            SetToOrder(true);
        }
    }

    const OrderClickHandler2 = (event)=>{
        event.preventDefault();
        const name = nameInputRef.current.value;
        const address = addressInputRef.current.value;
        const APIfetch = async ()=>{
            const response = await fetch('/makeneworder',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Name: name,
                    Address: address,
                    TotalAmount : cartCtx.totalAmount,
                    items: [...cartCtx.items]
                })
            });
            console.log(response.status);
            const data = await response.json();
            alert(`${data.message}`);
            props.close();
        }
        APIfetch();
    }

    return (
        <>
            <div className={styles.background} onClick={CloseButtonHandler}></div>
            <form className={styles.cartoverlay}>

                {/* List Of Food Selected */}
                <ul className={cartCtx.items.length>0 ? styles.allitemlist: ""}>
                {cartCtx.items.map((items) => {
                    return (
                        <CartItemCard key = {items.id} alldata={items} additem={cartCtx.addItem} removeitem ={cartCtx.removeItem}/>
                    )
                })}
                </ul>

                {ToOrder && <div className={styles.inputblock}>
                        <input type="text" name="name" className={styles.customInput} placeholder="Name" ref={nameInputRef}></input>
                        <input type="text" name="address" className={styles.customInput} placeholder="Address" ref={addressInputRef}></input>
                    </div>
                }

                {/* For Total Amount */}
                <div className={styles.total}>
                    <span>Total Amount</span>
                    <span>{cartCtx.totalAmount}</span>
                </div>

                {/* For Buttons */}
                {ToOrder === false ?
                    <div className={styles["actions"]}>
                        <button type="button" onClick={CloseButtonHandler}>Close</button>
                        <button onClick={OrderClickHandler1}>Order</button>
                    </div> 
                    :
                    <div className={styles["actions"]}>
                        <button type="button" onClick={CloseButtonHandler}>Cancel</button>
                        <button type="submit" onClick={OrderClickHandler2}>Confirm</button>
                    </div> 
                }
            </form>
        </>
    )
}

export default CartOverlay;