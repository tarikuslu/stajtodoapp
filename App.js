import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  console.log(input);
  function addTodo() {
    setTodos((prev) => [
      ...prev,
      { todoText: input, isCompleted: false, id: Date.now() },
    ]);
    setInput("");
  }

  function deleteTodo(id) {
    setTodos((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  }

  function toggleComplete(id) {
    setTodos((prev) => {
      prev.find((item) => item.id == id).isCompleted = !prev.find(
        (item) => item.id == id
      ).isCompleted;
      return [...prev];
    });
  }

  function TodoItem(props) {
    return (
      <View style={styles.todoContainer}>
        <TextInput
          multiline={true}
          style={[
            styles.todoText,
            { textDecorationLine: props.isCompleted ? "line-through" : "none" },
          ]}
          value={props.todoText}
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => deleteTodo(props.id)}
            style={styles.deleteBtn}
          >
            <Text style={styles.deleteText}>SİL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleComplete(props.id)}
            style={styles.completedBtn}
          >
            <Text style={styles.completedText}>
              {props.isCompleted
                ? "TAMAMLANMADI OLARAK İŞARETLE"
                : "TAMAMLANDI OLARAK İŞARETLE"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>TO-DO APP</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.todoInput}
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <TouchableOpacity onPress={addTodo} style={styles.addBtn}>
          <Text style={styles.addText}>EKLE</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            id={item.id}
            isCompleted={item.isCompleted}
            todoText={item.todoText}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 22,
  },

  screenTitle: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 15,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    gap: 6,
  },

  todoInput: {
    height: 40,
    borderWidth: 1,
    flex: 1,
    borderRadius: 5,
  },

  todoText: {
    fontSize: 24,
  },

  addBtn: {
    backgroundColor: "#97f02b",
    padding: 10,
    borderRadius: 3,
  },

  addText: {
    fontSize: 20,
  },

  todoContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
  },

  deleteBtn: {
    backgroundColor: "red",
    width: Dimensions.get("window").width / 7,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    marginTop: 10,
  },

  deleteText: {
    textAlign: "center",
  },

  completedBtn: {
    backgroundColor: "green",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    marginTop: 10,
  },

  completedText: {
    color: "white",
  },

  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
