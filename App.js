import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { StackNavigator } from "react-navigation";
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import Login from "./screen/Login";
import Signup from "./screen/Signup";
import Home from "./screen/Home";
import InputPendapatan from "./screen/InputPendapatan";
import InputPengeluaran from "./screen/InputPengeluaran";
import ListPendapatan from "./screen/ListPendapatan";
import ListPengeluaran from "./screen/ListPengeluaran"
import HeaderPendapatan from "./Components/HeaderComponent/index";
import HeaderPengeluaran from "./Components/HeaderComponent/indexpengeluaran";
import indexProps from "./Components/HeaderComponent/indexProps";

const {width, height} = Dimensions.get ('window');

// custom transation
// export const fromRightLeft = (index, position) => {
//   const inputRange =[0, index, index+0.70, index+1];
//   const opacity = position.interpolate({
//     inputRange,
//     outputRange :[1,1,1,1]
//   })
//   const translateX= position.interpolate ({
//     inputRange,
//     outputRange : [-width,0,0,0]
//   })
//   return {
//     opacity,
//     transform :[
//       {translateX}
//     ]
//   }
// }

// export const fromBottomUp = (index, position) => {
//   const inputRange =[0, index, index+0.80, index+1];
//   const opacity = position.interpolate({
//     inputRange,
//     outputRange :[1,1,1,1]
//   })
//   const translateY= position.interpolate ({
//     inputRange,
//     outputRange : [height,0,0,0]
//   })
//   return {
//     opacity,
//     transform :[
//       {translateY}
//     ]
//   }
// }


//transation Config
const transconfig = () =>{
  return{
    screenInterpolator:(sceneProps) => {
      const {position, scene} = sceneProps;
      const {index, route} = scene;
      const params= route.params || {};
      const transition = params.transition || 'default';

      return {
        // list of transation
        default :CardStackStyleInterpolator.forHorizontal(sceneProps),
        // fromRightLeft :fromRightLeft (index, position),
        // fromBottomUp:fromBottomUp (index,position)
      } [transition]

    }
  }
}




const RouteStack = StackNavigator(
  {
    LoginPage: {
      screen: Login,
      headerMode: "none",
      header: null,
      navigationOptions: {
        header: null
      }
    },
    SignupPage: {
      screen: Signup,
      headerMode: "none",
      header: null,
      navigationOptions: {
        header: null
      }
    },
    HomePage: {
      screen: Home,
      headerMode: "none",
      header: null,
      navigationOptions: {
        header: null
      }
    },
    InputPendapatanPage: {
      screen: InputPendapatan,
      headerMode: "none",
      header: null,
      navigationOptions: {
        header: null
      }
    },
    InputPengeluaranPage: {
      screen: InputPengeluaran,
      headerMode: "none",
      header: null,
      navigationOptions: {
        header: null
      }
    },
    ListPendapatanPage: {
      screen: ListPendapatan,
      headerMode: "none",
      header: null,
      navigationOptions: {
        header: null,
      }
    },
    ListPengeluaranPage: {
      screen: ListPengeluaran,
      headerMode: "none",
      header: null,
      navigationOptions: {
        header: null,
      }
    },
    CobaPage: {
      screen: indexProps,
      headerMode: "none",
      header: null,
      navigationOptions: {
        header: null,
      }
    },

  },
  {
    initialRouteName: "HomePage",
    transitionConfig:transconfig 
  }
);

export default RouteStack;
