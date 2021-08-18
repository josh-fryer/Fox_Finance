import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { formatNumber } from "react-native-currency-input";
import { deleteTransaction } from "../../../components/utils/save-load.component";
import { Spacer } from "../../../components/spacer.component";
import { Button } from "../../../components/custom-button";

export const TransactionComponent = ({ item }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [deleted, setDeleted] = useState(false);

  let prefix = "";

  if (item.type === "expense") {
    prefix = "- ";
  }

  const deleteItem = () => {
    //deleteTransaction(item.id);
    setDeleted(true);
    this.props.onChange();
  };

  const content = (
    <>
      <Money inputType={item.type}>
        {prefix}
        {formatNumber(item.amount, {
          separator: ".",
          prefix: "£ ",
          precision: 2,
          delimiter: ",",
          signPosition: "beforePrefix",
        })}
      </Money>
      <Title>{item.description}</Title>
      <Date>{item.date}</Date>
    </>
  );

  const deleteComponent = (
    <DeleteContainer>
      <Button
        title={"Delete"}
        size={"small"}
        bgColor={"red"}
        onPress={() => deleteItem()}
      />
      <Spacer size={"xxl"} position="right" />
      <Button
        title={"Cancel"}
        size={"small"}
        bgColor={"white"}
        onPress={() => setShowDelete(false)}
      />
    </DeleteContainer>
  );

  if (!deleted) {
    return (
      <Spacer position="top" size="medium">
        {!showDelete ? (
          <TransactionItem onPress={() => setShowDelete(true)}>
            {content}
          </TransactionItem>
        ) : (
          deleteComponent
        )}
      </Spacer>
    );
  } else {
    return <View />;
  }
};

// -------- STYLES --------
const borderWidth = 1;
const TransactionItem = styled(TouchableOpacity)`
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
  font-size: ${(props) => props.theme.fontSizes.body};
  padding: ${(props) => props.theme.space[1]};
  text-align: center;
  justify-content: center;
  font-weight: 700;
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
const DeleteContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.ui.disabled};
  padding: ${(props) => props.theme.space[1]};
  min-height: ${(props) => props.theme.sizes[2]};
  border-bottom-width: 2px;
  border-top-width: 2px;
  border-style: solid;
  border-top-color: #b5b5b5;
  border-bottom-color: #b5b5b5;
  align-items: center;
  justify-content: center;
`;
