import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

export default function FormFilmes({ route }) {
  const navigation = useNavigation();
  const { acao, filme: filmeAntigo } = route.params;

  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [lancamento, setLancamento] = useState('');
  const [diretor, setDiretor] = useState('');
  const [showMensagemErro, setShowMensagemErro] = useState(false);

  useEffect(() => {
    if (filmeAntigo) {
      setNome(filmeAntigo.nome);
      setCategoria(filmeAntigo.categoria);
      setLancamento(filmeAntigo.lancamento);
      setDiretor(filmeAntigo.diretor);
    }
  }, [filmeAntigo]);

  function salvar() {
    if (nome === '' || categoria === '' || lancamento === '' || diretor === '') {
      setShowMensagemErro(true);
    } else {
      setShowMensagemErro(false);

      const filmeNovo = {
        nome: nome,
        categoria: categoria,
        lancamento: lancamento,
        diretor: diretor,
      };

      if (filmeAntigo) {
        acao(filmeAntigo, filmeNovo);
      } else {
        acao(filmeNovo);
      }

      Toast.show({
        type: 'success',
        text1: 'filme salvo com sucesso!',
      });

      navigation.goBack();
    }
  }

  return (

    <ImageBackground
      source={require('../assets/backfilmes.webp')} // Substitua pelo caminho da sua imagem
      style={styles.background}
      resizeMode="cover" // Ou outro modo de redimensionamento que preferir
    >
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
          {filmeAntigo ? 'Editar filme' : 'Adicionar filme'}
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            label={'filme'}
            mode="outlined"
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
          <TextInput
            style={styles.input}
            label={'categoria'}
            mode="outlined"
            keyboardType="text"
            value={categoria}
            onChangeText={(text) => setCategoria(text)}
          />
          <TextInput
            style={styles.input}
            label={'Lançamento'}
            mode="outlined"
            value={lancamento}
            onChangeText={(text) => setLancamento(text)}
          />
          <TextInput
            style={styles.input}
            label={'diretor'}
            mode="outlined"
            value={diretor}
            onChangeText={(text) => setDiretor(text)}
          />
          {showMensagemErro && (
            <Text style={{ color: 'red', textAlign: 'center' }}>Preencha todos os campos!</Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} mode="contained-tonal" onPress={() => navigation.goBack()}>
            Voltar
          </Button>
          <Button style={styles.button} mode="contained" onPress={salvar}>
            Salvar
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
}

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
  background: {
    flex: 1,
    width: '100%', // Ocupa toda a largura disponível
    height: '100%', // Ocupa toda a altura disponível
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
});
