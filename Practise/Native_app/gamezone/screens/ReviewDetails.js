import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { globalStyles, images } from "../styles/global";
import Card from "../components/Card";

const ReviewDetail = ({ route: { params } }) => {
  const rating = params.rating;

  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>{params.title}</Text>
        <Text style={globalStyles.paragraph}>{params.body}</Text>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>Game Rating: </Text>
          <Image source={images.ratings[rating]} />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  }
})

export default ReviewDetail;
