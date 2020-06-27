import React from 'react';
import  {View,Image,ScrollView,StyleSheet} from 'react-native';


export default function About(){
    return(
        <View style={{flex:1}}>
           
                <View style={{...StyleSheet.absoluteFill,}} >
                    <Image
                        source={require('../assets/images/about.jpg')}
                            style={{height:null,width:null,flex:1}}/>
                </View>
           
        </View>
    )
}