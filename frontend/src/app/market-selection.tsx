import React from 'react';

import {
View,
Text,
StyleSheet
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';

export default function MarketSelection(){

const { city, category }

= useLocalSearchParams();

return(

<View style={styles.container}>

<Text style={styles.title}>

{city}

</Text>

<Text style={styles.title}>

{category}

</Text>

</View>

);

}

const styles = StyleSheet.create({

container:{

flex:1,

justifyContent:'center',

alignItems:'center',

},

title:{

fontSize:30,

fontWeight:'700',

},

});