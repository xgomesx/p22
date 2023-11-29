import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, View } from 'react-native';
import { Button, Card, FAB, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ListaFilmes() {
  const navigation = useNavigation();
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function carregarFilmes() {
      try {
        const filmesSalvos = await AsyncStorage.getItem('filmes');
        if (filmesSalvos) {
          setFilmes(JSON.parse(filmesSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar filmes:', error);
      }
    }

    carregarFilmes();
  }, []);

  async function adicionarFilme(filmeNovo) {
    const novaListaFilmes = [...filmes, filmeNovo];

    await AsyncStorage.setItem('filmes', JSON.stringify(novaListaFilmes));
    setFilmes(novaListaFilmes);
    Toast.show({
      type: 'success',
      text1: 'Filme adicionado com sucesso!',
    });
  }

  async function excluirFilme(filme) {
    const novaListaFilmes = filmes.filter((filmeItem) => filmeItem !== filme);

    await AsyncStorage.setItem('filmes', JSON.stringify(novaListaFilmes));
    setFilmes(novaListaFilmes);
    Toast.show({
      type: 'success',
      text1: 'Filme excluído com sucesso!',
    });
  }

  async function editarFilme(filmeAntigo, filmeNovo) {
    const novaListaFilmes = filmes.map((filme) =>
      filme === filmeAntigo ? { ...filme, ...filmeNovo } : filme
    );

    await AsyncStorage.setItem('filmes', JSON.stringify(novaListaFilmes));
    setFilmes(novaListaFilmes);
    Toast.show({
      type: 'success',
      text1: 'Filme editado com sucesso!',
    });
    navigation.goBack();
  }

  return (


    <ImageBackground
      source={require('../assets/backfilmes.webp')} // Substitua pelo caminho da sua imagem
      style={styles.background}
      resizeMode="cover" // Ou outro modo de redimensionamento que preferir
    >
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
          Lista de Filmes
        </Text>
        <FlatList
          style={styles.list}
          data={filmes}
          renderItem={({ item }) => (
            <Card mode="outlined" style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.titleMedium} variant="titleMedium">Filme: {item?.nome}</Text>
                  <Text variant="bodyLarge">Diretor: {item?.diretor}</Text>
                  <Text variant="bodyLarge">Gênero: {item?.genero}</Text>
                  <Text variant="bodyLarge">Comentário: {item?.comentario}</Text>
                </View>
              </Card.Content>
              <Card.Actions>
                <Button
                  onPress={() =>
                    navigation.push('FormFilmes', {
                      acao: (filmeAntigo, filmeNovo) => editarFilme(item, filmeAntigo, filmeNovo),
                    })
                  }>
                  Editar
                </Button>
                <Button onPress={() => excluirFilme(item)}>Excluir</Button>
              </Card.Actions>
            </Card>
          )}
        />
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.push('FormFilmes', { acao: adicionarFilme })}
        />
      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  title: {
    color:'red',
    fontWeight: 'bold',
    margin: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    backgroundColor: 'red',
  },
  list: {
    width: '90%',
  },
  card: {
    marginTop: 15,
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: '#d3d3d3',
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15,
  },


  card: {
    marginTop: 15,
    backgroundColor: 'white', // Cor de fundo do cartão
    borderColor: 'black', // Cor da borda do cartão
    borderWidth: 1,
    borderRadius: 8, // Borda arredondada
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'column',
    padding: 15,
  },
  // Estilos do texto dentro do cartão
  bodyLarge: {
    fontSize: 16,
    marginBottom: 3,
    color: '#555', // Cor do texto
  },
  titleMedium: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#3742fa', // Cor para título do filme
  },
  bodyLarge: {
    fontSize: 16,
    marginBottom: 3,
    color: '#333', // Cor para outros detalhes
    fontWeight: 'bold', // Tornando outros detalhes em negrito
  },
  // Dentro do seu StyleSheet.create, ajuste os estilos do ImageBackground
  background: {
    flex: 1,
    width: '100%', // Ocupa toda a largura disponível
    height: '100%', // Ocupa toda a altura disponível
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },

});



