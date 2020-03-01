import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        fontFamily: 'nunito-bold' ,
        flex: 1,
        padding: 20,
    },
    titleText: {
        fontFamily: 'nunito-bold',
        fontSize: 20,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 10
    },
    semiTitleText: {
        fontFamily: 'nunito-bold',
        fontSize: 18,
    },
    paragraph: {
        fontFamily: 'nunito-regular',
        fontSize: 14,
        paddingVertical: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        marginVertical: 5
    },
    errorText: {
        color: 'red',
        fontSize: 12
    }
})

export const images = {
    ratings: {
        '1': require('../assets/rating-1.png'),
        '2': require('../assets/rating-2.png'),
        '3': require('../assets/rating-3.png'),
        '4': require('../assets/rating-4.png'),
        '5': require('../assets/rating-5.png'),
    }
}