import React from "react";
import { Formik } from 'formik';
import FormInput from '../../../components/form-input'
import { Box, Button, HStack, KeyboardAvoidingView, Stack, Text, ScrollView, Heading, Checkbox } from "native-base";
import { FoodSchema } from "../../schemas";
import uuid from 'react-native-uuid';
import { useNavigate } from "react-router-native";

// Componente de formulário da aplicação
const FoodForm = ({onSubmit, title, initialValues}) => {
    const navigate = useNavigate();
    
    return ( 
        <ScrollView bg="primary.50" h="100%">
            <KeyboardAvoidingView behavior='position'  >
                <Box w="100%" safeArea>
                    <Heading ml='4'>{title}</Heading>
                    <Formik
                        initialValues={initialValues ?? {
                            id: uuid.v4(),
                            name: '',
                            description: '',
                            isFavorite: false
                        }}
                        validationSchema={FoodSchema}
                        onSubmit={(data) => onSubmit(data)}
                        enableReinitialize
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) =>{

                            return (
                                <Stack space={2} w='100%'>
                                    <FormInput
                                        name="name"
                                        value={values.name}
                                        error={errors.name}
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        labelDisplayName='Nome do prato'
                                        placeholder="Feijoada"
                                        touched={touched}
                                        required
                                    />

                                    <FormInput
                                        name="description"
                                        value={values.description}
                                        error={errors.description}
                                        onChangeText={handleChange('description')}
                                        onBlur={handleBlur('description')}
                                        labelDisplayName='Descrição do prato'
                                        placeholder="Um prato da culinária mineira"
                                        touched={touched}
                                    />

                                    <HStack space={2} mx='4' alignItems='center'>
                                        <Text fontSize='16'>É favorito?</Text>
                                        <Checkbox
                                            isChecked={values.isFavorite}
                                            onChange={(value) => setFieldValue('isFavorite', value)}
                                            accessibilityLabel='É favorito' 
                                        />
                                    </HStack>

                                    <HStack mt='3' w='100%' alignItems='center' justifyContent='space-between'>
                                        <Button flex='1' mx={4} onPress={() => navigate('/')} title="Submit" size='lg' bg='danger.600'>
                                            <Text color='white'>Cancelar</Text>
                                        </Button>
                                        <Button flex='1' mx={4} onPress={handleSubmit} title="Submit" size='lg' >
                                            <Text color='white'>Ok</Text>
                                        </Button>
                                    </HStack>

                                </Stack>
                            )
                        }}
                    </Formik>
                </Box>
            </KeyboardAvoidingView>
        </ScrollView>

    );
}
 
export default FoodForm;