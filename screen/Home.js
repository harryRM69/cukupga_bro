import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  SectionList
} from "react-native";
import { database } from "../node_modules/firebase";
import numeral from "numeral";
import pendapatan, { pengeluaran } from "../src/dana_keluar";
import { withNavigation } from "react-navigation";
import fromBottomUp from "../App";
import IndexProps from "../Components/HeaderComponent/indexProps";
import realm from "../databases/allSchemas";
import { queryAllTodoLists } from "../databases/allSchemas";
import Swipeout from "react-native-swipeout";

console.disableYellowBox = true;
class Home extends Component {
  constructor(props) {
    super(props);
    var date = new Date();
    var Month = date.getMonth() + 1;
    var day = date.getDate();

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
      Month2 = "Dec";
    }
    this.state = {
      todoLists: [],
      selectedDay: day,
      selectedMonth: Month,
      selectedMonth2: Month2,
      selectedMonthDebit: Month,
      selectedMonth2Debit: Month2,
      pendapatan,
      pengeluaran,
      modalVisible: false,
      loading: false
    };
    this.reloadData();
    realm.addListener("change", () => {
      this.reloadData();
    });
  }
  reloadData = () => {
    queryAllTodoLists()
      .then(todoLists => {
        this.setState({ todoLists });
      })

      .catch(error => {
        this.setState({ loading: true });
        this.setState({ todoLists: [] });
      });

    console.log(`reloadData`);
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    //Pendapatan
    const dataPendapatanReguler = this.state.todoLists.filter(
      item =>
        item.selectedBtnType === "reguler" &&
        item.selectedMonth2 === this.state.selectedMonth
    );
    let total_pendapatan_reguler = 0;
    dataPendapatanReguler.map(item => {
      const nominalPendapatanReguler = parseInt(item.amount);
      total_pendapatan_reguler += nominalPendapatanReguler;
    });

    const dataPendapatanLainnya = this.state.todoLists.filter(
      item =>
        item.selectedBtnType === "lainnya" &&
        item.selectedMonth2 === this.state.selectedMonth
    );
    let total_pendapatan_lainnya = 0;
    dataPendapatanLainnya.map(item => {
      const nominalPendapatanLainnya = parseInt(item.amount);
      total_pendapatan_lainnya += nominalPendapatanLainnya;
    });

    total_pendapatan = total_pendapatan_reguler + total_pendapatan_lainnya;

    //Pengeluaran
    const dataPengeluaranReguler = this.state.todoLists.filter(
      item =>
        item.selectedBtnTypeDebit === "reguler" &&
        item.selectedMonth2Debit === this.state.selectedMonthDebit
    );
    let total_pengeluaran_reguler = 0;
    dataPengeluaranReguler.map(item => {
      const nominalPengeluaranReguler = parseInt(item.amountDebit);
      total_pengeluaran_reguler += nominalPengeluaranReguler;
    });

    const dataPengeluaranLainnya = this.state.todoLists.filter(
      item =>
        item.selectedBtnTypeDebit === "lainnya" &&
        item.selectedMonth2Debit === this.state.selectedMonthDebit
    );
    let total_pengeluaran_lainnya = 0;
    dataPengeluaranLainnya.map(item => {
      const nominalPengeluaranLainnya = parseInt(item.amountDebit);
      total_pengeluaran_lainnya += nominalPengeluaranLainnya;
    });

    total_pengeluaran = total_pengeluaran_reguler + total_pengeluaran_lainnya;

    //Total Dana
    total_dana = total_pendapatan - total_pengeluaran;

    //  Pengeluaran hari ini

    // Pengeluaran Reguler
    const dataPengeluaranRegulerToday = this.state.todoLists.filter(
      item =>
        item.selectedBtnTypeDebit === "reguler" &&
        item.selectedMonth2Debit === this.state.selectedMonthDebit &&
        item.creationDateDebit.getDate() === this.state.selectedDay
    );

    let total_pengeluaran_regulerToday = 0;
    dataPengeluaranRegulerToday.map(item => {
      const nominalPengeluaranRegulerToday = parseInt(item.amountDebit);
      total_pengeluaran_regulerToday += nominalPengeluaranRegulerToday;
    });

    // Pengeluaran Lainnya

    const dataPengeluaranLainnyaToday = this.state.todoLists.filter(
      item =>
        item.selectedBtnTypeDebit === "lainnya" &&
        item.selectedMonth2Debit === this.state.selectedMonthDebit &&
        item.creationDateDebit.getDate() === this.state.selectedDay
    );
    let total_pengeluaran_lainnyaToday = 0;
    dataPengeluaranLainnyaToday.map(item => {
      const nominalPengeluaranLainnyaToday = parseInt(item.amountDebit);
      total_pengeluaran_lainnyaToday += nominalPengeluaranLainnyaToday;
    });

    const total_pengeluaranToday =
      total_pengeluaran_regulerToday + total_pengeluaran_lainnyaToday;

    return (
      // Pendapatan

      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View style={styles.container1}>
          <View
            style={{
              marginLeft: "2%",
              flexDirection: "row"
            }}
          >
            <View style={{ marginTop: "2%" }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  fontFamily: "Roboto",
                  color: "#FFFFFF"
                }}
              >
                Cukup
              </Text>
            </View>
            <View style={{ marginTop: "0.5%" }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "#f89b00",
                  fontFamily: "sans-serif-medium"
                }}
              >
                ?
              </Text>
            </View>
            <View style={{ marginTop: "0.5%" }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  fontFamily: "sans-serif-medium"
                }}
              >
                Ga
              </Text>
            </View>
            <View
              style={{
                marginBottom: "1%",
                marginLeft: "2%"
              }}
            >
              <Image
                style={{
                  height: 50,
                  width: 128
                }}
                source={require("../asset_app/LogoJenius2.png")}
                resizeMode="contain"
              />
            </View>

            <View style={{ marginTop: "2%", marginLeft: "21%" }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#FFFFFF",
                  fontFamily: "Roboto"
                }}
              >
                {Month2}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.container2}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "2%"
            }}
          >
            <TouchableOpacity
              style={{}}
              onPress={() => {
                // this.setState ({loading:true})
                this.props.navigation.navigate("ListPendapatanPage");
              }}
            >
              <Image
                style={{
                  height: 64,
                  width: 64,
                  marginTop: "1%",
                  justifyContent: "center"
                }}
                source={require("../asset_app/Dana.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{}}
              onPress={() => {
                this.props.navigation.navigate("ListPengeluaranPage");
              }}
            >
              <Image
                style={{
                  height: 64,
                  width: 64,
                  marginTop: "1%",
                  justifyContent: "center"
                }}
                source={require("../asset_app/Belanja.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{}}
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <Image
                style={{
                  height: 64,
                  width: 64,
                  marginTop: "1%",
                  justifyContent: "center"
                }}
                source={require("../asset_app/myBro.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Modal MyBro */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {}}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-around",
                  backgroundColor: "#00000070"
                }}
              >
                <View
                  style={{
                    backgroundColor: "#F2F2F2",
                    height: "90%",
                    width: "90%",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  >
                    <Image
                      style={{
                        height: 28,
                        width: 28,
                        marginTop: "1%",
                        marginRight: "2%"
                      }}
                      source={require("../asset_app/Close.png")}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>

                  <Text
                    style={{
                      fontFamily: "roboto",
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#3B3A3D",
                      marginTop: "1%",
                      textAlign: "center",
                      backgroundColor: "transparent"
                    }}
                  >
                    MyBro says :
                  </Text>

                  <ImageBackground
                    source={require("../asset_app/mybroModal2.png")}
                    style={{
                      flex: 1,
                      marginTop: "1%",
                      backgroundColor: "#38F9FF",
                      width: "90%",
                      height: "100%"
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: "transparent"
                      }}
                    >
                      <ImageBackground
                        source={require("../asset_app/mybroSays.png")}
                        style={{
                          marginTop: "3%",
                          backgroundColor: "transparent",
                          resizeMode: "contain",
                          width: "100%",
                          height: "67.5%"
                        }}
                      >
                        <Text
                          style={{
                            marginTop: "15%",
                            fontFamily: "roboto",
                            color: "#000000",
                            fontWeight: "500",
                            fontSize: 15,
                            textAlign: "center"
                          }}
                        >
                          Maksimal belanja hari ini :
                        </Text>

                        <Swipeout
                          right={[
                            {
                              component: (
                                <View
                                  style={{
                                    flex: 1,
                                    backgroundColor: "#000000",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderTopLeftRadius: 8,
                                    borderBottomLeftRadius: 8
                                  }}
                                >
                                  <Image
                                    style={{ height: "40%", width: "40%" }}
                                    source={require("../asset_app/makan.png")}
                                  />
                                  <Text
                                    style={{
                                      color: "#FFFFFF",
                                      fontWeight: "600",
                                      fontSize: 16
                                    }}
                                  >
                                    60,000
                                  </Text>
                                </View>
                              )
                            },
                            {
                              component: (
                                <View
                                  style={{
                                    flex: 1,
                                    backgroundColor: "#000000",
                                    alignItems: "center",
                                    justifyContent: "center"
                                  }}
                                >
                                  <Image
                                    style={{ height: "40%", width: "40%" }}
                                    source={require("../asset_app/transport.png")}
                                  />
                                  <Text
                                    style={{
                                      color: "#FFFFFF",
                                      fontWeight: "600",
                                      fontSize: 16
                                    }}
                                  >
                                    40,000
                                  </Text>
                                </View>
                              )
                            },

                            {
                              component: (
                                <View
                                  style={{
                                    flex: 1,
                                    backgroundColor: "#000000",
                                    alignItems: "center",
                                    justifyContent: "center"
                                  }}
                                >
                                  <Image
                                    style={{ height: "40%", width: "40%" }}
                                    source={require("../asset_app/cadangan.png")}
                                  />
                                  <Text
                                    style={{
                                      color: "#FFFFFF",
                                      fontWeight: "600",
                                      fontSize: 16
                                    }}
                                  >
                                    20,000
                                  </Text>
                                </View>
                              )
                            }
                          ]}
                          style={{ backgroundColor: "transparent" }}
                          autoClose={true}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "center",
                              backgroundColor: "transparent"
                            }}
                          >
                            <Text
                              style={{
                                backgroundColor: "transparent",
                                marginTop: "1%",
                                fontFamily: "roboto",
                                color: "#000000",
                                fontWeight: "600",
                                fontSize: 45,
                                textAlign: "center"
                              }}
                            >
                              120,000
                            </Text>
                            <Text
                              style={{
                                backgroundColor: "transparent",
                                marginLeft: "1%",
                                marginTop: "7%",
                                fontFamily: "roboto",
                                color: "#BF0D49",
                                fontWeight: "600",
                                fontSize: 22,
                                textAlign: "center"
                              }}
                            >
                              / {numeral(total_pengeluaranToday).format("0,0")}
                            </Text>
                          </View>
                        </Swipeout>

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center"
                          }}
                        >
                          <Image
                            style={{
                              height: "80%",
                              width: "12%",
                              marginTop: "2%"
                            }}
                            source={require("../asset_app/swipeme.png")}
                          />
                          <Image
                            style={{
                              height: "80%",
                              width: "12%",
                              marginTop: "2%",
                              marginLeft: "-8%"
                            }}
                            source={require("../asset_app/swipeme.png")}
                          />

                          <Text
                            style={{
                              marginTop: "1%",
                              fontFamily: "roboto",
                              color: "#CCCCCC",
                              fontWeight: "500",
                              fontSize: 25,
                              textAlign: "center"
                            }}
                          >
                            Swipe Me
                          </Text>
                        </View>
                      </ImageBackground>
                    </View>
                  </ImageBackground>
                </View>
              </View>
            </Modal>

            <TouchableOpacity
              style={{}}
              onPress={() => {
                this.props.navigation.navigate("SettingPage");
              }}
            >
              <Image
                style={{
                  height: 76,
                  width: 76,
                  marginTop: "1%",
                  justifyContent: "center"
                }}
                source={require("../asset_app/Datasetting.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginTop: "1%",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View style={{ marginLeft: "4.5%" }}>
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                {" "}
                Dana{" "}
              </Text>
            </View>

            <View style={{ marginLeft: "1%" }}>
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                {" "}
                Belanja{" "}
              </Text>
            </View>

            <View style={{ marginLeft: "0.555%" }}>
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                {" "}
                myBro{" "}
              </Text>
            </View>

            <View style={{ marginRight: "4%" }}>
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                {" "}
                Setting{" "}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.container3}>
          <View style={{ marginRight: "6%", width: "10%" }}>
            <Image
              style={{
                height: 52,
                width: 50,
                marginTop: "1%"
              }}
              source={require("../asset_app/Business-Man-256-3.png")}
              resizeMode="contain"
            />
          </View>

          <View style={{ width: "78%" }}>
            <Text
              style={{ fontSize: 18, color: "#000000", fontFamily: "Roboto" }}
            >
              Total Pendapatan :
            </Text>
            <Text
              style={{
                fontSize: 30,
                color: "#676767",
                fontWeight: "bold",
                fontFamily: "Roboto"
              }}
            >
              {numeral(total_pendapatan).format("0,0")}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "3%",
                borderTopColor: "#C2C2C2",
                borderTopWidth: 1
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#676767",
                  fontFamily: "Roboto",
                  marginTop: "2%"
                }}
              >
                Tetap : {numeral(total_pendapatan_reguler).format("0,0")}{" "}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "#676767",
                  fontFamily: "Roboto",
                  marginTop: "2%"
                }}
              >
                Lainnya : {numeral(total_pendapatan_lainnya).format("0,0")}
              </Text>
            </View>
          </View>
        </View>
        {/* pengeluaran */}
        <View style={styles.container4}>
          <View style={{ marginRight: "6.5%", width: "10%" }}>
            <Image
              style={{
                height: 60,
                width: 58,
                marginTop: "1%"
              }}
              source={require("../asset_app/ATM-256-2.png")}
              resizeMode="contain"
            />
          </View>

          <View style={{ width: "78%" }}>
            <Text
              style={{ fontSize: 18, color: "#000000", fontFamily: "Roboto" }}
            >
              Total Pengeluaran :
            </Text>
            <Text
              style={{
                fontSize: 30,
                color: "#676767",
                fontWeight: "bold",
                fontFamily: "Roboto"
              }}
            >
              {numeral(total_pengeluaran).format("0,0")}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "3%",
                borderTopColor: "#C2C2C2",
                borderTopWidth: 1
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#676767",
                  fontFamily: "Roboto",
                  marginTop: "2%"
                }}
              >
                Tetap : {numeral(total_pengeluaran_reguler).format("0,0")}{" "}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "#676767",
                  fontFamily: "Roboto",
                  marginTop: "2%"
                }}
              >
                Lainnya : {numeral(total_pengeluaran_lainnya).format("0,0")}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.container5}>
          <View style={{ marginRight: "6%", width: "10%" }}>
            <Image
              style={{
                height: 48,
                width: 46,
                marginTop: "1%"
              }}
              source={require("../asset_app/wallet.png")}
              resizeMode="contain"
            />
          </View>
          <View style={{ width: "78%" }}>
            <Text
              style={{ fontSize: 18, color: "#000000", fontFamily: "Roboto" }}
            >
              Dana anda saat ini :
            </Text>
            <Text
              style={{
                fontSize: 40,
                color: "#028A34",
                fontWeight: "bold",
                fontFamily: "Roboto",
                marginLeft: "7%"
              }}
            >
              {numeral(total_dana).format("0,0")}
            </Text>
          </View>
        </View>
        <View style={styles.container6}>
          <TouchableOpacity
            style={{
              backgroundColor: "#D6082A",
              borderRadius: 40,
              width: "48%",
              height: "50%",
              marginTop: "8%"
            }}
            onPress={() => {
              this.props.navigation.navigate("InputPendapatanPage");
              // this.props.navigation.navigate("InputPendapatanPage", {
              //   transition: "fromBottomUp"
              // });
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                justifyContent: "center"
              }}
            >
              <Image
                style={{
                  height: 42,
                  width: 40,
                  marginTop: "2%"
                }}
                source={require("../asset_app/bag.png")}
                resizeMode="contain"
              />
              <Text
                style={{
                  marginRight: "5%",
                  marginTop: "3%",
                  alignSelf: "center",
                  fontSize: 13,
                  color: "white",
                  fontWeight: "bold"
                }}
              >
                PENDAPATAN
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "transparent",
              borderRadius: 40,
              width: "48%",
              height: "50%",
              marginTop: "8%",
              marginLeft: "7%",
              borderColor: "#676767",
              borderWidth: 3
            }}
            onPress={() => {
              this.props.navigation.navigate("InputPengeluaranPage");
              // this.props.navigation.navigate("InputPengeluaranPage", {
              //   transition: "fromBottomUp"
              // });
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginLeft: "1%",
                justifyContent: "center"
              }}
            >
              <Image
                style={{
                  height: 42,
                  width: 40,
                  marginTop: "1%"
                }}
                source={require("../asset_app/cart2.png")}
                resizeMode="contain"
              />
              <Text
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  fontSize: 13,
                  color: "#676767",
                  fontWeight: "bold",
                  marginRight: "5%",
                  fontWeight: "bold"
                }}
              >
                PENGELUARAN
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    flex: 1.2,
    marginTop: "2%",
    marginLeft: "2%",
    marginRight: "2%",
    backgroundColor: "#b6022e",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  container2: {
    flex: 2.5,
    marginLeft: "2%",
    marginRight: "2%",
    backgroundColor: "#C70B38",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },

  container3: {
    flex: 3.5,
    marginTop: "7%",
    justifyContent: "center",
    flexDirection: "row"
  },

  container4: {
    flex: 3.5,
    marginTop: "3%",
    justifyContent: "center",
    flexDirection: "row"
  },
  container5: {
    flex: 2,
    marginTop: "3%",
    justifyContent: "center",
    flexDirection: "row"
  },
  container6: {
    flex: 3,
    marginTop: "1%",
    justifyContent: "center",
    width: "88%",
    alignSelf: "center",
    flexDirection: "row"
  }
});

export default withNavigation(Home);
