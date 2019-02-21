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
import fromRightLeft from "../../App"

class HeaderPengeluaran extends Component {
  render() {
    return (
      <View style={{ flex: 1.3, backgroundColor: "black" }}>
        <Image
          style={StyleSheet.absoluteFill}
          source={require("../../asset_app/ImagePengeluaran.png")}
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
            style={{ width: "15%" }}
            onPress={() => {
              console.log(this.props);
              this.props.navigation.navigate("HomePage");
              // this.props.navigation.navigate("HomePage",{transition : 'fromRightLeft'});
            }}
          >
            <Left style={{ marginTop: "23%" }}>
              {/* <Icon
                name="arrow-back"
                style={{
                  color: "white",
                  fontSize: 30,
                  fontWeight: "50"
                }}
              /> */}
             <Image
                style={{
                  height: 58,
                  width: 60,
                  marginTop: "1.7%"
                }}
                source={require("../../asset_app/balik.png")}
                resizeMode="contain"/>
            </Left>
          </TouchableOpacity>
          <Body style={{ marginLeft: "3%" }}>
            <Title
              style={{
                fontSize: 24,
                fontWeight: "400",
                fontFamily: "roboto"
              }}
            >
              P e n g e l u a r a n
            </Title>
          </Body>
        </Header>
      </View>
    );
  }
}

export default withNavigation(HeaderPengeluaran);
