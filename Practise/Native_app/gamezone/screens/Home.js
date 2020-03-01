import React, { useState } from "react";
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { globalStyles } from "../styles/global";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Card from "../components/Card";
import { MaterialIcons } from "@expo/vector-icons";
import ReviewForm from "../components/ReviewForm";

const StateData = [
  {
    title: "Gotta Some Fresh Air",
    rating: 5,
    body: "lorem ipsum Dummy text",
    key: "1"
  },
  {
    title: "Save my day,But some bug",
    rating: 4,
    body: "lorem ipsum Dummy text",
    key: "2"
  },
  {
    title: "Not so great",
    rating: 3,
    body: "lorem ipsum Dummy text",
    key: "3"
  }
];

const Home = ({ navigation }) => {
  const [reviews, setReviews] = useState(StateData);
  const [modalOpen, setModalOpen] = useState(false);

  const addReview = review => {
    const key = Math.random().toString();
    review = { ...review, key };
    setReviews(currentState => [review, ...currentState]);
    setModalOpen(false);
  };

  return (
    <View style={globalStyles.container}>
      <Modal visible={modalOpen}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons
              name="close"
              size={24}
              onPress={() => setModalOpen(false)}
              style={{ ...styles.modalToggle, ...styles.modalClose }}
            />
            <View style={globalStyles.container}>
              <ReviewForm addReview={addReview} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <MaterialIcons
        name="add"
        size={24}
        onPress={() => setModalOpen(true)}
        style={styles.modalToggle}
      />
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Details", item)}
          >
            <Card>
              <Text style={globalStyles.semiTitleText}>{item.title}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "#fff"
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0
  },
  modalContent: {
    flex: 1,
  }
});

export default Home;
