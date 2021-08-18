import React from "react";
import { Text, TouchableOpacity, Dimensions } from "react-native";
import styled from "styled-components/native";

const width = Dimensions.get("window").width;

const handleFontSize = (props) => {
  switch (props.fontSize) {
    case "title":
      return props.theme.fontSizes.title;
    case "button":
      return props.theme.fontSizes.button;
    default:
      return props.theme.fontSizes.body;
  }
};

const handleSize = (props) => {
  switch (props.size) {
    case "medium":
      return (width / 3).toString() + "px";
    case "large":
      return (width / 2).toString() + "px";
    case "small":
      return (width / 4).toString() + "px";
    default:
      return width.toString() + "px";
  }
};

const Touchable = styled(TouchableOpacity)`
  border-radius: 20px;
  width: ${(props) => handleSize(props)};
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : props.theme.colors.ui.primary}};
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin: 3px;
`;
const Title = styled.Text`
  font-weight: bold;
  font-size: ${(props) => handleFontSize(props)};
`;

export const Button = ({
  fontSize = "body",
  size = "large",
  bgColor = null,
  ...props
}) => {
  return (
    <Touchable onPress={props.onPress} size={size} bgColor={bgColor}>
      <Title textColor={props.textColor} fontSize={fontSize}>
        {props.title}
      </Title>
    </Touchable>
  );
};
