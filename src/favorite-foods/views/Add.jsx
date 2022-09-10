import { useNavigate } from "react-router-native";
import React from "react";
import FoodForm from "../components/food-form";
import Navbar from "../../components/navbar";
import { StorageService } from "../services";

const Add = () => {

    const navigate = useNavigate();
    
    // Salva os dados no storage
    const onSubmit = async (favoriteFood) => {
        const data = await StorageService.getOrCreateDataAsync();
        data.push(favoriteFood);

        await StorageService.setDataAsync(data);
        
        navigate('/');

    }
    return ( 
       <>
        <Navbar title='Adicionar' to='/'/>
        <FoodForm onSubmit={onSubmit} title='Adicionar Prato' />
       </>
    )
}
 
export default Add;