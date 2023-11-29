import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, FAB, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ListaManga() {
  const navigation = useNavigation();
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    async function carregarMangas() {
      try {
        const mangasSalvos = await AsyncStorage.getItem('mangas');
        if (mangasSalvos) {
          setMangas(JSON.parse(mangasSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar mangas:', error);
      }
    }

    carregarMangas();
  }, []);

  async function adicionarManga(mangaNovo) {
    const novaListaMangas = [...mangas, mangaNovo];

    await AsyncStorage.setItem('mangas', JSON.stringify(novaListaMangas));
    setMangas(novaListaMangas);
    Toast.show({
      type: 'success',
      text1: 'Manga adicionado com sucesso!',
    });
  }

  async function excluirManga(manga) {
    const novaListaMangas = mangas.filter((mangaItem) => mangaItem !== manga);

    await AsyncStorage.setItem('mangas', JSON.stringify(novaListaMangas));
    setMangas(novaListaMangas);
    Toast.show({
      type: 'success',
      text1: 'manga excluído com sucesso!',
    });
  }

  async function editarManga(mangaAntigo, mangaNovo) {
    const novaListaMangas = mangas.map((manga) =>
      manga === mangaAntigo ? { ...manga, ...mangaNovo } : manga
    );

    await AsyncStorage.setItem('mangas', JSON.stringify(novaListaMangas));
    setMangas(novaListaMangas);
    Toast.show({
      type: 'success',
      text1: 'Manga editado com sucesso!',
    });
    navigation.goBack();
  }

  return (
    
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Lista de mangas
      </Text>
      <FlatList
        style={styles.list}
        data={mangas}
        renderItem={({ item }) => (
          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium">Manga: {item?.nome}</Text>
                <Text variant="bodyLarge">Diretor: {item?.diretor}</Text>
                <Text variant="bodyLarge">Gênero: {item?.genero}</Text>
                <Text variant="bodyLarge">Comentário: {item?.comentario}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button 
                onPress={() =>
                  navigation.push('FormManga', {
                    acao: (mangaAntigo, mangaNovo) => editarManga(item, mangaAntigo, mangaNovo),
                  })
                  
                }>
                Editar
              </Button>
              <Button  onPress={() => excluirManga(item)}>Excluir</Button>
            </Card.Actions>
          </Card>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push('FormManga', { acao: adicionarManga })}
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
    backgroundColor: 'orange',
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
