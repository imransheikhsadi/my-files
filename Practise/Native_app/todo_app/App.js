import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem";

export default function App() {
  const [todos, setTodo] = useState([
    { text: "Go office at 9am", key: "1" },
    { text: "Meal at 2", key: "2" },
    { text: "Cricket Match at 8am", key: "3" },
    { text: "Dinner at 10pm", key: "4" },
    { text: "Go office at 9am", key: "13" },
    { text: "Meal at 2", key: "23" },
    { text: "Cricket Match at 8am", key: "33" },
    { text: "Dinner at 10pm", key: "43" }
  ]);

  const removeItem = itemToRemove => {
    const extractedTodos = todos.filter(item => item.key !== itemToRemove.key);

    setTodo(extractedTodos);
  };

  return (
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo addTodo={setTodo} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} removeItem={removeItem} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
  },
  list: {
    flex: 1
  }
});
