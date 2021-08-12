import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

const borderWidth = 1;
const TransactionItem = styled(View)`
  flex: 1;
  flex-direction: row;
  background-color: white;
  padding: ${(props) => props.theme.space[1]};
  min-height: ${(props) => props.theme.sizes[2]};
  border-top-width: 2px;
  border-bottom-width: 2px;
  border-style: solid;
  border-top-color: #b5b5b5;
  border-bottom-color: #b5b5b5;
  align-items: center;
`;
const Money = styled(Text)`
  flex: 1;
  border-right-width: ${borderWidth}px;
  border-style: solid;
  border-right-color: #b5b5b5;
  font-size: ${(props) => props.theme.fontSizes.title};
  padding: ${(props) => props.theme.space[1]};
  text-align: center;
  justify-content: center;
  color: ${(props) =>
    props.inputType === "income"
      ? props.theme.colors.text.success
      : props.theme.colors.text.error};
`;
const Title = styled(Text)`
  flex: 1;
  border-right-width: ${borderWidth}px;
  border-style: solid;
  border-right-color: #b5b5b5;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.body};
  padding: ${(props) => props.theme.space[1]};
`;
const Date = styled(Text)`
  flex: 1;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.body};
  padding: ${(props) => props.theme.space[1]};
`;

export const TransactionComponent = ({ item }) => {
  return (
    <TransactionItem>
      <Money inputType={item.type}>£{item.amount}</Money>
      <Title>{item.description}</Title>
      <Date>{item.date}</Date>
    </TransactionItem>
  );
};
