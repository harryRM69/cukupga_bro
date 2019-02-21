import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Modal,
  Image,
  Alert
} from "react-native";
import numeral from "numeral";
import { withNavigation } from "react-navigation";
import HeaderPendapatan from "../Components/HeaderComponent/index";
import { Container, Content } from "native-base";
import * as Animatable from "react-native-animatable";
import realm from "../databases/allSchemas";
import Swipeout from "react-native-swipeout";
import {
  updateTodoList,
  deleteTodoList,
  queryAllTodoLists,
  deleteAllTodoLists
} from "../databases/allSchemas";
import InputPendapatan from "./InputPendapatan";
// import Loader from "../Components/HeaderComponent/indexProps";

export default class ListPendapatan extends Component {
  constructor(props) {
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
      Month2 = "Dec";
    }
    super(props);

    this.state = {
      todoLists: [],
      Month: Month,
      selectedMonth: Month,
      selectedMonth2: Month2,
      modalVisible: false,
      loading: true,
      loadingDelete: false,
      loadingDeleteID: false
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

  //Modal Month
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  setModalDeleteVisible(visible) {
    this.setState({ loadingDelete: visible });
  }

  setModalDeleteIDVisible(visible) {
    this.setState({ loadingDeleteID: visible });
  }

  setSelectedMonth() {
    this.setState({ selectedMonth2: this.state.selectedMonth2 });
  }

  // closeActivityIndicator = () =>
  //   setTimeout(
  //     () =>
  //       this.setState({
  //         loading: false
  //       }),
  //     400
  //   );

  // componentDidMount = () => this.closeActivityIndicator();

  // List Pendapatan
  renderBodyReguler(item_pendapatan) {
    const items = item_pendapatan.item.selectedBtnType === "reguler";
    const date = item_pendapatan.item.creationDate.getDate();
    const year = item_pendapatan.item.creationDate.getYear() - 100;
    const id = item_pendapatan.item.id;
    const amount_formatted = numeral(item_pendapatan.item.amount).format("0,0");

    showDeleteConfirmationReguler = () => {
      Alert.alert(
        "Hapus data ini,",
        "yakin ?",
        [
          {
            text: "No",
            onPress: () => {}, //Do nothing
            style: "cancel"
          },
          {
            text: "Yes",
            onPress: () => {
              deleteTodoList(id)
                .then()
                .catch(error => {
                  alert(
                    `Failed to delete todoList with id = ${id}, error=${error}`
                  );
                });
            }
          }
        ],
        { cancelable: true }
      );
    };
    return (
      <Swipeout
        right={[
          {
            component: (
              <View
                style={{
                  flex: 0.87,
                  backgroundColor: "#b6022e",
                  alignItems: "center",
                  justifyContent: "center",
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8
                }}
              >
                <Text
                  style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 16 }}
                >
                  Delete
                </Text>
              </View>
            ),
            backgroundColor: "transparent",
            onPress: showDeleteConfirmationReguler
          }
        ]}
        autoClose={true}
      >
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 8,
            marginLeft: "2%",
            marginRight: "2%",
            marginBottom: "1.5%",
            borderColor: "#DBDBDB",
            borderWidth: 1,
            borderBottomColor: "#D6D6D6",
            borderBottomWidth: 3
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginLeft: "2%",
              marginTop: "2%",
              justifyContent: "space-between"
            }}
          >
            <Text
              style={{
                color: "#240303",
                fontWeight: "600",
                fontSize: 15,
                marginTop: "1%",
                marginLeft: "1%"
              }}
            >
              {item_pendapatan.item.selectBtnLabelTetap}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                marginRight: "2%",
                marginTop: "1%",
                color: "#676767"
              }}
            >
              {date}.{item_pendapatan.item.selectedMonth2}.{year}
            </Text>
          </View>
          <View style={{ justifyContent: "space-between" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                marginLeft: "3%",
                marginTop: "5%",
                marginBottom: "2%",
                color: "#676767"
              }}
            >
              IDR {amount_formatted}
            </Text>
          </View>
        </View>
      </Swipeout>
    );
  }
  renderBodyLainnya(item_pendapatan) {
    const amount_formatted = numeral(item_pendapatan.item.amount).format("0,0");
    const items = item_pendapatan.item.selectedBtnType === "lainnya";
    const date = item_pendapatan.item.creationDate.getDate();
    const year = item_pendapatan.item.creationDate.getYear() - 100;
    const id = item_pendapatan.item.id;

    showDeleteConfirmationLainnya = () => {
      Alert.alert(
        "Hapus data ini,",
        "yakin ?",
        [
          {
            text: "No",
            onPress: () => {}, //Do nothing
            style: "cancel"
          },
          {
            text: "Yes",
            onPress: () => {
              deleteTodoList(id)
                .then()
                .catch(error => {
                  alert(
                    `Failed to delete todoList with id = ${id}, error=${error}`
                  );
                });
            }
          }
        ],
        { cancelable: true }
      );
    };
    return (
      <Swipeout
        right={[
          {
            component: (
              <View
                style={{
                  flex: 0.87,
                  backgroundColor: "#b6022e",
                  alignItems: "center",
                  justifyContent: "center",
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8
                }}
              >
                <Text
                  style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 16 }}
                >
                  Delete
                </Text>
              </View>
            ),
            backgroundColor: "transparent",
            onPress: showDeleteConfirmationLainnya
          }
        ]}
        autoClose={true}
      >
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 8,
            marginLeft: "3%",
            marginRight: "3%",
            marginBottom: "1.5%",
            borderColor: "#DBDBDB",
            borderWidth: 1,
            borderBottomColor: "#D6D6D6",
            borderBottomWidth: 3
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginLeft: "2%",
              marginTop: "2%",
              justifyContent: "space-between"
            }}
          >
            <Text
              style={{
                color: "#240303",
                fontWeight: "600",
                fontSize: 15,
                marginTop: "1%",
                marginLeft: "1%"
              }}
            >
              {item_pendapatan.item.selectBtnLabelLainnya}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                marginRight: "2%",
                marginTop: "1%",
                color: "#676767"
              }}
            >
              {date}.{item_pendapatan.item.selectedMonth2}.{year}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                marginLeft: "3%",
                marginTop: "5%",
                marginBottom: "2%",
                color: "#676767"
              }}
            >
              IDR {amount_formatted}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                marginRight: "2%",
                marginTop: "7%",
                marginBottom: "2%",
                color: "#676767"
              }}
            >
              {/* {item_pendapatan.item.tanggal} - {item_pendapatan.item.bulan} */}
            </Text>
          </View>
        </View>
      </Swipeout>
    );
  }

  render() {
    const flatListPendapatan = this.state.todoLists;
    const { selectedMonth, selectedMonth2 } = this.state;
    return (
      <Container>
        <HeaderPendapatan />
        <View style={{ flex: 8 }}>
          <ScrollView style={{ flex: 1, backgroundColor: "#dedede" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginTop: "2%",
                marginLeft: "3%",
                backgroundColor: "transparent",
                width: "93%",
                height: "20%"
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#b6022e",
                  fontWeight: "500",
                  fontSize: 20,
                  marginTop: "1%"
                }}
              >
                Reguler
              </Text>

              {/* Modal Month */}
              <View
                style={{
                  alignSelf: "center",
                  width: "20%",
                  height: "100%",
                  marginLeft: "52%",
                  marginTop: "3%",
                  marginBottom: "3%",
                  alignContent: "center"
                }}
              >
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {}}
                >
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flex: 4,
                        width: "100%",
                        backgroundColor: "#000000",
                        opacity: 0.4
                      }}
                    />
                    <View
                      style={{
                        flex: 2,
                        width: "100%",
                        backgroundColor: "#FFFFFF",
                        borderTopWidth: 4,
                        borderTopColor: "#f4f4f4"
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "roboto",
                            fontSize: 20,
                            color: "#000000",
                            fontWeight: "600",
                            marginLeft: "2%"
                          }}
                        >
                          Lihat Pendapatan Bulan :{" "}
                        </Text>

                        <TouchableOpacity
                          onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                            this.setSelectedMonth(this.state.selectedMonth2);
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
                      </View>

                      {/* Month Jan-Apr */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          marginTop: "5%"
                        }}
                      >
                        <Text
                          onPress={() => {
                            this.setState({ selectedMonth: 1 });
                            this.setState({ selectedMonth2: "Jan" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color: selectedMonth === 1 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonth === 1 ? "#121212" : "#FFFFFF",
                            width: "10%",
                            textAlignVertical: "center",
                            textAlign: "center",
                            borderRadius: 4
                          }}
                        >
                          Jan
                        </Text>

                        <Text
                          onPress={() => {
                            this.setState({ selectedMonth: 2 });
                            this.setState({ selectedMonth2: "Feb" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color: selectedMonth === 2 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonth === 2 ? "#121212" : "#FFFFFF",
                            width: "10%",
                            textAlignVertical: "center",
                            textAlign: "center",
                            borderRadius: 4
                          }}
                        >
                          Feb
                        </Text>

                        <Text
                          onPress={() => {
                            this.setState({ selectedMonth: 3 });
                            this.setState({ selectedMonth2: "Mar" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color: selectedMonth === 3 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonth === 3 ? "#121212" : "#FFFFFF",
                            width: "10%",
                            textAlignVertical: "center",
                            textAlign: "center",
                            borderRadius: 4
                          }}
                        >
                          Mar
                        </Text>

                        <Text
                          onPress={() => {
                            this.setState({ selectedMonth: 4 });
                            this.setState({ selectedMonth2: "Apr" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color: selectedMonth === 4 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonth === 4 ? "#121212" : "#FFFFFF",
                            width: "10%",
                            textAlignVertical: "center",
                            textAlign: "center",
                            borderRadius: 4
                          }}
                        >
                          Apr
                        </Text>
                      </View>

                      {/* Month May-Ags */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          marginTop: "5%"
                        }}
                      >
                        <Text
                          onPress={() => {
                            this.setState({ selectedMonth: 5 });
                            this.setState({ selectedMonth2: "May" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color: selectedMonth === 5 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonth === 5 ? "#121212" : "#FFFFFF",
                            width: "10%",
                            textAlignVertical: "center",
                            textAlign: "center",
                            borderRadius: 4
                          }}
                        >
                          May
                        </Text>

                        <Text
                          onPress={() => {
                            this.setState({ selectedMonth: 6 });
                            this.setState({ selectedMonth2: "Jun" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color: selectedMonth === 6 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonth === 6 ? "#121212" : "#FFFFFF",
                            width: "10%",
                            textAlignVertical: "center",
                            textAlign: "center",
                            borderRadius: 4
                          }}
                        >
                          Jun
                        </Text>

                        <Text
                          onPress={() => {
                            this.setState({ selectedMonth: 7 });
                            this.setState({ selectedMonth2: "Jul" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color: selectedMonth === 7 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonth === 7 ? "#121212" : "#FFFFFF",
                            width: "10%",
                            textAlignVertical: "center",
                            textAlign: "center",
                            borderRadius: 4
                          }}
                        >
                          Jul
                        </Text>

                        <Text
                          onPress={() => {
                            this.setState({ selectedMonth: 8 });
                            this.setState({ selectedMonth2: "Ags" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color: selectedMonth === 8 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonth === 8 ? "#121212" : "#FFFFFF",
                            width: "10%",
                            textAlignVertical: "center",
                            textAlign: "center",
                            borderRadius: 4
                          }}
                        >
                          Ags
                        </Text>
                      </View>

                      {/* Month Sep - Des */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          marginTop: "5%"
                        }}
                      >
                        <Text
                          onPress={() => {
                            this.setState({ selectedMonth: 9 });
                            this.setState({ selectedMonth2: "Sep" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color: selectedMonth === 9 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonth === 9 ? "#121212" : "#FFFFFF",
                            width: "10%",
                            textAlignVertical: "center",
                            textAlign: "center",
                            borderRadius: 4
                          }}
                        >
                          Sep
                        </Text>

                        <Text
                          onPress={() => {
                            this.setState({ selectedMonth: 10 });
                            this.setState({ selectedMonth2: "Okt" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color: selectedMonth === 10 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonth === 10 ? "#121212" : "#FFFFFF",
                            width: "10%",
                            textAlignVertical: "center",
                            textAlign: "center",
                            borderRadius: 4
                          }}
                        >
                          Okt
                        </Text>

                        <Text
                          onPress={() => {
                            this.setState({ selectedMonth: 11 });
                            this.setState({ selectedMonth2: "Nov" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color: selectedMonth === 11 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonth === 11 ? "#121212" : "#FFFFFF",
                            width: "10%",
                            textAlignVertical: "center",
                            textAlign: "center",
                            borderRadius: 4
                          }}
                        >
                          Nov
                        </Text>

                        <Text
                          onPress={() => {
                            this.setState({ selectedMonth: 12 });
                            this.setState({ selectedMonth2: "Dec" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color: selectedMonth === 12 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonth === 12 ? "#121212" : "#FFFFFF",
                            width: "10%",
                            textAlignVertical: "center",
                            textAlign: "center",
                            borderRadius: 4
                          }}
                        >
                          Dec
                        </Text>
                      </View>
                    </View>
                  </View>
                </Modal>

                <TouchableOpacity
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: 10,
                    marginTop: "3%",
                    width: "100%",
                    height: "100%"
                  }}
                  onPress={() => {
                    this.setModalVisible(true);
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#1eb721",
                      fontWeight: "500",
                      fontSize: 20
                    }}
                  >
                    {selectedMonth2}
                  </Text>
                </TouchableOpacity>

                {/* <View>
                  {React.createElement(
                    ListPendapatan,
                    (selectedMonthProps = { selectedMonth2 }),
                    null
                  )}
                </View> */}
              </View>
              <View
                style={{
                  alignSelf: "center",
                  width: "10%",
                  height: "100%",
                  marginTop: "3%",
                  marginBottom: "3%",
                  alignContent: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setModalDeleteVisible(true);
                    // this.setSelectedMonth(this.state.selectedMonth2);
                  }}
                >
                  <Image
                    style={{
                      height: 32,
                      width: 32,
                      marginTop: "1%",
                      marginRight: "2%"
                    }}
                    source={require("../asset_app/delete3.png")}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              {/* <ModalMonth /> */}
            </View>

            <View style={{ backgroundColor: "transparent" }} />

            

            {/* Modal Delete All*/}
            <Modal
              transparent={true}
              animationType={"none"}
              visible={this.state.loadingDelete}
              onRequestClose={() => {
                console.log("close modal");
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  backgroundColor: "#00000070"
                }}
              >
                <View
                  style={{
                    backgroundColor: "#FFFFFF",
                    height: 200,
                    width: 200,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.setModalDeleteVisible(!this.state.loadingDelete);
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
                  <Image
                    style={{
                      height: 100,
                      width: 100,
                      marginTop: "9%",
                      marginRight: "2%"
                    }}
                    source={require("../asset_app/catsorry.png")}
                    resizeMode="contain"
                  />
                  <TouchableOpacity
                    style={{
                      backgroundColor: "transparent",
                      borderRadius: 10,
                      marginTop: "3%",
                      width: "100%",
                      height: "100%"
                    }}
                    onPress={() => {
                      deleteAllTodoLists()
                        .then()
                        .catch(error => {
                          alert(
                            `Delete all TodoLists failed. Error = ${error}`
                          );
                        });
                      this.setModalDeleteVisible(!this.state.loadingDelete);
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#b6022e",
                        fontWeight: "500",
                        fontSize: 16
                      }}
                    >
                      Hapus semua data,
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#b6022e",
                        fontWeight: "500",
                        fontSize: 16
                      }}
                    >
                      yakin ?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* <ModalDelete loadingDelete={this.state.loadingDelete} /> */}

            <FlatList
              data={this.state.todoLists.filter(
                item =>
                  item.selectedBtnType === "reguler" &&
                  item.selectedMonth2 === this.state.selectedMonth
              )}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderBodyReguler}
            />

            <View
              style={{
                flex: 1,
                marginTop: "2%",
                marginLeft: "3%",
                marginBottom: "4%",
                backgroundColor: "transparent",
                width: "20%",
                height: "5%"
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#b6022e",
                  fontWeight: "500",
                  fontSize: 20,
                  marginTop: "3%"
                }}
              >
                Lainnya
              </Text>
            </View>

            <View style={{ backgroundColor: "transparent" }}>
              <FlatList
                data={this.state.todoLists.filter(
                  item =>
                    item.selectedBtnType === "lainnya" &&
                    item.selectedMonth2 === this.state.selectedMonth
                )}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.renderBodyLainnya}
              />
            </View>
            <View style={{ marginTop: "2%" }} />
          </ScrollView>
        </View>
      </Container>
    );
  }
}
