import React, { Component } from "react";
import { Header, Left, Body, Title } from "native-base";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Button
} from "react-native";
import { withNavigation } from "react-navigation";
import * as Animatable from "react-native-animatable";
import fromRightLeft from "../../App"



class HeaderSetting extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <Image
          style={StyleSheet.absoluteFill}
          source={require("../../asset_app/ImagePendapatan.png")}
        />
        <Header
          style={{
            backgroundColor: "transparent",
            height: "100%",
            borderBottomColor: "#E3E3E3",
            borderBottomWidth: 4
          }}
        >
          <TouchableOpacity
            style={{ width: "13%",marginRight:"1%" }}
            onPress={() => {
              console.log(this.props)
              this.props.navigation.navigate("HomePage");
              
            }}
          >
            <Left style={{ marginTop: "28%" }}>
              
              <Image
                style={{
                  height: 58,
                  width: 60,   
                }}
                source={require("../../asset_app/balik.png")}
                resizeMode="contain"/>
            </Left>
          </TouchableOpacity>
          <Body style={{ marginLeft: "3%", marginTop:"1%" }}>
            <Title
              style={{
                fontSize: 24,
                fontWeight: "500",
                fontFamily: "roboto"
              }}
            >
             S E T T I N G
            </Title>
          </Body>
        </Header>
      </View>
    );
  }
}

export default withNavigation(HeaderSetting);
