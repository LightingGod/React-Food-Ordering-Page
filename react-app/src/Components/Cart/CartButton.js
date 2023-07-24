import React ,{useContext} from "react";
import styles from "./CartButton.module.css";
import CartContext from "../../Store/cart-context";

const CartButton = (props) => {

    const Cartctx = useContext(CartContext);
    const numberofCartItem = Cartctx.items.reduce((curNumber,item)=>{
        return curNumber+item.amount
    },0);
    return (
        <>
            <div className={styles.cartButton} onClick={props.onClick}>
                <i className={`fa-solid fa-cart-shopping ${styles.cartIcon}`}></i>
                <p>Your Cart</p>
                <p className={styles.cartButtonNumber}>{numberofCartItem}</p>
            </div>
        </>
    )
}

export default CartButton;