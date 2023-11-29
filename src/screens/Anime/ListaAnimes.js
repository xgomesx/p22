import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, FAB, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ListaAnimes() {
  const navigation = useNavigation();
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    async function carregarAnimes() {
      try {
        const animesSalvos = await AsyncStorage.getItem('animes');
        if (animesSalvos) {
          setAnimes(JSON.parse(animesSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar animes:', error);
      }
    }

    carregarAnimes();
  }, []);

  async function adicionarAnime(animeNovo) {
    const novaListaAnimes = [...animes, animeNovo];

    await AsyncStorage.setItem('animes', JSON.stringify(novaListaAnimes));
    setAnimes(novaListaAnimes);
    Toast.show({
      type: 'success',
      text1: 'Anime adicionado com sucesso!',
    });
  }

  async function excluirAnime(anime) {
    const novaListaAnimes = animes.filter((animeItem) => animeItem !== anime);

    await AsyncStorage.setItem('animes', JSON.stringify(novaListaAnimes));
    setAnimes(novaListaAnimes);
    Toast.show({
      type: 'success',
      text1: 'Anime excluído com sucesso!',
    });
  }

  async function editarAnime(animeAntigo, animeNovo) {
    const novaListaAnimes = animes.map((anime) =>
      anime === animeAntigo ? { ...anime, ...animeNovo } : anime
    );

    await AsyncStorage.setItem('animes', JSON.stringify(novaListaAnimes));
    setAnimes(novaListaAnimes);
    Toast.show({
      type: 'success',
      text1: 'Anime editado com sucesso!',
    });
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Lista de animes
      </Text>
      <FlatList
        style={styles.list}
        data={animes}
        renderItem={({ item }) => (
          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium">Anime: {item?.nome}</Text>
                <Text variant="bodyLarge">Diretor: {item?.diretor}</Text>
                <Text variant="bodyLarge">Gênero: {item?.genero}</Text>
                <Text variant="bodyLarge">Comentário: {item?.comentario}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() =>
                  navigation.push('FormAnimes', {
                    acao: (animeAntigo, animeNovo) => editarAnime(item, animeAntigo, animeNovo),
                  })
                }>
                Editar
              </Button>
              <Button onPress={() => excluirAnime(item)}>Excluir</Button>
            </Card.Actions>
          </Card>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push('FormAnimes', { acao: adicionarAnime})}
      />
    </View>
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
});
