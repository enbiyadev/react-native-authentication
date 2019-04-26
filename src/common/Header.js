import React, { Components } from "react";
import { View, Text } from "react-native";

const Header = ( props ) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={ viewStyle }>
      <Text style={ textStyle }> { props.headerText } </Text>
    </View>
  );
};

const styles = {
  textStyle: {
    fontSize: 20
  },
  viewStyle: {
    backgroundColor: "#f1f1f1",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width:0, height:2 },
    shadowOpacity: 0.2
  }
}

export default Header;