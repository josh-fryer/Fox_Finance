/* eslint-disable no-alert */
import React, { useState } from "react";
import { Button, Text, StyleSheet, View } from "react-native";
import CurrencyInput from "react-native-currency-input";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utils/safe-area.component";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addTransaction } from "../../../components/utils/save-load.component";

const NameInput = styled.TextInput`
  border-width: 1px;
  margin: 20px;
`;

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return [day, month, year].join("/");
}

export const AddScreen = () => {
  const [number, onChangeNumber] = useState(null);
  const [name, onChangeName] = useState("");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const clearForm = () => {
    onChangeNumber(null);
    onChangeName("");
    setDate(new Date());
  };

  const onSubmit = () => {
    if (!name.trim()) {
      alert("Please Enter Name");
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
    addTransaction(name, formatDate(date), number, "income");
    clearForm();
    alert("Succesfully Added!");
    /* reset form here. return to transactions screen */
  };

  return (
    <SafeArea>
      <CurrencyInput
        value={number}
        prefix="£"
        delimiter=","
        separator="."
        precision={2}
        placeholder="£00.00"
        keyboardType="numeric"
        onChangeValue={onChangeNumber}
        style={styles.currencyInput}
      />
      <NameInput
        value={name}
        placeholder="enter description"
        onChangeText={onChangeName}
      />
      <View>
        <View>
          <Button onPress={showDatepicker} title={formatDate(date)} />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={date}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <Button title="Income" />
      <Text>Or</Text>
      <Button title="Expense" />
      <Button title="Submit" onPress={onSubmit} />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  currencyInput: {
    margin: 20,
    borderWidth: 1,
  },
});
