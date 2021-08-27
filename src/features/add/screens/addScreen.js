/* eslint-disable no-alert */
import React, { useState } from "react";
import { View, Alert, Platform } from "react-native";
import CurrencyInput from "react-native-currency-input";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utils/safe-area.component";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addTransaction } from "../../../components/utils/save-load.component";
import { formatDate } from "../../../infrastructure/global";
import { Spacer } from "../../../components/spacer.component";
import { Button } from "../../../components/custom-button";

export const AddScreen = () => {
  const [number, onChangeNumber] = useState(null);
  const [description, onChangeDesc] = useState("");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState("Income");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const clearForm = () => {
    onChangeNumber(null);
    onChangeDesc("");
    setDate(new Date());
  };

  const onSubmit = () => {
    if (!description.trim()) {
      alert("Please enter a description");
      return;
    }

    if (!number) {
      alert("Please Enter amount");
      return;
    } else if (number <= 0) {
      alert("Please enter a number more than 0");
      return;
    }

    /*do something here to save data */
    addTransaction(description, formatDate(date), number, type.toLowerCase());
    clearForm();
    Alert.alert("Success", "Added transaction!");
    /*  return to transactions screen */
  };

  return (
    <SafeArea>
      <Spacer position={"top"} size={"xxl"} />
      <Row>
        <Label>Amount </Label>
        <MyCurrencyInput
          value={number}
          prefix="£"
          delimiter=","
          separator="."
          precision={2}
          placeholder="£00.00"
          keyboardType="numeric"
          onChangeValue={onChangeNumber}
        />
      </Row>
      <Spacer position={"top"} size={"large"} />
      <Row>
        <Label>Description </Label>
        <DescInput
          value={description}
          placeholder="Enter description"
          onChangeText={onChangeDesc}
          multiline={false}
        />
      </Row>

      <Spacer position={"top"} size={"large"} />

      <View style={{ alignItems: "center" }}>
        <Label>Date of transaction</Label>
        <View>
          <Button onPress={showDatepicker} title={formatDate(date)} />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
            style={{ width: "70%" }}
          />
        )}
        <Spacer position={"top"} size={"large"} />
        <Label>Income or Expense</Label>
        <Button
          title={type}
          onPress={() => {
            if (type === "Income") {
              setType("Expense");
            } else {
              setType("Income");
            }
          }}
        />
        <Spacer position={"top"} size={"xxl"} />
        <Button fontSize={"title"} title="SUBMIT" onPress={onSubmit} />
      </View>
    </SafeArea>
  );
};

// -------- STYLES ---------
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 24px;
`;

const DescInput = styled.TextInput`
  border-width: 1px;
  margin-left: 10px;
  border-radius: 3px;
  padding: 2px;
  min-width: 160px;
  max-width: 222px;
  font-size: ${(props) => props.theme.fontSizes.body};
  background-color: white;
`;

const Label = styled.Text`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.title};
`;

const MyCurrencyInput = styled(CurrencyInput)`
  min-width: 160px;
  padding: 2px;
  border-width: 1px;
  border-radius: 3px;
  margin-left: 18px;
  font-size: ${(props) => props.theme.fontSizes.title};
  background-color: white;
`;
