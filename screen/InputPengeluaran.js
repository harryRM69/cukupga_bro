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
  Alert
} from "react-native";
import HeaderPengeluaran from "../Components/HeaderComponent/indexpengeluaran";
// import { CheckBox } from "react-native-elements";
import { TextInputMask } from "react-native-masked-text";
import numeral from "numeral";
import { insertNewTodoList, updateTodoList } from "../databases/allSchemas";

class InputPengeluaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountDebit: "",
      selectBtnLabelTetapDebit: "",
      selectBtnLabelLainnyaDebit: "",
      selectedBtnTypeDebit: "reguler",
      amountFormatedDebit: "0",
      selectedBtnDebit: "simpan",
      isAddNew: true,
      selectedMonth2Debit: "0",

      amount: "",
      selectBtnLabelTetap: "",
      selectBtnLabelLainnya: "",
      selectedBtnType: "",
      amountFormated: "",
      selectedBtn: "",
      isAddNew: true,
      selectedMonth2: ""
    };
  }
  render() {
    const {
      selectedBtnTypeDebit,
      selectBtnLabelTetapDebit,
      selectBtnLabelLainnyaDebit,
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

        <HeaderPengeluaran />

        <Content>
          <View
            style={{
              flexDirection: "row",
              marginTop: "3%",
              justifyContent: "space-evenly",
              alignSelf: "center",
              width: "76%",
              height: "100%",
              backgroundColor: "#FFFFFF"
            }}
          >
            <TouchableOpacity
              onPress={() => this.setState({ selectedBtnTypeDebit: "reguler" })}
              value={this.state.selectedBtnTypeDebit}
              style={{
                backgroundColor:
                  selectedBtnTypeDebit === "reguler" ? "#f89b00" : "#FFFFFF",
                width: "45%",
                height: "65%",
                margin: "1%",
                borderRadius: 40,
                borderColor:
                  selectedBtnTypeDebit === "lainnya" ? "#b6022e" : "#FFFFFF",
                borderWidth: selectedBtnTypeDebit === "lainnya" ? 3 : 0
              }}
            >
              <Text
                style={{
                  color: selectedBtnTypeDebit === "reguler" ? "white" : null,
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
              onPress={() => this.setState({ selectedBtnTypeDebit: "lainnya" })}
              value={this.state.selectedBtnTypeDebit}
              style={{
                backgroundColor:
                  selectedBtnTypeDebit === "lainnya" ? "#f89b00" : "#FFFFFF",
                width: "45%",
                height: "65%",
                margin: "1%",
                borderRadius: 40,
                borderColor:
                  selectedBtnTypeDebit === "reguler" ? "#b6022e" : "#FFFFFF",
                borderWidth: selectedBtnTypeDebit === "reguler" ? 3 : 0
              }}
            >
              <Text
                style={{
                  color: selectedBtnTypeDebit === "lainnya" ? "white" : null,
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
        {/* CheckBox input pengeluaran */}
        <View
          style={{
            flex: 3.5,
            backgroundColor: "#FFFFFF",
           
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#FFFFFF",
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
              Pengeluaran :
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#FFFFFF",
              marginTop: "2%",
              marginLeft: "2%"
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.setState({ selectBtnLabelTetapDebit: "Makan & Minum" })
              }
              value={this.state.selectedBtnLabelTetapDebit}
              style={{
                backgroundColor:
                  selectedBtnTypeDebit === "reguler" &&
                  selectBtnLabelTetapDebit === "Makan & Minum"
                    ? "#1eb721"
                    : "transparent",
                borderColor:
                  selectedBtnTypeDebit === "reguler" &&
                  selectBtnLabelTetapDebit === "Makan & Minum"
                    ? "#FFFFFF"
                    : "#E8E8E8",
                borderWidth:
                  selectedBtnTypeDebit === "reguler" &&
                  selectBtnLabelTetapDebit === "Makan & Minum"
                    ? 0
                    : 2,
                width: 16,
                height: 16,
                marginTop: "3%",
                marginLeft: "2%",
                marginRight: "2%",
                borderRadius: 100
              }}
            />
            <Text
              style={{
                fontFamily: "Chalkboard-Bold",
                color:
                  selectedBtnTypeDebit === "reguler" ? "#676767" : "#E8E8E8",
                fontSize: 19,
                marginTop: "2%"
              }}
            >
              Makan & Minum
            </Text>

            <TouchableOpacity
              onPress={() =>
                this.setState({ selectBtnLabelTetapDebit: "Transport" })
              }
              value={this.state.selectedBtnLabelTetapDebit}
              style={{
                backgroundColor:
                  selectedBtnTypeDebit === "reguler" &&
                  selectBtnLabelTetapDebit === "Transport"
                    ? "#1eb721"
                    : "transparent",
                borderColor:
                  selectedBtnTypeDebit === "reguler" &&
                  selectBtnLabelTetapDebit === "Transport"
                    ? "#FFFFFF"
                    : "#E8E8E8",
                borderWidth:
                  selectedBtnTypeDebit === "reguler" &&
                  selectBtnLabelTetapDebit === "Transport"
                    ? 0
                    : 2,
                width: 16,
                height: 16,
                marginTop: "3%",
                marginLeft: "4%",
                marginRight: "2%",
                borderRadius: 100
              }}
            />
            <Text
              style={{
                fontFamily: "Chalkboard-Bold",
                color: selectedBtnTypeDebit === "reguler" ? "#676767" : "#E8E8E8",
                fontSize: 19,
                marginTop: "2%"
              }}
            >
              Transport
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#FFFFFF",
              marginTop: "1%",
              marginLeft: "2%"
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.setState({ selectBtnLabelTetapDebit: "Angsuran" })
              }
              value={this.state.selectedBtnLabelTetapDebit}
              style={{
                backgroundColor:
                  selectedBtnTypeDebit === "reguler" &&
                  selectBtnLabelTetapDebit === "Angsuran"
                    ? "#1eb721"
                    : "transparent",
                borderColor:
                  selectedBtnTypeDebit === "reguler" &&
                  selectBtnLabelTetapDebit === "Angsuran"
                    ? "#FFFFFF"
                    : "#E8E8E8",
                borderWidth:
                  selectedBtnTypeDebit === "reguler" &&
                  selectBtnLabelTetapDebit === "Angsuran"
                    ? 0
                    : 2,
                width: 16,
                height: 16,
                marginTop: "3%",
                marginLeft: "2%",
                marginRight: "2%",
                borderRadius: 100
              }}
            />
            <Text
              style={{
                fontFamily: "Chalkboard-Bold",
                color:
                  selectedBtnTypeDebit === "reguler" ? "#676767" : "#E8E8E8",
                fontSize: 19,
                marginTop: "2%"
              }}
            >
              Angsuran
            </Text>

            <TouchableOpacity
              onPress={() =>
                this.setState({ selectBtnLabelTetapDebit: "Belanja RT" })
              }
              value={this.state.selectedBtnLabelTetapDebit}
              style={{
                backgroundColor:
                  selectedBtnTypeDebit === "reguler" &&
                  selectBtnLabelTetapDebit === "Belanja RT"
                    ? "#1eb721"
                    : "transparent",
                borderColor:
                  selectedBtnTypeDebit === "reguler" &&
                  selectBtnLabelTetapDebit === "Belanja RT"
                    ? "#FFFFFF"
                    : "#E8E8E8",
                borderWidth:
                  selectedBtnTypeDebit === "reguler" &&
                  selectBtnLabelTetapDebit === "Belanja RT"
                    ? 0
                    : 2,
                width: 16,
                height: 16,
                marginTop: "3%",
                marginLeft: "18%",
                marginRight: "2%",
                borderRadius: 100
              }}
            />
            <Text
              style={{
                fontFamily: "Chalkboard-Bold",
                color:
                  selectedBtnTypeDebit === "reguler" ? "#676767" : "#E8E8E8",
                fontSize: 19,
                marginTop: "2%"
              }}
            >
              Belanja RT
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#FFFFFF",
              marginTop: "1%",
              marginLeft: "2%"
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.setState({ selectBtnLabelTetapDebit: "Listrik, Air & Phone" })
              }
              value={this.state.selectedBtnLabelTetapDebit}
              style={{
                backgroundColor:
                  selectedBtnTypeDebit === "reguler" &&
                  selectBtnLabelTetapDebit === "Listrik, Air & Phone"
                    ? "#1eb721"
                    : "transparent",
                borderColor:
                  selectedBtnTypeDebit === "reguler" &&
                  selectBtnLabelTetapDebit === "Listrik, Air & Phone"
                    ? "#FFFFFF"
                    : "#E8E8E8",
                borderWidth:
                  selectedBtnTypeDebit === "reguler" &&
                  selectBtnLabelTetapDebit === "Listrik, Air & Phone"
                    ? 0
                    : 2,
                width: 16,
                height: 16,
                marginTop: "3%",
                marginLeft: "2%",
                marginRight: "2%",
                borderRadius: 100
              }}
            />
            <Text
              style={{
                fontFamily: "Chalkboard-Bold",
                color:
                  selectedBtnTypeDebit === "reguler" ? "#676767" : "#E8E8E8",
                fontSize: 19,
                marginTop: "2%"
              }}
            >
              Listrik, Air, Phone & Internet
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#FFFFFF",
              marginTop: "1%",
              marginLeft: "2%"
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.setState({ selectBtnLabelLainnyaDebit: "Hobbies" })
              }
              value={this.state.selectedBtnLabelLainnyaDebit}
              style={{
                backgroundColor:
                  selectedBtnTypeDebit === "lainnya" &&
                  selectBtnLabelLainnyaDebit === "Hobbies"
                    ? "#1eb721"
                    : "transparent",
                borderColor:
                  selectedBtnTypeDebit === "lainnya" &&
                  selectBtnLabelLainnyaDebit === "Hobbies"
                    ? "#FFFFFF"
                    : "#E8E8E8",
                borderWidth:
                  selectedBtnTypeDebit === "lainnya" &&
                  selectBtnLabelLainnyaDebit === "Hobbies"
                    ? 0
                    : 2,
                width: 16,
                height: 16,
                marginTop: "3%",
                marginLeft: "2%",
                marginRight: "2%",
                borderRadius: 100
              }}
            />
            <Text
              style={{
                fontFamily: "Chalkboard-Bold",
                color:
                  selectedBtnTypeDebit === "lainnya" ? "#676767" : "#E8E8E8",
                fontSize: 19,
                marginTop: "2%"
              }}
            >
              Hobbies
            </Text>

            <TouchableOpacity
              onPress={() =>
                this.setState({ selectBtnLabelLainnyaDebit: "Baju Tas" })
              }
              value={this.state.selectedBtnLabelLainnyaDebit}
              style={{
                backgroundColor:
                  selectedBtnTypeDebit === "lainnya" &&
                  selectBtnLabelLainnyaDebit === "Baju Tas"
                    ? "#1eb721"
                    : "transparent",
                borderColor:
                  selectedBtnTypeDebit === "lainnya" &&
                  selectBtnLabelLainnyaDebit === "Baju Tas"
                    ? "#FFFFFF"
                    : "#E8E8E8",
                borderWidth:
                  selectedBtnTypeDebit === "lainnya" &&
                  selectBtnLabelLainnyaDebit === "Baju Tas"
                    ? 0
                    : 2,
                width: 16,
                height: 16,
                marginTop: "3%",
                marginLeft: "21%",
                marginRight: "2%",
                borderRadius: 100
              }}
            />
            <Text
              style={{
                fontFamily: "Chalkboard-Bold",
                color:
                  selectedBtnTypeDebit === "lainnya" ? "#676767" : "#E8E8E8",
                fontSize: 19,
                marginTop: "2%"
              }}
            >
              Baju, Tas & Sepatu
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#FFFFFF",
              marginTop: "1%",
              marginLeft: "2%"
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.setState({ selectBtnLabelLainnyaDebit: "Lainnya" })
              }
              value={this.state.selectedBtnLabelLainnyaDebit}
              style={{
                backgroundColor:
                  selectedBtnTypeDebit === "lainnya" &&
                  selectBtnLabelLainnyaDebit === "Lainnya"
                    ? "#1eb721"
                    : "transparent",
                borderColor:
                  selectedBtnTypeDebit === "lainnya" &&
                  selectBtnLabelLainnyaDebit === "Lainnya"
                    ? "#FFFFFF"
                    : "#E8E8E8",
                borderWidth:
                  selectedBtnTypeDebit === "lainnya" &&
                  selectBtnLabelLainnyaDebit === "Lainnya"
                    ? 0
                    : 2,
                width: 16,
                height: 16,
                marginTop: "3%",
                marginLeft: "46.7%",
                marginRight: "2%",
                borderRadius: 100
              }}
            />
            <Text
              style={{
                fontFamily: "Chalkboard-Bold",
                color:
                  selectedBtnTypeDebit === "lainnya" ? "#676767" : "#E8E8E8",
                fontSize: 19,
                marginTop: "2%"
              }}
            >
              Lainnya
            </Text>
          </View>
        </View>

        <View style={{ flex: 1.5, backgroundColor: "#FFFFFF" }}>
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
                width: "62%",
                height: "70%",
                marginTop: "5%",
                marginLeft: "6%",
                fontFamily: "Chalkboard-Bold",
                color: "#676767",
                fontWeight: "500",
                fontSize: 27
              }}
              placeholder="idr"
              placeholderTextColor="#E8E8E8"
              underlineColorAndroid="#676767"
              keyboardType="numeric"
              onChangeText={amountDebit => this.setState({ amountDebit })}
              value={this.state.amountDebit}
            />
          </View>
        </View>

        <View style={{ flex: 0.75, backgroundColor: "#FFFFFF" }}>
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

        <View style={{ flex: 1.5, backgroundColor: "#FFFFFF" }}>
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
                  this.state.selectedBtnTypeDebit === "" ||
                  (this.state.selectBtnLabelTetapDebit === "" &&
                    this.state.selectBtnLabelLainnyaDebit === "") ||
                  this.state.amountDebit === ""
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
                  selectedBtnDebit === "simpan" ? "#1eb721" : "#FFFFFF",
                width: "50%",
                height: "40%",
                margin: "5%",
                borderRadius: 40,
                borderColor:
                  selectedBtnDebit === "cancel" ? "#E8E8E8" : "#FFFFFF",
                borderWidth: selectedBtnTypeDebit === "cancel" ? 3 : 0
              }}
            >
              <Text
                style={{
                  color: selectedBtnDebit === "simpan" ? "#FFFFFF" : "#E8E8E8",
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
              onPress={() => this.setState({ selectedBtnDebit: "cancel" })}
              style={{
                backgroundColor:
                  selectedBtnDebit === "cancel" ? "#1eb721" : "#FFFFFF",
                width: "50%",
                height: "40%",
                margin: "5%",
                borderRadius: 40,
                borderColor:
                  selectedBtnDebit === "simpan" ? "#E8E8E8" : "#FFFFFF",
                borderWidth: selectedBtnDebit === "simpan" ? 3 : 0
              }}
            >
              <Text
                style={{
                  color: selectedBtnDebit === "cancel" ? "#FFFFFF" : "#E8E8E8",
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

export default InputPengeluaran;
