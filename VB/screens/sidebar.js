import React,{Component} from 'react';
import {StyleSheet,View,Text,ScrollView,ImageBackground,Image} from 'react-native';
import {DrawerNavigatorItems} from 'react-navigation-drawer'
import {connect} from 'react-redux'
import * as FileSystem from 'expo-file-system';

class Sidebar extends Component{

    componentDidMount(){
        this.getCacheprofile(this.props.email)
    }

render(){
    return(
        <ScrollView>
            <ImageBackground source={require('../assets/images/SidebarBackground.jpg')}
            style={{width:undefined,padding:16,paddingTop:48}}>
                <Image source={{uri:this.props.profileuri}} style={styles.face}/>
                <Text style={styles.name}>{this.props.fname} {this.props.lname}</Text>
                
            </ImageBackground>
            <View style={styles.container}>
                    <DrawerNavigatorItems {...this.props}/>
            </View>
        </ScrollView>
    )
}


getCacheprofile=async (data)=>{
 
    try{
         
    
          fetch('http://192.168.43.205:3330/user/getfilename',{
            method:'POST',
            body: JSON.stringify({ 
                email:data,
            }), 
            headers: { 
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json",} 
              }
            ).then((res)=>res.json()).then(
              (res)=>{
                
                console.log('filename'+res.filename)
                var cacheuri='no uri'
                var today = new Date();
                var date = today.getFullYear()+'z'+(today.getMonth()+1)+'z'+today.getDate();
                var time = today.getHours()+'z'+today.getMinutes()+'z'+today.getSeconds();
                
                FileSystem.downloadAsync(
                  `http://192.168.43.205:3330/profilepic/${res.filename}`,
                  FileSystem.cacheDirectory + `profile${date}${time}${res.filename}`
                )
                  .then(({ uri }) => {
                    
                    console.log('Finished downloading to ', uri);
                    this.props.updateProfileUri(uri)
                    this.setState({profileuri:uri})
                  })
                  .catch(error => {
                    console.error(error);
                  });
                  
            
            
            }
          ).catch((e)=>{
              console.log(e)
              
        })
      
              
         
           
    
    }catch(e){
        
        console.log("Error in saga functons  ..............."+e)
        return ''
    }
}


}

const mapDispatchToProps=(dispatch)=>{
    return{
        
        updateProfileUri:(data)=>dispatch({type:'ProfilcachUri',data:data}),
    }
}

const mapStateToProps=(state)=>{
    return{
        fname:state.rA.fname,
        lname:state.rA.lname,
        email:state.rA.email,
        profileuri:state.rA.profileuri
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    face:{
        width:80,
        height:80,
        borderRadius:40,
        borderWidth:3,
        borderColor:'white'
    },
    name:{
        color:'white',
        fontSize:20,
        fontWeight:'800',
        marginVertical:8
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Sidebar)