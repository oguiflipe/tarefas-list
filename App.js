import React, {useState} from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  TextInput,
  FlatList
} from 'react-native';


//import dos icones nativos do react
import { FontAwesome } from '@expo/vector-icons'


//importando o componente 
import Tarefa from './src/Tarefa';




export default function App() {

  //armazenando os dados do input
  const [tarefa, setTarefa] = useState('')
  //armazenando a lista
  const [list, setList] = useState([]);



  //função responsável por guardar os dados digitados pelo usuário no input
  function handleAdd(){

    //returnando o estado para o antigo se o usuário não adicionar nada a lista
    if(tarefa === ''){
      return
    }

    //guardando as informações dos dados da list
    const dados = {
      key: Date.now(),
      item: tarefa
    }

    //mostrando as arrays existentes e adicionando as novas tarefas
    setList( oldArray => [dados, ...oldArray])

    //zerando os dados do input
    setTarefa('')
  }


  //função para deletar os dados da lista
  function handleDelete(item){
    let filtroItem = list.filter((tarefa) => {
      return (tarefa.item !== item)
    })

    //retornando para lista sem a tarefa excluida
    setList(filtroItem)
  }


  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Tarefas</Text>

        <View style={styles.containerInput}>
          <TextInput 
            placeholder='Digite a tarefa: '
            style={styles.input}
            value={tarefa}
            onChangeText={(text) => setTarefa(text)}
          />
          <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
            <FontAwesome name='plus' size={20} color={"#fff"}/>
          </TouchableOpacity>
        </View>

        <FlatList 
        data={list}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => <Tarefa data={item} deleteItem={() => handleDelete(item.item)}/>}
        style={styles.list}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22272e',
    paddingTop: 45
  },
  textTitle:{
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '5%',
    marginStart: '5%',
    marginBottom: 12
  },
  containerInput:{
    flexDirection: 'row',
    width: '100%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  input:{
    width: '75%',
    backgroundColor: '#fbfbfb',
    height: 44,
    borderRadius: 4,
    paddingHorizontal: 8
  },
  buttonAdd:{
    width: '15%',
    height: 44,
    backgroundColor: '#73f7ff',
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  list:{
    flex: 1,
    backgroundColor: '#f3f3f3',
    paddingStart: '4%',
    paddingEnd: '4%'
  }
});
