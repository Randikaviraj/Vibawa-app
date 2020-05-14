import React,{Component} from 'react';
import  {View,Text,SafeAreaView,ScrollView,Dimensions,Alert,ActivityIndicator,TouchableOpacity,FlatList} from 'react-native';
import Block from './block'
import SmallBlock from './smallblock'
import {connect} from 'react-redux'
import {Foundation,FontAwesome5 } from '@expo/vector-icons';

class MagazineContent extends Component{

    constructor(props){
        super(props);
        this.state={
            isloadingdata:true
        }

        this.loadedfaild=false
     

    }

    

    getCatagoryData=async ()=>{
        this.loadedfaild=false
     
        try{
                 fetch('https://www.googleapis.com/blogger/v3/blogs/6378425303147338496/posts/?key=AIzaSyArAzxYYs9fmVWVTCdR3bD3l5-U0MYiljw',{
                    method:'GET',
                    headers: { 
                        "Content-type": "application/json; charset=UTF-8",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                        
                    
                    } 
                }
                  ).then((res)=>res.json()).then(
                    (response)=>{
                        this.loadedfaild=false
                        this.props.saveToMagazineCatagory(response)
                        this.setState({isloadingdata:false})
                        
                        
                    }
                ).catch((err)=>{
                    
                    console.log('Error in get magazine data'+err)
                    Alert.alert('Something Wrong','Check your network connection',[{text: 'OK',}])
                    this.loadedfaild=true
                    this.setState({isloadingdata:false})
     
                    }
                )
            
             
               
        
        }catch(e){
            console.log('Error in get magazine data'+e)
            Alert.alert('Something Wrong','Check your network connection',[{text: 'OK',}])
            this.loadedfaild=true
            this.setState({isloadingdata:false})
     
            }
    }

    getArticleData=async ()=>{
        this.loadedfaild=false
     
        try{
                 fetch('https://www.googleapis.com/blogger/v3/blogs/3474627695605531696/posts/?maxResults=499&key=AIzaSyArAzxYYs9fmVWVTCdR3bD3l5-U0MYiljw',{
                    method:'GET',
                    headers: { 
                        "Content-type": "application/json; charset=UTF-8",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                        
                    
                    } 
                }
                  ).then((res)=>res.json()).then(
                    (response)=>{
                        this.loadedfaild=false
                        this.props.saveToMagazineArticle(response)
                        this.setState({isloadingdata:false})
                        
                        
                    }
                ).catch((err)=>{
                    
                    console.log('Error in get magazine data'+err)
                    Alert.alert('Something Wrong','Check your network connection',[{text: 'OK',}])
                    this.loadedfaild=true
                    this.setState({isloadingdata:false})
     
                    }
                )
            
             
               
        
        }catch(e){
            console.log('Error in get magazine data'+e)
            Alert.alert('Something Wrong','Check your network connection',[{text: 'OK',}])
            this.loadedfaild=true
            this.setState({isloadingdata:false})
     
            }
    }
    

render(){

    if(this.loadedfaild){
            
        return(
            <View style={{flex:1,}}>
                <TouchableOpacity style={{alignContent:'center',alignItems:'center',alignSelf:'center',flexDirection:'row',flex:1}} onPress={()=>{
                    this.loadedfaild=false
                    this.setState({isloadingdata:true})
                    }}>
                    <Foundation name='refresh' size={50} />
                </TouchableOpacity>
                
            </View>
        )
    }

    if(this.state.isloadingdata){
        this.getCatagoryData()
        this.getArticleData()
        return(
            <View style={{flex:1,}}>
            
                <ActivityIndicator style={{alignSelf:'center',marginTop:100}}/>
                
            </View>
        )
    }
    else{
            // console.log(this.props.datamagazine.items)
            return(
                    
                    <SafeAreaView style={{flex:1}}>
                        <View style={{flex:1}}>
                            <TouchableOpacity style={{alignContent:'flex-start',alignItems:'center',                  flexDirection:'row',flex:1,padding:30,paddingLeft:10}} 
                            onPress={()=>{
                                this.props.navigation.navigate('MagazineHome',{title:'asd',tag:1})
                                }}>
                            <FontAwesome5 name='arrow-left' size={40} />
                          </TouchableOpacity>
                            <ScrollView>
                            <View>
                            <FlatList
                                            horizontal={true}
                                            data={this.props.datamagazine.items}
                                            renderItem={({item})=>(
                                                
                                                <Block width={Dimensions.get('window').width/1.8} height={Dimensions.get('window').height/4} title={item.title} content={item.content}
                                                onNav={this.navgateMagazine}
                                                />
                                            )}
                                            keyExtractor={(item)=>item.id}
                                        />
                                
                                    <FlatList
                                                nestedScrollEnabled={true}
                                                data={this.props.dataarticle.items}
                                                renderItem={({item})=>(
                                                    <SmallBlock title={item.title} 
                                                        content={item.content}/>
                                                )}
                                                keyExtractor={(item)=>item.id}
                                            />
                                </View>
                                
                            </ScrollView>
                        </View>
                        
                    </SafeAreaView>    
                
            )
            }
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        saveToMagazineCatagory:(data)=>dispatch({type:'ContentMagzineSave',data:data}),
        saveToMagazineArticle:(data)=>dispatch({type:'ArticleMagzineSave',data:data})

    }
}

const mapStateToProps=(state)=>{
    return{
        datamagazine:state.rA.magazineCatagory,
        dataarticle:state.rA.magazineArticles
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MagazineContent)


