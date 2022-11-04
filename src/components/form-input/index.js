import { FormControl, HStack, Icon, Input, Stack, Text, WarningOutlineIcon } from "native-base";
import React from "react";
import { FontAwesome } from '@expo/vector-icons'


// Componente de input personalizado da aplicação
const FormInput = ({
    iconName,
    iconColor,
    keyboardType,
    inputType,
    name,
    placeholder,
    value,
    labelDisplayName,
    inputRightElement,
    error,
    touched,
    labelColor,
    containerProps,
    required,
    ...rest }) => {

    const hasInputError = () => {
        if (error && touched && touched[name]) {
            return true;
        }
        return false;
    }

    const renderIcon = (hasError) => {
        if (iconName && iconColor) {
            return <Icon as={FontAwesome} size={6} ml='4' color={hasError ? "error.400" : iconColor} name={iconName} />;
        }

        return null;

    }
    const hasError = hasInputError();

    return (
        <>
            <FormControl isInvalid={hasError} w='100%'>
                <Stack {...containerProps} mx="4">
                    <HStack space={1} alignItems='center'>
                        <FormControl.Label _text={{
                            fontSize: '16',
                            color: hasError ? "error.700" : labelColor ?? 'black',
                        }} >{labelDisplayName}</FormControl.Label>
                        {required && <Text fontSize={18} color='danger.500'>*</Text>}
                    </HStack>
                    <Input
                        name={name}
                        variant='filled'
                        placeholderTextColor='light.400'
                        fontSize={16}
                        bg="primary.200"
                        color='black'
                        keyboardType={keyboardType}
                        value={value}
                        InputLeftElement={renderIcon(hasError)}
                        type={inputType}
                        placeholder={placeholder}
                        InputRightElement={inputRightElement}
                        selectionColor='white'
                        {...rest}
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon color="error.700" size="xs" />}>
                        <Text color='error.700' fontSize={13}>{error}</Text>
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>
        </>
    )
}

export default FormInput;