import React from 'react'
import {View,StyleSheet,Text,Image} from 'react-native'

const MonsterCard = ({name,id})=>{

  return <View style={styles.monster_card}>
        <Image 
          style={{width: 200, height: 200}}
          source={{uri: `https://robohash.org/${id}.png?set=set2`}}
        />
        <Text style={styles.text}>{name}</Text>
  </View>
}

const styles = StyleSheet.create({
  monster_card: {
    width: '90%',
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(100, 100, 100, 0.6)',
    borderRadius: 5,
    margin: 10 ,
  },
  text: {
    fontSize: 25,
    paddingTop: 10,
    fontWeight: '600',
  }
})

export default MonsterCard;
