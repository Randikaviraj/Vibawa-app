import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Card, Title } from "react-native-paper";
import Details from "./details";
import { colorCodes } from "../assets/colorcode";

export default function SmallBlock(props) {
  const [modalVisible, setModalVisible] = useState(false);
  var uri = null;
  function takeURI() {
    var image = props.content;
    var result = image.match(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    );
    for (var i = 0; i < result.length; i++) {
      if (result[i] != undefined)
        if (result[i].search(/jpg/) != -1) {
          if (uri == null) uri = result[i];
          console.log(result[i]);
        }
    }
    if (uri == null || uri == "") {
      uri = "https://www.teliacompany.com/Assets/Images/not-available.png";
    }
  }

  takeURI();
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        marginHorizontal: 11,
        marginVertical: 10,
      }}
    >
      <Card
        style={{ flex: 1 }}
        style={{
          borderRadius: 10,
          paddingLeft: 2,
          paddingRight: 2,
          paddingTop: 2,
          paddingBottom: 2,
        }}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ borderRadius: 10, padding: 10 }}
        >
          <ImageBackground
            source={{ uri: uri }}
            style={styles.image}
          ></ImageBackground>
          <Title
            style={{
              fontSize: 15,
              fontStyle: "normal",
              fontWeight: "bold",
              padding: 10,
              alignContent: "center",
            }}
          >
            {props.title}
          </Title>
        </TouchableOpacity>
      </Card>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Details
          details={props.content}
          handle={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: 200,
    borderRadius: 10,
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold",
  },
});
