import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { mask } from 'react-native-mask-text';

const FormFeed = ({ route }) => {
    const navigation = useNavigation();
    const { acao, feed: feedAntigo } = route.params;

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');


    const [showMensagemErro, setShowMensagemErro] = useState(false);

    useEffect(() => {
        const code = mask(telefone, "(99) 9 9999-9999")
        setTelefone(code)
    }, [telefone])

    useEffect(() => {
        const code = mask(cpf, "999.999.999-99")
        setCpf(code)
    }, [cpf])

    useEffect(() => {
        if (feedAntigo) {
            setNome(feedAntigo.nome);
            setTelefone(feedAntigo.telefone);
            setCpf(feedAntigo.cpf);
        }
    }, [feedAntigo]);

    function salvar() {
        if (nome === '' || telefone === '' || cpf === '') {
            setShowMensagemErro(true);
        } else {
            setShowMensagemErro(false);

            const feedNovo = {
                nome: nome,
                telefone: telefone,
                cpf: cpf,
            };

            if (feedAntigo) {
                acao(feedAntigo, feedNovo);
            } else {
                acao(feedNovo);
            }

            Toast.show({
                type: 'success',
                text1: 'Feedback salvo com sucesso!',
            });

            navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={styles.title}>
                {feedAntigo ? 'Editar feedback' : 'Adicionar feedback'}
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    label={'nome'}
                    mode="outlined"
                    value={nome}
                    onChangeText={(text) => setNome(text)}
                />
                <TextInput
                    style={styles.input}
                    label={'Telefone'}
                    mode="outlined"
                    keyboardType="numeric"
                    value={telefone}
                    onChangeText={(text) => setTelefone(text)}
                />
                
                <TextInput
                    style={styles.input}
                    label={'CPF'}
                    mode="outlined"
                    keyboardType='text'
                    value={cpf}
                    onChangeText={(text) => setCpf(text)}
                />

                {showMensagemErro && (
                    <Text style={{ color: 'red', textAlign: 'center' }}>Preencha todos os campos!</Text>
                )}
                <View style={styles.buttonContainer}>
                    <Button style={styles.button} mode="contained-tonal" onPress={() => navigation.goBack()}>
                        Voltar
                    </Button>
                    <Button style={styles.button} mode="contained" onPress={salvar}>
                        Salvar
                    </Button>
                </View>
            </View>
        </View>
    );
}

export default FormFeed

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        margin: 10,
    },
    inputContainer: {
        width: '90%',
        flex: 1,
    },
    input: {
        margin: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '90%',
        gap: 10,
        marginBottom: 10,
    },
    button: {
        flex: 1,
    },
});
