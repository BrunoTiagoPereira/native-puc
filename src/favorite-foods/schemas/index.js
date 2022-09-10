import * as Yup from "yup";

export const FoodSchema = Yup.object().shape({
    name: Yup.string()
        .required('O Nome deve ser válido'),
    description: Yup.string().notRequired(),
    isFavorite: Yup.bool().notRequired()       
});

// Schema de validação do formulário