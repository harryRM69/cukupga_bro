/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Alert,
  TouchableOpacity
} from "react-native";
import * as firebase from "firebase";
// const firebase = require("firebase");

console.disableYellowBox =true

class Signup extends Component {
  constructor(props) {
    super(props);

    state = {
      email: "",
      password: "",
      c_password: "",
      authenticating: false
    };
  }

  onPressSignUp() {
    this.setState({
      authenticating: true
    });

    const { email, password, c_password } = this.state;

    if ((email == "") | (password == "") | (c_password == "")) {
      Alert.alert("Email & Password harus diisi, Gaes..");
    } else {
      if (password !== c_password) {
        Alert.alert("Warning!", "Konfirmasi Password tidak sama...!");
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user => {
            console.log(user);
            this.setState({
              authenticating: false,
              user,
              error: ""
            });
          })
          .catch(() =>
            this.setState({
              authenticating: false,
              user: null,
              error: "Authentication Failure"
            })
          );
        console.log(this.onPressSignUp);
        Alert.alert("Selamat bergabung!", "Lanjutkan ke Login..!");
        this.props.navigation.goBack();
      }
    }
  }

  componentWillUnmount (){
    this.onPressSignUp()
  }
  render() {
    return (
      <ImageBackground
        style={{ flex: 1, backgroundColor: "black" }}
        source={require("../asset_app/SignUp.png")}
      >
        <View style={styles.container2}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.welcome}>Cukup</Text>
            <Text style={styles.welcome2}>?</Text>
            <Text style={styles.welcome}>Ga</Text>
          </View>
        </View>

        <View style={styles.container}>
          <TextInput
            style={{ width: "80%", color: "#fefefe" }}
            placeholder="Email"
            placeholderTextColor="#fefefe"
            underlineColorAndroid="#fefefe"
            onChangeText={email => this.setState({ email })}
          />
          <TextInput
            style={{ width: "60%", color: "#fefefe" }}
            placeholder="Password"
            placeholderTextColor="#fefefe"
            underlineColorAndroid="#fefefe"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          />
          <TextInput
            style={{ width: "60%", color: "#fefefe" }}
            placeholder="Password Konfirmasi"
            placeholderTextColor="#fefefe"
            underlineColorAndroid="#fefefe"
            secureTextEntry={true}
            onChangeText={c_password => this.setState({ c_password })}
          />
          <Text style={{ fontSize: 13, color: "#f89b00" }}>
            Password terdiri dari 6 huruf/angka
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "transparent",
                marginTop: 15,
                borderRadius: 40,
                borderColor: "#fefefe",
                borderWidth: 2,
                width: "90%"
              }}
              onPress={() => this.onPressSignUp()}
            >
              <Text
                style={{
                  margin: 10,
                  fontSize: 22,
                  color: "#fefefe",
                  fontWeight: "bold",
                  alignSelf: "center"
                }}
              >
                DAFTAR
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: "10%",
    marginTop: "17%"
  },
  container2: {
    flex: 1,
    marginTop: "10%",
    height: "10%",
    alignSelf: "center"
  },
  welcome: {
    fontSize: 50,
    textAlign: "center",
    marginRight: 1,
    marginLeft: 1,
    color: "#f89b00",
    fontWeight: "500"
  },
  welcome2: {
    fontSize: 50,
    textAlign: "center",
    marginLeft: 1,
    marginRight: 1,
    marginBottom: 10,
    color: "#fefefe",
    fontWeight: "500"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});



export default Signup;
