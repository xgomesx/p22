import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, FAB, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function listaSeries({ navigation }) {

  const [series, setSeries] = useState([]);
  
  useEffect(() => {
    loadSeries();
  }, []);
  
  async function loadSeries() {
    const response = await AsyncStorage.getItem('series');
    const seriesStorage = response ? JSON.parse(response) : [];
    setSeries(seriesStorage);
  }
  
  
  async function adicionarSerie(serie) {
    let novalistaSeries = series;
    novalistaSeries.push(serie);
    await AsyncStorage.setItem('series', JSON.stringify(novalistaSeries));
    setSeries(novalistaSeries);
  }
  
  async function editarSerie(serieAntigo, novosDados) {
  
    const novalistaSeries = series.map(serie => {
      if (serie === serieAntigo) {
        return novosDados;
      } else {
        return serie;
      }
    });
  
    await AsyncStorage.setItem('series', JSON.stringify(novalistaSeries));
    setSeries(novalistaSeries);
  }
  
  async function excluirAluno(serie) {
    const novalistaSeries = series.filter(a => a !== serie);
    await AsyncStorage.setItem('series', JSON.stringify(novalistaSeries));
    setSeries(novalistaSeries);
    Toast.show({
      type: 'success',
      text1: 'serie excluído com sucesso!',
    });
  }
  return (
    <View style={styles.container}>
      <Text variant='titleLarge' style={styles.title} >Lista</Text>
      <FlatList
        style={styles.list}
        data={series}
        renderItem={({ item }) => (
          <Card
            mode='outlined'
            style={styles.card}>
              

            <Card.Content
              style={styles.cardContent}>

              <View style={{ flex: 1 }}>
              <Text variant="titleMedium">Series: {item?.nome}</Text>
                <Text variant="bodyLarge">Diretor: {item?.diretor}</Text>
                <Text variant="bodyLarge">Gênero: {item?.genero}</Text>
                <Text variant="bodyLarge">Comentário: {item?.comentario}</Text>
              </View>
            </Card.Content>

            <Card.Actions>
              <Button  
                onPress={() => navigation.push('FormSeries', { acao: editarSerie, aluno: item })}
                style={{ backgroundColor: 'red', borderWidth: 1.5, borderColor: 'black', marginRight: 10 }}>
                <Text style={{ color: 'white' }}>Editar</Text>
              </Button>
              <Button 
                onPress={() => excluirAluno(item)}
                style={{ backgroundColor: 'red', borderWidth: 1.5, borderColor: 'black' }}>
                <Text style={{ color: 'white' }}>Excluir</Text>
              </Button>
            </Card.Actions>
          </Card>)}/>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push('FormSeries', { acao: adicionarSerie })}
      />
    </View>
  )
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
    margin: 10
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
    paddingBottom: 15
  }
})
