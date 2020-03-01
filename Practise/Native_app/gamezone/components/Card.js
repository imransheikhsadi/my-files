import React from 'react';
import { StyleSheet, View } from 'react-native';

function Card(props) {
    return (
        <View style={styles.card} >
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: {height: 1,width: 1},
        shadowColor: '#333',
        shadowOpacity: .3,
        marginHorizontal: 4,
        marginVertical: 6,
        shadowRadius: 2,
        // padding: 10
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10
    }
});

export default Card;
