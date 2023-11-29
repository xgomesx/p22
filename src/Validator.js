import * as yup from 'yup';

export const feedValidationSchema = yup.object().shape({
  nome: yup.string().required('Campo obrigatório'),
  telefone: yup.string().required('Campo obrigatório'),
  cpf: yup.string().required('Campo obrigatório'),
});
