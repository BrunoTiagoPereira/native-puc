import { ArrowBackIcon, Box, HStack, Text } from "native-base";
import React from "react";
import { useNavigate } from "react-router-native";

// Componente da barra de navegação superior
const Navbar = ({ to, title, hasBackButton = true}) => {

    const navigate = useNavigate();
    return (
        <Box safeArea bg='primary.400' h='90' justifyContent='center'>
            <HStack alignItems='center' justifyContent='space-between' h='100%' >
                <HStack ml={2} space={2} alignItems='center' justifyContent='flex-start' h='100%'>
                    {hasBackButton && <ArrowBackIcon onPress={() => navigate(to ?? -1)} mr={2} size={6} color='white' />}
                    <Text fontSize={20} color='white'>{title}</Text>
                </HStack>
            </HStack>
        </Box>

    )
}

export default Navbar;