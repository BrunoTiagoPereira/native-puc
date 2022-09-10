import { VStack, Text, Input, Center, HStack, Divider, Heading, Fab, AddIcon, ScrollView, DeleteIcon, FavouriteIcon, Icon } from "native-base";
import React from "react";
import { useNavigate } from "react-router-native";
import Navbar from '../../components/navbar'
import { useState } from "react";
import { useEffect } from "react";
import {StorageService} from '../services'
import _ from 'lodash'
import {FontAwesome} from '@expo/vector-icons'



const Home = () => {
    
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState('');
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    
    // Busca os dados no storage e, caso tenha, atualiza o componente
    const getData = async () => {
        const data = await StorageService.getOrCreateDataAsync();
        if(data.length > 0){
            setFoods(data)
        }
    }

    // Remove um item dos pratos no storage e na listagem
    const removeItem = async (id) => {
        const data = _.filter(foods, (p) => p.id !== id);
        await StorageService.setDataAsync(data);
        setFoods(data);
    } 

    // Renderiza o texto para ficar responsivo
    const renderText = (text) => {
        return text && text.length > 15 ? text.substring(0, 15) + "..." : text
    }
    
    // Renderiza cada item da listagem
    const renderItem = (item) => {
        return (
            <VStack key={item.id}>
                <HStack w='100%' bg='primary.300' h='20' padding='4' alignItems='center' justifyContent='space-between'>
                    <VStack h='100%' alignItems='flex-start' >
                        <Text color='white' fontSize='18'>{renderText(item.name)}</Text>
                        <Text color='gray.500' opacity='0.8'>{renderText(item.description)}</Text>
                    </VStack>
                    <HStack space={4} justifyContent='space-between'>
                        {item.isFavorite && <FavouriteIcon size={8} color='white' />}
                        <Icon as={FontAwesome} size={8} color='yellow.200' name='pencil' onPress={() => navigate(`update/${item.id}`)}/>
                        <DeleteIcon size={8} color='danger.600' onPress={() => removeItem(item.id) } />
                    </HStack>
                </HStack>
                <Divider/>
            </VStack>
            
        )
    }

    // Renderiza a lista de itens, Caso não tenha, mostra a mensagem que não tem nenhum cadastrado
    const renderList = () => {

        if (foods.length == 0) {
            return (
                <Center>
                    <Text>Não há pratos cadastros</Text>
                </Center>
            )
        }

        var data = foods;

        // Filtra os dados da lista pelo nome
        if(searchValue){
            data = _.filter(data, (p) => p.name.toLowerCase().includes(searchValue.toLowerCase()))
        }

        return (
           <>
                {data.map((p) => renderItem(p))}
           </>
        )
       
    }

    return (
        <>
           <Navbar title='Pratos' hasBackButton={false} />
           <ScrollView bg='primary.50'>
                <VStack h='100%' bg='primary.50' safeArea>
                    <Input alignSelf='center' mb='5' size="lg" mt='5' w='70%' placeholder='Pesquisar' value={searchValue} onChangeText={(e) => setSearchValue(e)} />
                    <Heading ml='2' size='md' mb='5' color='primary.400'>Seus Pratos</Heading>
                    {renderList()}
                    <Fab size='16' icon={<AddIcon />} onPress={() => navigate('/add')} />
                </VStack>
            </ScrollView>
        </>
    )
}
export default Home;