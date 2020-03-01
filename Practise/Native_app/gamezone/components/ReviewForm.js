import React, { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { globalStyles } from "../styles/global";
import { Formik } from "formik";
import * as yup from 'yup';
import FlatButton from './Button';

const reviewSchema = yup.object({
  title: yup.string()
         .required()
         .min(4),
  body: yup.string()
        .required()
        .min(8),
  rating: yup.string()
          .required()
          .test('is-num-1-5','Rating must be a number from 1-5',(val)=>{
            return parseInt(val) < 6 && parseInt(val) > 0;
          })
})

function ReviewForm({addReview}) {
  return (
    <View style={globalStyles.container}>
      <Formik
        validationSchema={reviewSchema}
        initialValues={{ title: "", body: "", rating: "" }}
        onSubmit={(values) => {
            addReview(values);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Review Title"
              onChangeText={props.handleChange("title")}
              value={props.values.title}
              onBlur={props.handleBlur('title')}
              
            />
            <Text style={globalStyles.errorText}>{props.touched.title && props.errors.title}</Text>

            <TextInput
              multiline
              style={globalStyles.input}
              placeholder="Review"
              onChangeText={props.handleChange("body")}
              value={props.values.body}
              onBlur={props.handleBlur('body')}
            />
            <Text style={globalStyles.errorText}>{props.touched.body && props.errors.body}</Text>


            <TextInput
              style={globalStyles.input}
              placeholder="Rating (1-5)"
              onChangeText={props.handleChange("rating")}
              value={props.values.rating}
              keyboardType="numeric"
              onBlur={props.handleBlur('rating')}
            />
            <Text style={globalStyles.errorText}>{props.touched.rating && props.errors.rating}</Text>

            <FlatButton text="Submit" onPress={props.handleSubmit}/>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default ReviewForm;
