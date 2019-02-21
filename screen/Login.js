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
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import * as firebase from "firebase";
// const firebase = require("firebase");

console.disableYellowBox =true

class Login extends Component {
  constructor(props) {
    super(props);

    state = {
      email: "",
      password: "",
      authenticating: false
    };
    this.firebaseSetup();
  }

  firebaseSetup() {
    const config = {
      apiKey: "AIzaSyDOyCaa5-lVQQFAWOKbwiE2_PrEp0XXV0E",
      authDomain: "testfirebase-d21c9.firebaseapp.com",
      databaseURL: "https://testfirebase-d21c9.firebaseio.com",
      projectId: "testfirebase-d21c9",
      storageBucket: "testfirebase-d21c9.appspot.com",
      messagingSenderId: "458694658782"
    };
    firebase.initializeApp(config);
  }

  onPressSignIn() {
    this.setState({
      authenticating: true
    });

    const { email, password } = this.state;

  if ((email == "") | (password == "")) {
    Alert.alert("Oops!", "Email/Password ngga boleh kosong!");
  } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user);
          console.log(user.user.uid);
          this.setState({
            authenticating: false,
            user,
            error: ""
          });

          if (user.user.uid && user.user.uid !== "") {
            this.props.navigation.navigate("HomePage");
          }
        })
        .catch(() => {
          console.log("Login error!");
          Alert.alert("Email/Password salah","atau silahkan mendaftar !")
        });
    }
  }

  render() {
    return (
      
      <ImageBackground
        style={{ flex: 1, backgroundColor: "#191919" }}
        source={require("../asset_app/Login.png")}
      >
        <View style={styles.container2}>
          <Text style={styles.welcome}>Login Page</Text>
        </View>

        <View style={styles.container}>
          <TextInput
            style={{ width: "90%", color: "#fefefe" }}
            placeholder="Email"
            placeholderTextColor="#fefefe"
            underlineColorAndroid="#fefefe"
            onChangeText={email => this.setState({ email })}
          />
          <TextInput
            style={{ width: "90%", color: "#fefefe" }}
            placeholder="Password"
            placeholderTextColor="#fefefe"
            underlineColorAndroid="#fefefe"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          />
          <View style={{ flex: 1, marginTop: 12, width: "90%" }}>
            <TouchableOpacity
              style={{ backgroundColor: "#D6082A", borderRadius: 40 }}
              onPress={() => this.onPressSignIn()}
            >
              <Text
                style={{
                  margin: 10,
                  justifyContent: "center",
                  alignSelf: "center",
                  fontSize: 20,
                  color: "white",
                  fontWeight: "bold"
                }}
              >
                LOGIN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "transparent",
                marginTop: 12,
                borderRadius: 40
              }}
              onPress={() => {
                console.log(this.props);
                this.props.navigation.navigate("SignupPage");
              }}
            >
              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <Text
                  style={{
                    margin: 10,
                    fontSize: 17,
                    color: "#fefefe"
                  }}
                >
                  Belum Punya Akun ?
                </Text>

                <Text
                  style={{
                    margin: 5,
                    fontSize: 22,
                    color: "#fefefe",
                    fontWeight: "bold"
                  }}
                >
                  Daftar Disini
                </Text>
              </View>
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
    alignItems: "center",
    marginTop: "20%"
  },
  container2: {
    flex: 1,
    marginTop: "5%",
    height: "30%"
  },
  welcome: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    color: "orange",
    fontWeight: "500"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default Login;
