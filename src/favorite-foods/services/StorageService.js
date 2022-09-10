import * as SecureStore from 'expo-secure-store';


const STORAGE_KEY = 'favorite-foods';

// Busca os pratos salvos no storage
const getOrCreateDataAsync = async () => {
    const data = await SecureStore.getItemAsync(STORAGE_KEY);
    return data ? JSON.parse(data) : []; 
}

// Salva os dados no storage
const setDataAsync = async (data) => {
    return SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(data));
}


export {getOrCreateDataAsync, setDataAsync }

// Serviço de armazenamento