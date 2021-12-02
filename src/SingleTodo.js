import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const SingleTodo = ({ todo, setTodos, todos }) => {
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  useEffect(() => {
    AsyncStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleEdit = () => {
    if (!edit) setEdit(!edit);
    else {
      setEdit(!edit);
      setTodos(
        todos.map((t) =>
          t.id === todo.id
            ? {
                id: t.id,
                text: editText,
              }
            : t
        )
      );
      AsyncStorage.setItem('todos', JSON.stringify(todos));
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <View style={styles.todo}>
      {!edit ? (
        <Text style={styles.todoText}>{todo.text}</Text>
      ) : (
        <TextInput
          style={styles.todoInput}
          value={editText}
          onChangeText={(text) => setEditText(text)}
        />
      )}

      <TouchableOpacity>
        <Feather
          style={styles.todoAction}
          name="edit"
          size={24}
          color="black"
          onPress={handleEdit}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather
          style={styles.todoAction}
          name="trash"
          size={24}
          color="black"
          onPress={() => handleDelete(todo.id)}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  todoText: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  todoAction: {
    marginLeft: 15,
  },
  todo: {
    flexDirection: 'row',
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: 'black',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    marginTop: 5,
    borderRadius: 50,
  },
  todoInput: {
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
  },
});

export default SingleTodo;
