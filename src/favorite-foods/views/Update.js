import { useNavigate, useParams } from "react-router-native";
import React from "react";
import FoodForm from "../components/food-form";
import Navbar from "../../components/navbar";
import { StorageService } from "../services";
import { useState } from "react";
import { useEffect } from "react";
import _ from 'lodash'

const Update = () => {
    const navigate = useNavigate();

    const {id} = useParams();

    const [favoriteFood, setFavoriteFood] = useState({
        id: id,
        name: '',
        description: '',
        isFavorite: false
    });

    useEffect(() => {
        fetchData()
    },[])

    // Busca os dados do prato sendo atualizado
    const fetchData = async () => {
        const data = await StorageService.getOrCreateDataAsync();
        
        const item = _.find(data, f => f.id == id);

        setFavoriteFood(item);
    }

    // Atualiza os dados no storage novamente
    const onSubmit = async (data) => {
        const storageData = await StorageService.getOrCreateDataAsync();
        
        const favoriteFoodIndex = _.findIndex(storageData, f => f.id == id);

        storageData[favoriteFoodIndex] = data;

        await StorageService.setDataAsync(storageData);

        navigate('/');

    }
    return (
        <>
            <Navbar title='Atualizar' to='/' />
            <FoodForm onSubmit={onSubmit} title='Atualizar Prato' initialValues={favoriteFood}/>
        </>
    )
}

export default Update;