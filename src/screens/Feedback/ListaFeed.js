import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, FAB, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ListaFeed({route}) {
  const navigation = useNavigation();
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    async function carregarFeeds() {
      try {
        const feedsSalvos = await AsyncStorage.getItem('feeds');
        if (feedsSalvos) {
          setFeeds(JSON.parse(feedsSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar feedbacks:', error);
      }
    }

    carregarFeeds();
  }, []);

  async function adicionarFeed(feedNovo) {
    const novaListaFeeds = [...feeds, feedNovo];

    await AsyncStorage.setItem('feeds', JSON.stringify(novaListaFeeds));
    setFeeds(novaListaFeeds);
    Toast.show({
      type: 'success',
      text1: 'Feedback adicionado com sucesso!',
    });
  }

  async function excluirFeed(feed) {
    const novaListaFeeds = feeds.filter((feedItem) => feedItem !== feed);

    await AsyncStorage.setItem('feeds', JSON.stringify(novaListaFeeds));
    setFeeds(novaListaFeeds);
    Toast.show({
      type: 'success',
      text1: 'Feedback excluído com sucesso!',
    });
  }

  async function editarFeed(feedAntigo, feedNovo) {
    const novaListaFeeds = feeds.map((feed) =>
      feed === feedAntigo ? { ...feed, ...feedNovo } : feed
    );

    await AsyncStorage.setItem('feeds', JSON.stringify(novaListaFeeds));
    setFeeds(novaListaFeeds);
    Toast.show({
      type: 'success',
      text1: 'Feedbacks editado com sucesso!',
    });
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Lista de feedbacks
      </Text>
      <FlatList
        style={styles.list}
        data={feeds}
        renderItem={({ item }) => (
          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium">Nome: {item?.nome}</Text>
                <Text variant="bodyLarge">Telefone: {item?.telefone}</Text>
                <Text variant="bodyLarge">CPF: {item?.cpf}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() =>
                  navigation.push('FormFeed', {
                    acao: (feedAntigo, feedNovo) => editarFeed(item, feedAntigo, feedNovo),
                  })
                }>
                Editar
              </Button>
              <Button onPress={() => excluirFeed(item)}>Excluir</Button>
            </Card.Actions>
          </Card>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push('FormFeed', { acao: adicionarFeed})}
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
