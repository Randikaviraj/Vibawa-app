import React, { Component } from "react";
import {
  View,
  Dimensions,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import SmallBlock from "./smallblock";
import { Foundation } from "@expo/vector-icons";
import { colorCode } from "../assets/colorcode";
import { Searchbar ,Text} from "react-native-paper";
const { height, width } = Dimensions.get("window");

class Blogger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloadingdata: true,
    };
    this.loadedfaild = false;
  }

  state = {
    searchQuery: "",
    noResult:false,
  };


  componentDidMount() {
    this.getBlogData()
  
  }
  path = 'https://www.googleapis.com/blogger/v3/blogs/6072990315574228729/posts/?key=AIzaSyArAzxYYs9fmVWVTCdR3bD3l5-U0MYiljw'
  _onChangeSearch = query => {
    this.setState({ searchQuery: query })
    // this.getBlogData()
    if(query==''){
      this.getBlogData(true)
      console.log('close',query)
    }

  }

  //https://www.googleapis.com/blogger/v3/blogs/6072990315574228729/posts/search/?q=%E0%B6%AF%E0%B6%BB%E0%B7%94%E0%B7%80%E0%B6%B1%E0%B7%8A%E0%B6%A7&key=AIzaSyArAzxYYs9fmVWVTCdR3bD3l5-U0MYiljw
  //"https://www.googleapis.com/blogger/v3/blogs/6072990315574228729/posts/?key=AIzaSyArAzxYYs9fmVWVTCdR3bD3l5-U0MYiljw"
  //'https://www.googleapis.com/blogger/v3/blogs/6072990315574228729/posts/search/?q='+ this.state.searchQuery+'&key=AIzaSyArAzxYYs9fmVWVTCdR3bD3l5-U0MYiljw',
       
  getBlogData = async (forceUsed=false) => {
    this.loadedfaild = false;
    this.setState({ isloadingdata: true });




    if((this.state.searchQuery=='' || this.state.searchQuery==null)|| forceUsed==true){
      console.log(forceUsed)
      this.path = "https://www.googleapis.com/blogger/v3/blogs/6072990315574228729/posts/?key=AIzaSyArAzxYYs9fmVWVTCdR3bD3l5-U0MYiljw"
 
    }else{
      console.log(this.state.searchQuery)
      this.path = 'https://www.googleapis.com/blogger/v3/blogs/6072990315574228729/posts/search/?q='+ this.state.searchQuery+'&key=AIzaSyArAzxYYs9fmVWVTCdR3bD3l5-U0MYiljw'
    
    }

    try {
      fetch(
        this.path,
         {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          },
        }
      )
        .then((res) => res.json())
        .then((response) => {
          this.loadedfaild = false;
          this.props.saveToStore(response);
          this.setState({ isloadingdata: false });
          
        })
        .catch((err) => {
          console.log("Error in get blog data" + err);
          Alert.alert("Something Wrong", "Check your network connection", [
            { text: "OK" },
          ]);
          this.loadedfaild = true;
          this.setState({ isloadingdata: false });
        });
    } catch (e) {
      console.log("Error in get blog data" + e);
      Alert.alert("Something Wrong", "Check your network connection", [
        { text: "OK" },
      ]);
      this.loadedfaild = true;
      this.setState({ isloadingdata: false });
    }
  };
  

  NoResult(){
    if(this.props.datablog.items==[])
      this.setState({noResult:true})
      else{
        this.setState({noResult:false})
      }
    if(this.state.noResult){
      return (
        <Text>No Result</Text>
      )
    }else{
      return(null)
    }
  }

  render() {
    const { searchQuery } = this.state;
    if (this.loadedfaild) {
      return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
              flexDirection: "row",
              flex: 1,
            }}
            onPress={() => {
              this.loadedfaild = false;
              this.getBlogData();
              this.setState({ isloadingdata: true });
            }}
          >
            <Foundation name="refresh" size={50} />
          </TouchableOpacity>
        </View>
      );
    }

    if (this.state.isloadingdata) {
      //this.getBlogData();
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator style={{ alignSelf: "center", marginTop: 100 }} />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: colorCode(0),
              marginLeft: "auto",
              marginRight: "auto",
              width: "100%",
              paddingTop: 3,
            }}
          >
            <Searchbar
              placeholder="Search"
              onChangeText={this._onChangeSearch}
              value={searchQuery}
              onSubmitEditing={this.getBlogData}
              onIconPress={this.getBlogData}
              
            />
            {this.props.datablog.items!=null
            ?null
            : <Text style={{fontSize:30}}>No Result</Text>
            }
 
            <View style={{ width: width, marginTop: 5 }}>
              <FlatList
                data={this.props.datablog.items}
                renderItem={({ item }) => (
                  <SmallBlock title={item.title} content={item.content} />
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    datablog: state.rA.blogdata,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveToStore: (data) => dispatch({ type: "SaveBlogData", data: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blogger);
