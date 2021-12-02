import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  TextInput,
  FlatList,
} from 'react-native';

import SingleTodo from './src/SingleTodo';

const App = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    if (!todo) return;

    setTodos([...todos, { id: Date.now(), text: todo }]);
    setTodo('');
  };

  const fetchTodos = async () => {
    const data = await AsyncStorage.getItem('todos');
    if (data) setTodos(JSON.parse(data));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}> To Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setTodo}
          value={todo}
          placeholder="Enter a Todo"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleAddTodo}>
          <Text style={styles.button}>Go</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, width: '100%', marginTop: 10 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          data={todos}
          renderItem={({ item }) => (
            <SingleTodo todo={item} todos={todos} setTodos={setTodos} />
          )}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7DAD9',
    flex: 1,
    alignItems: 'center',
  },

  heading: {
    marginVertical: 10,
    fontSize: 30,
    fontWeight: '700',
  },
  inputContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    shadowColor: 'black',
    elevation: 10,
    marginRight: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
});

export default App;
