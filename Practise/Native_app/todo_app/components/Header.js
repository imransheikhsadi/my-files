import React from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';

function Header() {

    return(
        <View style={styles.header}>
            <View style={styles.mainHeadingContainer}>
                <Text style={styles.mainHeadingTaxt}>My Todo</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        // height: 40,
        width: '100%',
        backgroundColor: 'coral'
    },
    mainHeadingContainer: {
       

    },
    mainHeadingTaxt: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        padding: 15,
        textAlign: 'center',
        marginTop: StatusBar.currentHeight
    }
})

export default Header;