import React from "react";
import MainHeader from "../Header/Header";
import styles from "./MainView.module.css"
import Wallpaper from "../../Images/wallpaper.webp"
import ListArea from "../FoodArea/MainListArea";
import DescriptionArea from "../FoodArea/DescrptionArea";
import CartProvider from "../../Store/CartProvider";

const MainScreen = ()=>{
    return (
        <CartProvider>
            <MainHeader />
            <div className={styles['main-image']}>
                <img src = {Wallpaper}></img>
            </div>
            <DescriptionArea />
            <ListArea />
        </CartProvider>
    )
}

export default MainScreen;