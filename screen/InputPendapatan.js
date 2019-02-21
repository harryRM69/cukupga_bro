import React, { Component } from "react";
import { Container, Content } from "native-base";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal
} from "react-native";
import HeaderPendapatan from "../Components/HeaderComponent/index";
import { TextInputMask } from "react-native-masked-text";
import numeral from "numeral";
import { insertNewTodoList, updateTodoList } from "../databases/allSchemas";
import { withNavigation } from "react-navigation";
import fromRightLeft from "../App";

class InputPendapatan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      amount: "",
      selectBtnLabelTetap: "",
      selectBtnLabelLainnya: "",
      selectedBtnType: "reguler",
      amountFormated: "0",
      selectedBtn: "simpan",
      isAddNew: true,
      selectedMonth2: "0",

      amountDebit: "",
      selectBtnLabelTetapDebit: "",
      selectBtnLabelLainnyaDebit: "",
      selectedBtnTypeDebit: "",
      amountFormatedDebit: "",
      selectedBtnTypeDebit: "",
      isAddNew: true,
      selectedMonth2Debit: "0"
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const {
      selectedBtnType,
      selectBtnLabelTetap,
      selectBtnLabelLainnya,
      selectedMonth2,
      amount,
      selectedBtn,

      selectedBtnTypeDebit,
      selectBtnLabelTetapDebit,
      selectBtnLabelLainnyaDebit,
      selectedMonth2Debit,
      amountDebit,
      selectedBtnDebit
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
        {/* <View style={{ flex: 1, backgroundColor: "Yellow" }}> */}

        <HeaderPendapatan />

        <Content>
          <View
            style={{
              flexDirection: "row",
              marginTop: "3%",
              justifyContent: "space-evenly",
              alignSelf: "center",
              width: "76%",
              height: "100%"
            }}
          >
            <TouchableOpacity
              onPress={() => this.setState({ selectedBtnType: "reguler" })}
              value={this.state.selectedBtnType}
              style={{
                backgroundColor:
                  selectedBtnType === "reguler" ? "#f89b00" : "#FFFFFF",
                width: "45%",
                height: "65%",
                margin: "1%",
                borderRadius: 40,
                borderColor:
                  selectedBtnType === "lainnya" ? "#b6022e" : "#FFFFFF",
                borderWidth: selectedBtnType === "lainnya" ? 3 : 0
              }}
            >
              <Text
                style={{
                  color: selectedBtnType === "reguler" ? "white" : null,
                  fontSize: 18,
                  fontFamily: "sans-serif-medium",
                  textAlign: "center",
                  fontWeight: "500",
                  backgroundColor: "transparent",
                  height: "100%",
                  margin: "5%"
                }}
              >
                Tetap{" "}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({ selectedBtnType: "lainnya" })}
              value={this.state.selectedBtnType}
              style={{
                backgroundColor:
                  selectedBtnType === "lainnya" ? "#f89b00" : "#FFFFFF",
                width: "45%",
                height: "65%",
                margin: "1%",
                borderRadius: 40,
                borderColor:
                  selectedBtnType === "reguler" ? "#b6022e" : "#FFFFFF",
                borderWidth: selectedBtnType === "reguler" ? 3 : 0
              }}
            >
              <Text
                style={{
                  color: selectedBtnType === "lainnya" ? "white" : null,
                  fontSize: 18,
                  fontFamily: "sans-serif-medium",
                  textAlign: "center",
                  fontWeight: "500",
                  backgroundColor: "transparent",
                  height: "100%",
                  margin: "5%"
                }}
              >
                Lainnya
                {""}
              </Text>
            </TouchableOpacity>
          </View>
        </Content>
        {/* CheckBox input pendapatan */}
        <View
          style={{
            flex: 2.8,
            backgroundColor: "#FFFFFF"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              marginTop: "3%",
              marginLeft: "2%"
            }}
          >
            <Text
              style={{
                fontFamily: "Chalkboard-Bold",
                color: "#676767",
                fontWeight: "500",
                fontSize: 27
              }}
            >
              Pendapatan :
            </Text>
            <TouchableOpacity
              onPress={() => this.setState({ selectBtnLabelTetap: "Gaji" })}
              value={this.state.selectedBtnLabelTetap}
              style={{
                backgroundColor:
                  selectedBtnType === "reguler" &&
                  selectBtnLabelTetap === "Gaji"
                    ? "#1eb721"
                    : "transparent",
                width: 16,
                height: 16,
                marginTop: "3%",
                marginLeft: "5%",
                marginRight: "2%",
                borderRadius: 100,
                borderColor:
                  selectedBtnType === "reguler" &&
                  selectBtnLabelTetap === "Gaji"
                    ? "#FFFFFF"
                    : "#E8E8E8",
                borderWidth:
                  selectedBtnType === "reguler" &&
                  selectBtnLabelTetap === "Gaji"
                    ? 0
                    : 2
              }}
            />
            <Text
              style={{
                fontFamily: "Chalkboard-Bold",
                color: selectedBtnType === "reguler" ? "#676767" : "#E8E8E8",
                fontSize: 19,
                marginTop: "2%",
                marginRight: "7%"
              }}
            >
              Gaji
            </Text>

            <TouchableOpacity
              onPress={() => this.setState({ selectBtnLabelTetap: "Pensiun" })}
              value={this.state.selectedBtnLabelTetap}
              style={{
                backgroundColor:
                  selectedBtnType === "reguler" &&
                  selectBtnLabelTetap === "Pensiun"
                    ? "#1eb721"
                    : "transparent",
                borderColor:
                  selectedBtnType === "reguler" &&
                  selectBtnLabelTetap === "Pensiun"
                    ? "#FFFFFF"
                    : "#E8E8E8",
                borderWidth:
                  selectedBtnType === "reguler" &&
                  selectBtnLabelTetap === "Pensiun"
                    ? 0
                    : 2,
                width: 16,
                height: 16,
                marginTop: "3%",
                marginLeft: "5%",
                marginRight: "2%",
                borderRadius: 100
              }}
            />
            <Text
              style={{
                fontFamily: "Chalkboard-Bold",
                color: selectedBtnType === "reguler" ? "#676767" : "#E8E8E8",
                fontSize: 19,
                marginTop: "2%"
              }}
            >
              Pensiun
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              marginTop: "2%",
              marginLeft: "2%"
            }}
          >
            <TouchableOpacity
              onPress={() => this.setState({ selectBtnLabelLainnya: "Untung" })}
              value={this.state.selectedBtnLabelLainnya}
              style={{
                backgroundColor:
                  selectedBtnType === "lainnya" &&
                  selectBtnLabelLainnya === "Untung"
                    ? "#1eb721"
                    : "transparent",
                borderColor:
                  selectedBtnType === "lainnya" &&
                  selectBtnLabelLainnya === "Untung"
                    ? "#FFFFFF"
                    : "#E8E8E8",
                borderWidth:
                  selectedBtnType === "lainnya" &&
                  selectBtnLabelLainnya === "Untung"
                    ? 0
                    : 2,
                width: 16,
                height: 16,
                marginTop: "3%",
                marginLeft: "44.7%",
                marginRight: "2%",
                borderRadius: 100
              }}
            />
            <Text
              style={{
                fontFamily: "Chalkboard-Bold",
                color: selectedBtnType === "lainnya" ? "#676767" : "#E8E8E8",
                fontSize: 19,
                marginTop: "2%"
              }}
            >
              Keuntungan
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              marginTop: "1%",
              marginLeft: "2%"
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.setState({ selectBtnLabelLainnya: "Pinjaman" })
              }
              value={this.state.selectedBtnLabelLainnya}
              style={{
                backgroundColor:
                  selectedBtnType === "lainnya" &&
                  selectBtnLabelLainnya === "Pinjaman"
                    ? "#1eb721"
                    : "transparent",
                borderColor:
                  selectedBtnType === "lainnya" &&
                  selectBtnLabelLainnya === "Pinjaman"
                    ? "#FFFFFF"
                    : "#E8E8E8",
                borderWidth:
                  selectedBtnType === "lainnya" &&
                  selectBtnLabelLainnya === "Pinjaman"
                    ? 0
                    : 2,
                width: 16,
                height: 16,
                marginTop: "3%",
                marginLeft: "44.7%",
                marginRight: "2%",
                borderRadius: 100
              }}
            />
            <Text
              style={{
                fontFamily: "Chalkboard-Bold",
                color: selectedBtnType === "lainnya" ? "#676767" : "#E8E8E8",
                fontSize: 19,
                marginTop: "2%"
              }}
            >
              Pinjaman
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              marginTop: "1%",
              marginLeft: "2%"
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.setState({ selectBtnLabelLainnya: "Lainnya" })
              }
              value={this.state.selectedBtnLabelLainnya}
              style={{
                backgroundColor:
                  selectedBtnType === "lainnya" &&
                  selectBtnLabelLainnya === "Lainnya"
                    ? "#1eb721"
                    : "transparent",
                borderColor:
                  selectedBtnType === "Lainnya" &&
                  selectBtnLabelLainnya === "Lainnya"
                    ? "#FFFFFF"
                    : "#E8E8E8",
                borderWidth:
                  selectedBtnType === "Lainnya" &&
                  selectBtnLabelLainnya === "Lainnya"
                    ? 0
                    : 2,
                width: 16,
                height: 16,
                marginTop: "3%",
                marginLeft: "44.7%",
                marginRight: "2%",
                borderRadius: 100
              }}
            />
            <Text
              style={{
                fontFamily: "Chalkboard-Bold",
                color: selectedBtnType === "lainnya" ? "#676767" : "#E8E8E8",
                fontSize: 19,
                marginTop: "2%"
              }}
            >
              Lainnya
            </Text>
          </View>
        </View>

        <View style={{ flex: 2 }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: "Chalkboard-Bold",
                color: "#676767",
                fontWeight: "500",
                fontSize: 27,
                marginTop: "8%",
                marginLeft: "2%"
              }}
            >
              Jumlah :
            </Text>

            <TextInput
              style={{
                width: "60%",
                height: "70%",
                marginTop: "5%",
                marginLeft: "5%",
                fontFamily: "Chalkboard-Bold",
                color: "#676767",
                fontWeight: "500",
                fontSize: 27
              }}
              placeholder="idr"
              placeholderTextColor="#E8E8E8"
              underlineColorAndroid="#676767"
              keyboardType="numeric"
              onChangeText={txt => this.setState({ amount: txt })}
              value={this.state.amount}
            />
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: "Chalkboard-Bold",
                color: "#676767",
                fontWeight: "500",
                fontSize: 16,
                marginTop: "2.8%",
                marginLeft: "15%"
              }}
            >
              Masukan Pendapatan untuk bulan
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#b6022e",
                fontFamily: "Roboto",
                marginTop: "1.3%",
                marginLeft: "1%"
              }}
            >
              {Month2}
            </Text>
          </View>
        </View>

        <View style={{ flex: 2 }}>
          <View
            style={{
              flexDirection: "row",
              marginTop: "3%",
              justifyContent: "space-evenly",
              alignSelf: "center",
              width: "76%",
              height: "100%"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (
                  this.state.selectedBtnType === "" ||
                  (this.state.selectBtnLabelTetap === "" &&
                    this.state.selectBtnLabelLainnya === "") ||
                  this.state.amount === ""
                ) {
                  Alert.alert("Sorry", "Masih ada yang belum dicatat..");
                } else if (this.state.isAddNew == true) {
                  const newTodoList = {
                    id: Math.floor(Date.now() / 1000),
                    selectedBtnType: this.state.selectedBtnType,
                    selectBtnLabelTetap: this.state.selectBtnLabelTetap,
                    selectBtnLabelLainnya: this.state.selectBtnLabelLainnya,
                    selectedMonth2: date.getMonth() + 1,
                    amount: this.state.amount,
                    creationDate: new Date(),

                    selectedBtnTypeDebit: this.state.selectedBtnTypeDebit,
                    selectBtnLabelTetapDebit: this.state
                      .selectBtnLabelTetapDebit,
                    selectBtnLabelLainnyaDebit: this.state
                      .selectBtnLabelLainnyaDebit,
                    selectedMonth2Debit: date.getMonth() + 1,
                    amountDebit: this.state.amountDebit,
                    creationDateDebit: new Date()
                  };
                  console.log(newTodoList);
                  insertNewTodoList(newTodoList)
                    .then()
                    .catch(error => {
                      alert(`Insert new todoList error ${error}`);
                    });
                  this.props.navigation.navigate("HomePage", {
                    transition: "fromRightLeft"
                  });
                } else {
                  const todoList = {
                    id: this.state.id,
                    selectedBtnType: this.state.selectedBtnType,
                    selectBtnLabelTetap: this.state.selectBtnLabelTetap,
                    selectBtnLabelLainnya: this.state.selectBtnLabelLainnya,
                    selectedMonth2: this.state.selectedMonth2,
                    amount: this.state.amount,

                    selectedBtnTypeDebit: this.state.selectedBtnTypeDebit,
                    selectBtnLabelTetapDebit: this.state
                      .selectBtnLabelTetapDebit,
                    selectBtnLabelLainnyaDebit: this.state
                      .selectBtnLabelLainnyaDebit,
                    selectedMonth2Debit: this.state.selectedMonth2Debit,
                    amountDebit: this.state.amountDebit
                  };
                  console.log(todoList);
                  updateTodoList(todoList)
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
                backgroundColor:
                  selectedBtn === "simpan" ? "#1eb721" : "#FFFFFF",
                width: "50%",
                height: "30%",
                margin: "5%",
                borderRadius: 40,
                borderColor: selectedBtn === "cancel" ? "#E8E8E8" : "#FFFFFF",
                borderWidth: selectedBtnType === "cancel" ? 3 : 0
              }}
            >
              <Text
                style={{
                  color: selectedBtn === "simpan" ? "#FFFFFF" : "#E8E8E8",
                  fontSize: 18,
                  fontFamily: "sans-serif-medium",
                  textAlign: "center",
                  fontWeight: "500",
                  backgroundColor: "transparent",
                  height: "100%",
                  margin: "5%"
                }}
              >
                Simpan{" "}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => this.setState({ selectedBtn: "cancel" })}
              style={{
                backgroundColor:
                  selectedBtn === "cancel" ? "#1eb721" : "#FFFFFF",
                width: "50%",
                height: "30%",
                margin: "5%",
                borderRadius: 40,
                borderColor: selectedBtn === "simpan" ? "#E8E8E8" : "#FFFFFF",
                borderWidth: selectedBtn === "simpan" ? 3 : 0
              }}
            >
              <Text
                style={{
                  color: selectedBtn === "cancel" ? "#FFFFFF" : "#E8E8E8",
                  fontSize: 18,
                  fontFamily: "sans-serif-medium",
                  textAlign: "center",
                  fontWeight: "500",
                  backgroundColor: "transparent",
                  height: "100%",
                  margin: "5%"
                }}
              >
                Batal
                {""}
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Container>
    );
  }
}

export default InputPendapatan;
