import React from "react";
import { View, Text, Image } from "react-native";

class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve("result");
      }, 5000)
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate("HomePage");
    }
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <View style={{ flexDirection: "row" }}>
          <View style={{}}>
            <Text
              style={{
                fontSize: 60,
                fontWeight: "bold",
                fontFamily: "Roboto",
                color: "#FFFFFF"
              }}
            >
              Cukup
            </Text>
          </View>
          <View style={{}}>
            <Text
              style={{
                fontSize: 60,
                fontWeight: "bold",
                color: "#AD149E",
                fontFamily: "sans-serif-medium"
              }}
            >
              ?
            </Text>
          </View>
          <View style={{}}>
            <Text
              style={{
                fontSize: 60,
                fontWeight: "bold",
                color: "#AD149E",
                fontFamily: "sans-serif-medium"
              }}
            >
              Ga
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
        <View style= {{marginLeft:"1%"}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              fontFamily: "Roboto",
              color: "#FFFFFF"
            }}
          >
            Powered by :
          </Text>
          </View>
          <View style= {{marginLeft:"5%"}}>
          <Image
            style={{
              height: 50,
              width: 128
            }}
            source={require("../asset_app/LogoJenius2.png")}
            resizeMode="contain"
          />
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ED8932"
  },
  textStyles: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold"
  }
};

export default SplashScreen;
