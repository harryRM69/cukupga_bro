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
  Alert,
  ImageBackground
} from "react-native";
import numeral from "numeral";
import pendapatan, { pengeluaran } from "../src/dana_keluar";
import { withNavigation } from "react-navigation";
import HeaderPengeluaran from "../Components/HeaderComponent/indexpengeluaran";
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
import PieChart from "react-native-pie-chart";
import Pie from "react-native-pie";

export default class ListPengeluaran extends Component {
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
      MonthDebit: Month,
      selectedMonthDebit: Month,
      selectedMonth2Debit: Month2,
      modalVisible: false,
      loading: true,
      loadingDelete: false,
      loadingDeleteID: false,
      modalVisibleFrontPageDebit: true
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
  setModalVisibleFrontPageDebit(visible) {
    this.setState({ modalVisibleFrontPageDebit: visible });
  }

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
    this.setState({ selectedMonth2Debit: this.state.selectedMonth2Debit });
  }

  // List Pendapatan
  renderBodyReguler(item_pengeluaran) {
    const amount_formatted = numeral(item_pengeluaran.item.amountDebit).format(
      "0,0"
    );
    const items = item_pengeluaran.item.selectedBtnTypeDebit === "reguler";
    const date = item_pengeluaran.item.creationDate.getDate();
    const year = item_pengeluaran.item.creationDate.getYear() - 100;
    const id = item_pengeluaran.item.id;
    console.log(item_pengeluaran);

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
              {item_pengeluaran.item.selectBtnLabelTetapDebit}
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
              {date}.{item_pengeluaran.item.selectedMonth2Debit}.{year}
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
  renderBodyLainnya(item_pengeluaran) {
    const amount_formatted = numeral(item_pengeluaran.item.amountDebit).format(
      "0,0"
    );
    const items = item_pengeluaran.item.selectedBtnTypeDebit === "lainnya";
    const date = item_pengeluaran.item.creationDate.getDate();
    const year = item_pengeluaran.item.creationDate.getYear() - 100;
    const id = item_pengeluaran.item.id;

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
              {item_pengeluaran.item.selectBtnLabelLainnyaDebit}
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
              {date}.{item_pengeluaran.item.selectedMonth2Debit}.{year}
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
    const flatListPengeluaran = this.state.todoLists;
    const { selectedMonthDebit, selectedMonth2Debit } = this.state;

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

    const total_pengeluaran =
      total_pengeluaran_reguler + total_pengeluaran_lainnya;

    // Pengeluaran Makan & Minum
    const dataPengeluaranRegulerMakan = this.state.todoLists.filter(
      item =>
        item.selectedBtnTypeDebit === "reguler" &&
        item.selectedMonth2Debit === this.state.selectedMonthDebit &&
        item.selectBtnLabelTetapDebit === "Makan & Minum"
    );
    let total_pengeluaran_reguler_Makan = 0;
    dataPengeluaranRegulerMakan.map(item => {
      const nominalPengeluaranRegulerMakan = parseInt(item.amountDebit);
      total_pengeluaran_reguler_Makan += nominalPengeluaranRegulerMakan;
    });

    // Pengeluaran Transport
    const dataPengeluaranRegulerTransport = this.state.todoLists.filter(
      item =>
        item.selectedBtnTypeDebit === "reguler" &&
        item.selectedMonth2Debit === this.state.selectedMonthDebit &&
        item.selectBtnLabelTetapDebit === "Transport"
    );
    let total_pengeluaran_reguler_transport = 0;
    dataPengeluaranRegulerTransport.map(item => {
      const nominalPengeluaranRegulerTransport = parseInt(item.amountDebit);
      total_pengeluaran_reguler_transport += nominalPengeluaranRegulerTransport;
    });

    // Pengeluaran Angsuran
    const dataPengeluaranRegulerAngsuran = this.state.todoLists.filter(
      item =>
        item.selectedBtnTypeDebit === "reguler" &&
        item.selectedMonth2Debit === this.state.selectedMonthDebit &&
        item.selectBtnLabelTetapDebit === "Angsuran"
    );
    let total_pengeluaran_reguler_angsuran = 0;
    dataPengeluaranRegulerAngsuran.map(item => {
      const nominalPengeluaranRegulerAngsuran = parseInt(item.amountDebit);
      total_pengeluaran_reguler_angsuran += nominalPengeluaranRegulerAngsuran;
    });

    // Pengeluaran Belanja RT
    const dataPengeluaranRegulerBelanja = this.state.todoLists.filter(
      item =>
        item.selectedBtnTypeDebit === "reguler" &&
        item.selectedMonth2Debit === this.state.selectedMonthDebit &&
        item.selectBtnLabelTetapDebit === "Belanja RT"
    );
    let total_pengeluaran_reguler_belanja = 0;
    dataPengeluaranRegulerBelanja.map(item => {
      const nominalPengeluaranRegulerBelanja = parseInt(item.amountDebit);
      total_pengeluaran_reguler_belanja += nominalPengeluaranRegulerBelanja;
    });

    // Pengeluaran Listrik, Air & Phone
    const dataPengeluaranRegulerListrik = this.state.todoLists.filter(
      item =>
        item.selectedBtnTypeDebit === "reguler" &&
        item.selectedMonth2Debit === this.state.selectedMonthDebit &&
        item.selectBtnLabelTetapDebit === "Listrik, Air & Phone"
    );
    let total_pengeluaran_reguler_listrik = 0;
    dataPengeluaranRegulerListrik.map(item => {
      const nominalPengeluaranRegulerListrik = parseInt(item.amountDebit);
      total_pengeluaran_reguler_listrik += nominalPengeluaranRegulerListrik;
    });

    // Pengeluaran Hobbies

    const dataPengeluaranLainnyaHobbies = this.state.todoLists.filter(
      item =>
        item.selectedBtnTypeDebit === "lainnya" &&
        item.selectedMonth2Debit === this.state.selectedMonthDebit &&
        item.selectBtnLabelLainnyaDebit === "Hobbies"
    );
    let total_pengeluaran_lainnya_hobbies = 0;
    dataPengeluaranLainnyaHobbies.map(item => {
      const nominalPengeluaranLainnyaHobbies = parseInt(item.amountDebit);
      total_pengeluaran_lainnya_hobbies += nominalPengeluaranLainnyaHobbies;
    });

    // Pengeluaran Baju Tas

    const dataPengeluaranLainnyaBajuTas = this.state.todoLists.filter(
      item =>
        item.selectedBtnTypeDebit === "lainnya" &&
        item.selectedMonth2Debit === this.state.selectedMonthDebit &&
        item.selectBtnLabelLainnyaDebit === "Baju Tas"
    );
    let total_pengeluaran_lainnya_BajuTas = 0;
    dataPengeluaranLainnyaBajuTas.map(item => {
      const nominalPengeluaranLainnyaBajuTas = parseInt(item.amountDebit);
      total_pengeluaran_lainnya_BajuTas += nominalPengeluaranLainnyaBajuTas;
    });

    // Pengeluaran Lainnya

    const dataPengeluaranLainnyaLainnya = this.state.todoLists.filter(
      item =>
        item.selectedBtnTypeDebit === "lainnya" &&
        item.selectedMonth2Debit === this.state.selectedMonthDebit &&
        item.selectBtnLabelLainnyaDebit === "Lainnya"
    );
    let total_pengeluaran_lainnya_Lainnya = 0;
    dataPengeluaranLainnyaLainnya.map(item => {
      const nominalPengeluaranLainnyaLainnya = parseInt(item.amountDebit);
      total_pengeluaran_lainnya_Lainnya += nominalPengeluaranLainnyaLainnya;
    });

    const total_pengeluaran_reguler_Makan_pie = total_pengeluaran_reguler_Makan;
    const total_pengeluaran_reguler_transport_pie = total_pengeluaran_reguler_transport;
    const total_pengeluaran_reguler_angsuran_pie = total_pengeluaran_reguler_angsuran;
    const total_pengeluaran_reguler_belanja_pie = total_pengeluaran_reguler_belanja;
    const total_pengeluaran_reguler_listrik_pie = total_pengeluaran_reguler_listrik;
    const total_pengeluaran_lainnya_hobbies_pie = total_pengeluaran_lainnya_hobbies;
    const total_pengeluaran_lainnya_BajuTas_pie = total_pengeluaran_lainnya_BajuTas;
    const total_pengeluaran_lainnya_Lainnya_pie =
      total_pengeluaran_lainnya_Lainnya + 1;
    console.log(total_pengeluaran_lainnya_Lainnya_pie);
    return (
      <Container>
        {/* Modal FrontPage Pengeluaran */}

        <View style={{ backgroundColor: "#FFFFFF" }}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisibleFrontPageDebit}
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
                    this.setModalVisibleFrontPageDebit(
                      !this.state.modalVisibleFrontPageDebit
                    );
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

                <ImageBackground
                  source={require("../asset_app/manbrainblur.png")}
                  style={{
                    flex: 1,
                    // resizeMode: "stretch",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "roboto",
                      fontSize: 16,
                      fontWeight: "500",
                      color: "#3B3A3D",
                      marginTop: "1%",
                      textAlign: "center",
                      backgroundColor: "#FFFFFF"
                    }}
                  >
                    Cek Pengeluaran mu Gaes
                  </Text>

                  <View
                    style={{
                      flex: 0.9,
                      backgroundColor: "#FFFFFF50",
                      width: "100%",
                      height: "100%",
                      flexDirection: "row"
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: "transparent",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <PieChart
                        chart_wh={225}
                        coverRadius={0.45}
                        series={[
                          total_pengeluaran_reguler_Makan_pie,
                          total_pengeluaran_reguler_transport_pie,
                          total_pengeluaran_reguler_angsuran_pie,
                          total_pengeluaran_reguler_belanja_pie,
                          total_pengeluaran_reguler_listrik_pie,
                          total_pengeluaran_lainnya_hobbies_pie,
                          total_pengeluaran_lainnya_BajuTas_pie,
                          total_pengeluaran_lainnya_Lainnya_pie
                        ]}
                        sliceColor={[
                          "#EB0790",
                          "#106FEB",
                          "#26F007",
                          "#FFFF17",
                          "#F7991E",
                          "#7614F7",
                          "#31F7EA",
                          "#1B22F7"
                        ]}
                        doughnut={true}
                        coverFill={"#FFFFFF"}
                      />
                    </View>

                    <View
                      style={{
                        backgroundColor: "transparent",
                        alignItems: "center",
                        marginTop: "25%"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          marginLeft: "2%",
                          marginRight: "3%",
                          marginTop: "3%",
                          fontWeight: "700",
                          textAlign: "center",
                          backgroundColor: "#FFFFFF70",
                          borderTopRightRadius: 10,
                          borderTopLeftRadius: 10
                        }}
                      >
                        Idr
                      </Text>
                      <Text
                        style={{
                          fontSize: 21,
                          fontWeight: "700",
                          textAlign: "center",
                          marginLeft: "2%",
                          marginRight: "3%",
                          marginBottom: "3%",
                          color: "#000000",
                          backgroundColor: "#FFFFFF70",
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10
                        }}
                      >
                        {numeral(total_pengeluaran).format("0,0")}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "transparent",
                      alignItems: "center"
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#00000080",
                        width: "90%",
                        height: "70%",
                        marginTop: "2%",
                        borderWidth: 2,
                        borderColor: "#FA1BA8",
                        borderRadius: 10,
                        justifyContent: "center"
                      }}
                    >
                      {/* //  Row1 */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        {/* Makan & Minum */}
                        <View
                          style={{
                            width: "7%",
                            borderRadius: 5,
                            marginLeft: "3%",
                            marginTop: "2%",
                            backgroundColor: "#EB0790"
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: "roboto",
                            fontSize: 13,
                            fontWeight: "500",
                            color: "#FFFFFF",
                            marginTop: "2%"
                          }}
                        >
                          Makan & Minum :
                        </Text>

                        <Text
                          style={{
                            fontFamily: "roboto",
                            fontSize: 13,
                            fontWeight: "500",
                            marginRight: "3%",
                            color: "#FFFFFF",
                            marginTop: "2%"
                          }}
                        >
                          {numeral(total_pengeluaran_reguler_Makan).format(
                            "0,0"
                          )}
                        </Text>
                      </View>

                      {/* //  Row2 */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        {/* Transport*/}
                        <View
                          style={{
                            width: "7%",
                            borderRadius: 5,
                            marginLeft: "3%",
                            marginTop: "1%",
                            backgroundColor: "#106FEB"
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: "roboto",
                            fontSize: 13,
                            fontWeight: "500",
                            color: "#FFFFFF",
                            marginTop: "1%"
                          }}
                        >
                          Transport :
                        </Text>

                        <Text
                          style={{
                            fontFamily: "roboto",
                            fontSize: 13,
                            fontWeight: "500",
                            marginRight: "3%",
                            color: "#FFFFFF",
                            marginTop: "1%"
                          }}
                        >
                          {numeral(total_pengeluaran_reguler_transport).format(
                            "0,0"
                          )}
                        </Text>
                      </View>

                      {/* //  Row3 */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        {/* Angsuran*/}
                        <View
                          style={{
                            width: "7%",
                            borderRadius: 5,
                            marginLeft: "3%",
                            marginTop: "1%",
                            backgroundColor: "#26F007"
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: "roboto",
                            fontSize: 13,
                            fontWeight: "500",
                            color: "#FFFFFF",
                            marginTop: "1%"
                          }}
                        >
                          Angsuran :
                        </Text>

                        <Text
                          style={{
                            fontFamily: "roboto",
                            fontSize: 13,
                            fontWeight: "500",
                            marginRight: "3%",
                            color: "#FFFFFF",
                            marginTop: "1%"
                          }}
                        >
                          {numeral(total_pengeluaran_reguler_angsuran).format(
                            "0,0"
                          )}
                        </Text>
                      </View>

                      {/* //  Row4 */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        {/* BelanjaRT*/}
                        <View
                          style={{
                            width: "7%",
                            borderRadius: 5,
                            marginLeft: "3%",
                            marginTop: "1%",
                            backgroundColor: "#FFFF17"
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: "roboto",
                            fontSize: 13,
                            fontWeight: "500",
                            color: "#FFFFFF",
                            marginTop: "1%"
                          }}
                        >
                          Belanja RT :
                        </Text>

                        <Text
                          style={{
                            fontFamily: "roboto",
                            fontSize: 13,
                            fontWeight: "500",
                            marginRight: "3%",
                            color: "#FFFFFF",
                            marginTop: "1%"
                          }}
                        >
                          {numeral(total_pengeluaran_reguler_belanja).format(
                            "0,0"
                          )}
                        </Text>
                      </View>

                      {/* //  Row5 */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        {/* ListrikPhone*/}
                        <View
                          style={{
                            width: "7%",
                            borderRadius: 5,
                            marginLeft: "3%",
                            marginTop: "1%",
                            backgroundColor: "#F7991E"
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: "roboto",
                            fontSize: 13,
                            fontWeight: "500",
                            color: "#FFFFFF",
                            marginTop: "1%"
                          }}
                        >
                          Listrik, Phone :
                        </Text>

                        <Text
                          style={{
                            fontFamily: "roboto",
                            fontSize: 13,
                            fontWeight: "500",
                            marginRight: "3%",
                            color: "#FFFFFF",
                            marginTop: "1%"
                          }}
                        >
                          {numeral(total_pengeluaran_reguler_listrik).format(
                            "0,0"
                          )}
                        </Text>
                      </View>

                      {/* //  Row6 */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        {/* Hobbies*/}
                        <View
                          style={{
                            width: "7%",
                            borderRadius: 5,
                            marginLeft: "3%",
                            marginTop: "1%",
                            backgroundColor: "#7614F7"
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: "roboto",
                            fontSize: 13,
                            fontWeight: "500",
                            color: "#FFFFFF",
                            marginTop: "1%"
                          }}
                        >
                          Hobbies :
                        </Text>

                        <Text
                          style={{
                            fontFamily: "roboto",
                            fontSize: 13,
                            fontWeight: "500",
                            marginRight: "3%",
                            color: "#FFFFFF",
                            marginTop: "1%"
                          }}
                        >
                          {numeral(total_pengeluaran_lainnya_hobbies).format(
                            "0,0"
                          )}
                        </Text>
                      </View>

                      {/* //  Row7 */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        {/* BajuTasSepatu*/}
                        <View
                          style={{
                            width: "7%",
                            borderRadius: 5,
                            marginLeft: "3%",
                            marginTop: "1%",
                            backgroundColor: "#31F7EA"
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: "roboto",
                            fontSize: 13,
                            fontWeight: "500",
                            color: "#FFFFFF",
                            marginTop: "1%"
                          }}
                        >
                          Baju, Tas & Sepatu :
                        </Text>

                        <Text
                          style={{
                            fontFamily: "roboto",
                            fontSize: 13,
                            fontWeight: "500",
                            marginRight: "3%",
                            color: "#FFFFFF",
                            marginTop: "1%"
                          }}
                        >
                          {numeral(total_pengeluaran_lainnya_BajuTas).format(
                            "0,0"
                          )}
                        </Text>
                      </View>

                      {/* //  Row8 */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        {/* Lainnya*/}
                        <View
                          style={{
                            width: "7%",
                            borderRadius: 5,
                            marginLeft: "3%",
                            marginTop: "1%",
                            backgroundColor: "#1B22F7",
                            marginBottom: "2%"
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: "roboto",
                            fontSize: 13,
                            fontWeight: "500",
                            color: "#FFFFFF",
                            marginTop: "1%",
                            marginBottom: "2%"
                          }}
                        >
                          Lainnya :
                        </Text>

                        <Text
                          style={{
                            fontFamily: "roboto",
                            fontSize: 13,
                            fontWeight: "500",
                            marginRight: "3%",
                            color: "#FFFFFF",
                            marginTop: "1%",
                            marginBottom: "2%"
                          }}
                        >
                          {numeral(total_pengeluaran_lainnya_Lainnya).format(
                            "0,0"
                          )}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        backgroundColor: "#00000080",
                        width: "90%",
                        height: "20%",
                        marginTop: "2%",
                        borderWidth: 2,
                        borderColor: "#FA1BA8",
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row"
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "roboto",
                          fontSize: 16,
                          fontWeight: "500",
                          color: "#FFFFFF",
                          marginTop: "1%",
                          marginBottom: "1%"
                        }}
                      >
                        Hari ini :
                      </Text>
                      <Text
                        style={{
                          fontFamily: "roboto",
                          fontSize: 25,
                          fontWeight: "500",
                          color: "#FFFFFF",
                          marginTop: "1%",
                          marginBottom: "1%",
                          marginLeft: "1%"
                        }}
                      >
                        Rp. 200,000
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </View>
          </Modal>
        </View>
        <HeaderPengeluaran />
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
                          Lihat Pengeluaran Bulan :{" "}
                        </Text>

                        <TouchableOpacity
                          onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                            this.setSelectedMonth(
                              this.state.selectedMonth2Debit
                            );
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
                            this.setState({ selectedMonthDebit: 1 });
                            this.setState({ selectedMonth2Debit: "Jan" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color:
                              selectedMonthDebit === 1 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonthDebit === 1 ? "#121212" : "#FFFFFF",
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
                            this.setState({ selectedMonthDebit: 2 });
                            this.setState({ selectedMonth2Debit: "Feb" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color:
                              selectedMonthDebit === 2 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonthDebit === 2 ? "#121212" : "#FFFFFF",
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
                            this.setState({ selectedMonthDebit: 3 });
                            this.setState({ selectedMonth2Debit: "Mar" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color:
                              selectedMonthDebit === 3 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonthDebit === 3 ? "#121212" : "#FFFFFF",
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
                            this.setState({ selectedMonthDebit: 4 });
                            this.setState({ selectedMonth2Debit: "Apr" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color:
                              selectedMonthDebit === 4 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonthDebit === 4 ? "#121212" : "#FFFFFF",
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
                            this.setState({ selectedMonthDebit: 5 });
                            this.setState({ selectedMonth2Debit: "May" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color:
                              selectedMonthDebit === 5 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonthDebit === 5 ? "#121212" : "#FFFFFF",
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
                            this.setState({ selectedMonthDebit: 6 });
                            this.setState({ selectedMonth2Debit: "Jun" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color:
                              selectedMonthDebit === 6 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonthDebit === 6 ? "#121212" : "#FFFFFF",
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
                            this.setState({ selectedMonthDebit: 7 });
                            this.setState({ selectedMonth2Debit: "Jul" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color:
                              selectedMonthDebit === 7 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonthDebit === 7 ? "#121212" : "#FFFFFF",
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
                            this.setState({ selectedMonthDebit: 8 });
                            this.setState({ selectedMonth2Debit: "Ags" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color:
                              selectedMonthDebit === 8 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonthDebit === 8 ? "#121212" : "#FFFFFF",
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
                            this.setState({ selectedMonthDebit: 9 });
                            this.setState({ selectedMonth2Debit: "Sep" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color:
                              selectedMonthDebit === 9 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonthDebit === 9 ? "#121212" : "#FFFFFF",
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
                            this.setState({ selectedMonthDebit: 10 });
                            this.setState({ selectedMonth2Debit: "Okt" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color:
                              selectedMonthDebit === 10 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonthDebit === 10 ? "#121212" : "#FFFFFF",
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
                            this.setState({ selectedMonthDebit: 11 });
                            this.setState({ selectedMonth2Debit: "Nov" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color:
                              selectedMonthDebit === 11 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonthDebit === 11 ? "#121212" : "#FFFFFF",
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
                            this.setState({ selectedMonthDebit: 12 });
                            this.setState({ selectedMonth2Debit: "Dec" });
                          }}
                          style={{
                            fontFamily: "roboto",
                            fontSize: 15,
                            color:
                              selectedMonthDebit === 12 ? "#FFFFFF" : "#363636",
                            backgroundColor:
                              selectedMonthDebit === 12 ? "#121212" : "#FFFFFF",
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
                    {selectedMonth2Debit}
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

            {/* <Loader loading={this.state.loading} /> */}

            {/* Modal Delete All*/}
            <Modal
              transparent={true}
              animationType={"none"}
              visible={this.state.loadingDelete}
              onRequestClose={() => {}}
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
                  item.selectedBtnTypeDebit === "reguler" &&
                  item.selectedMonth2Debit === this.state.selectedMonthDebit
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
                    item.selectedBtnTypeDebit === "lainnya" &&
                    item.selectedMonth2Debit === this.state.selectedMonthDebit
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
