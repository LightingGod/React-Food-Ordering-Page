import styles from "./Header.module.css";
import React , {useState} from "react";
import CartButton from "../Cart/CartButton";
import ReactDom from "react-dom";
import CartOverlay from "../Cart/CartOverlay";

const MainHeader = () => {

    const [flag,flagChanger] = useState(false);
    const CartButtonClickHandler =  ()=>{
        console.log("Hello");
        if(flag===false){
            flagChanger(true);
        }
        else{
            flagChanger(false);
        }
    }

    const closeHandler = ()=>{
        flagChanger(false);
    }

    return (
        <>
            {flag===true && ReactDom.createPortal(<CartOverlay close = {closeHandler}/>,document.getElementById('overlayContent'))}
            <header className={styles.header}>
                <h2>CustomMeals</h2>
                <CartButton onClick = {CartButtonClickHandler}></CartButton>
            </header>
        </>
    )
}

export default MainHeader;