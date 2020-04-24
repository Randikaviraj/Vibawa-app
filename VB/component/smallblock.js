import React,{useState} from 'react';
import  {View,TouchableOpacity,Modal} from 'react-native';
import {  Card, Title,} from 'react-native-paper';
import Details from './details'



export default function SmallBlock(props){
    const [modalVisible, setModalVisible] = useState(false);
    var uri = null;
    function takeURI(){
        console.log(props.title);
        var image = props.content;
        var result = image.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/);
        for( var i =0;i<result.length;i++){
            if(result[i]!=undefined)
            if(result[i].search(/jpg/)!=-1){
                if(uri==null)
                uri=result[i]
                console.log(result[i])
            }
        }

    }

    takeURI();
    return(
        <View style={{flex:1,paddingHorizontal:10,marginHorizontal:11,marginVertical:10,}}>
            <Card style={{flex:1}}>
                <TouchableOpacity onPress={()=>setModalVisible(true)}>
                    <Card.Cover source={{ uri: uri }} />
                </TouchableOpacity>
                <Card.Content>
                    <Title style={{fontSize:15,fontWeight:'500'}}>{props.title}</Title>
                </Card.Content>
            </Card>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(false)
                }}
            >
                <Details details={props.content} handle={()=>setModalVisible(false)}/>
            </Modal>
        </View>
    )
}