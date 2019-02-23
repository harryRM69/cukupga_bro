import React, { Component } from "react";
import { Container, Content } from "native-base";
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
import HeaderSetting from "../Components/HeaderComponent/indexSetting";
import {
  insertNewTodoList_Setting,
  updateTodoList_Setting
} from "../databases/allSchemasSetting";

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectBtnSettingSeorang: "Karyawan",
      selectBtnSettingAman: "1Minggu",
      amountSetting: "",
      isAddNew: true
    };
  }

  render() {
    const {
      selectBtnSettingSeorang,
      selectBtnSettingAman,
      amountSetting
    } = this.state;

    // Month;
    var date = new Date();
    var Month = date.getMonth() + 1;

    if (Month == 1) {
      Month2 = "Jan";
    } else if (Month == 2) {
      Month2 = "Feb";
    } else if (Month == 3) {
      Month2 = "Mar";
    } else if (Month == 4) {
      Month2 = "Apr";
    } else if (Month == 5) {
      Month2 = "May";
    } else if (Month == 6) {
      Month2 = "Jun";
    } else if (Month == 7) {
      Month2 = "Jul";
    } else if (Month == 8) {
      Month2 = "Aug";
    } else if (Month == 9) {
      Month2 = "Sep";
    } else if (Month == 10) {
      Month2 = "Okt";
    } else if (Month == 11) {
      Month2 = "Nov";
    } else {
      Month2 = "Des";
    }

    return (
      <Container>
        <HeaderSetting />
        <View style={{ flex: 5, backgroundColor: "transparent" }}>
          <ImageBackground
            source={require("../asset_app/settingimage.png")}
            style={{
              flex: 1,
              width: "98%",
              height: "100%"
            }}
          >
            <View style={{ margin: "3%", flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "roboto",
                  fontSize: 19,
                  marginTop: "2%",
                  marginRight: "3%",
                  color: "#000000"
                }}
              >
                Anda Seorang :
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  marginLeft: "1%"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%"
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ selectBtnSettingSeorang: "Karyawan" })
                    }
                    value={this.state.selectBtnSettingSeorang}
                    style={{
                      width: 16,
                      height: 16,
                      marginTop: "3%",
                      marginLeft: "1%",
                      marginRight: "2%",
                      borderRadius: 100,
                      backgroundColor:
                        selectBtnSettingSeorang === "Karyawan"
                          ? "#1eb721"
                          : "transparent",
                      borderColor:
                        selectBtnSettingSeorang === "Karyawan"
                          ? "#FFFFFF"
                          : "#E8E8E8",
                      borderWidth:
                        selectBtnSettingSeorang === "Karyawan" ? 0 : 2
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: "roboto",
                      fontSize: 19,
                      marginTop: "2%",
                      marginRight: "1%",
                      color: "#000000"
                    }}
                  >
                    Karyawan
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ selectBtnSettingSeorang: "Pelajar" })
                    }
                    value={this.state.selectBtnSettingSeorang}
                    style={{
                      width: 16,
                      height: 16,
                      marginTop: "3%",
                      marginLeft: "1%",
                      marginRight: "2%",
                      borderRadius: 100,
                      backgroundColor:
                        selectBtnSettingSeorang === "Pelajar"
                          ? "#1eb721"
                          : "transparent",
                      borderColor:
                        selectBtnSettingSeorang === "Pelajar"
                          ? "#FFFFFF"
                          : "#E8E8E8",
                      borderWidth: selectBtnSettingSeorang === "Pelajar" ? 0 : 2
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: "roboto",
                      fontSize: 19,
                      marginTop: "2%",
                      marginRight: "1%",
                      color: "#000000"
                    }}
                  >
                    Pelajar
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                margin: "3%"
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontFamily: "roboto",
                    fontSize: 19,
                    marginTop: "2%",
                    marginRight: "1%",
                    color: "#000000"
                  }}
                >
                  Jumlah
                </Text>
                <TextInput
                  style={{
                    width: "60%",
                    height: "70%",
                    marginTop: "2%",
                    marginLeft: "18%",
                    fontFamily: "Chalkboard-Bold",
                    color: "#676767",
                    fontWeight: "400",
                    fontSize: 19
                  }}
                  placeholder="Angsuran / Kewajiban"
                  placeholderTextColor="#E8E8E8"
                  underlineColorAndroid="#676767"
                  keyboardType="numeric"
                  onChangeText={txt => this.setState({ amountSetting: txt })}
                  value={this.state.amountSetting}
                />
              </View>
            </View>
            <Text
              style={{
                fontFamily: "roboto",
                fontSize: 19,
                marginTop: "2%",
                marginLeft: "3%",
                color: "#000000"
              }}
            >
              Aman sampai ?
            </Text>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                marginLeft: "3%"
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  this.setState({ selectBtnSettingAman: "1Minggu" })
                }
                value={this.state.selectBtnSettingAman}
                style={{
                  width: 16,
                  height: 16,
                  marginTop: "3%",
                  marginLeft: "1%",
                  marginRight: "2%",
                  borderRadius: 100,
                  backgroundColor:
                    selectBtnSettingAman === "1Minggu"
                      ? "#1eb721"
                      : "transparent",
                  borderColor:
                    selectBtnSettingAman === "1Minggu" ? "#FFFFFF" : "#E8E8E8",
                  borderWidth: selectBtnSettingAman === "1Minggu" ? 0 : 2
                }}
              />
              <Text
                style={{
                  fontFamily: "roboto",
                  fontSize: 19,
                  marginTop: "2%",
                  marginRight: "1%",
                  color: "#000000"
                }}
              >
                1 Minggu
              </Text>

              <TouchableOpacity
                onPress={() =>
                  this.setState({ selectBtnSettingAman: "2Minggu" })
                }
                value={this.state.selectBtnSettingAman}
                style={{
                  width: 16,
                  height: 16,
                  marginTop: "3%",
                  marginLeft: "1%",
                  marginRight: "2%",
                  borderRadius: 100,
                  backgroundColor:
                    selectBtnSettingAman === "2Minggu"
                      ? "#1eb721"
                      : "transparent",
                  borderColor:
                    selectBtnSettingAman === "2Minggu" ? "#FFFFFF" : "#E8E8E8",
                  borderWidth: selectBtnSettingAman === "2Minggu" ? 0 : 2
                }}
              />
              <Text
                style={{
                  fontFamily: "roboto",
                  fontSize: 19,
                  marginTop: "2%",
                  marginRight: "1%",
                  color: "#000000"
                }}
              >
                2 Minggu
              </Text>
              <TouchableOpacity
                onPress={() => this.setState({ selectBtnSettingAman: "1Bln" })}
                value={this.state.selectBtnSettingAman}
                style={{
                  width: 16,
                  height: 16,
                  marginTop: "3%",
                  marginLeft: "1%",
                  marginRight: "2%",
                  borderRadius: 100,
                  backgroundColor:
                    selectBtnSettingAman === "1Bln" ? "#1eb721" : "transparent",
                  borderColor:
                    selectBtnSettingAman === "1Bln" ? "#FFFFFF" : "#E8E8E8",
                  borderWidth: selectBtnSettingAman === "1Bln" ? 0 : 2
                }}
              />
              <Text
                style={{
                  fontFamily: "roboto",
                  fontSize: 19,
                  marginTop: "2%",
                  marginRight: "1%",
                  color: "#000000"
                }}
              >
                1 Bulan
              </Text>
            </View>
            <View
              style={{
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (
                    this.state.selectBtnSettingSeorang === "" ||
                    this.state.sselectBtnSettingAman === "" ||
                    this.state.amountSetting === ""
                  ) {
                    Alert.alert("Sorry", "Masih ada yang belum dicatat..");
                  } else if (this.state.isAddNew == true) {
                    const newTodoList_Setting = {
                      id: Math.floor(Date.now() / 1000),
                      selectBtnSettingSeorang: this.state.selectBtnSettingSeorang,
                      selectBtnSettingAman: this.state.selectBtnSettingAman,
                      amountSetting: this.state.amountSetting
                    };
                    console.log(newTodoList_Setting);
                    insertNewTodoList_Setting(newTodoList_Setting)
                      .then()
                      .catch(error => {
                        alert(`Insert new todoList error ${error}`);
                      });
                    this.props.navigation.navigate("HomePage", {
                      transition: "fromRightLeft"
                    });
                  } else {
                    const todoList_Setting = {
                      id: this.state.id,
                      selectBtnSettingSeorang: this.state
                        .selectBtnSettingSeorang,
                      selectBtnSettingAman: this.state.selectBtnSettingAman,
                      amountSetting: this.state.amountSetting
                    };
                    console.log(todoList_Setting);
                    updateTodoList_Setting(todoList_Setting)
                      .then()
                      .catch(error => {
                        alert(`Update todoList error ${error}`);
                      });

                    this.props.navigation.navigate("HomePage", {
                      transition: "fromRightLeft"
                    });
                  }
                }}
                style={{
                  backgroundColor: "#1eb721",
                  marginTop: "5%",
                  width: "23%",
                  height: "25%",
                  alignItems: "center",
                  borderRadius: 40
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 18,
                    fontFamily: "sans-serif-medium",
                    textAlign: "center",
                    fontWeight: "500",
                    backgroundColor: "transparent",
                    height: "100%",
                    margin: "5%",
                    textAlign: "center"
                  }}
                >
                  Simpan{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        <Content />
      </Container>
    );
  }
}

export default Setting;
