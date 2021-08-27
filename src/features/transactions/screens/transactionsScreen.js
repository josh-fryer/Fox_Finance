import React, { useState, useEffect } from "react";
import { FlatList, Alert } from "react-native";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { TransactionComponent } from "../components/transactionComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import styled from "styled-components/native";
import { formatDate, addXP } from "../../../infrastructure/global";

export const TransactionsScreen = () => {
  const [trans, setTrans] = useState([]);

  const loadTransactions = async () => {
    try {
      const savedTrans = await AsyncStorage.getItem("transactions");
      //console.log("savedTrans: ", savedTrans);
      if (savedTrans && JSON.parse(savedTrans).length) {
        // setTrans to empty array before updating fixes broken styling layout of items.
        setTrans([]);
        setTrans(JSON.parse(savedTrans));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const checkXPReward = async () => {
    // get todays date. use formatted date as key to find whether it exists in storage
    // dateRward obj = key: dateReward, value: {date: Date() };
    // if (date.Now !== stored date) then setItem to todays date and add xp points.
    const today = formatDate(Date.now());

    try {
      const val = await AsyncStorage.getItem("dateReward");

      if (val !== null && val !== "") {
        if (today !== val) {
          await AsyncStorage.setItem("dateReward", today);
          addXP(0.5);
          console.log("awarded xp for dateReward");
          Alert.alert(
            "Daily Reward Earned!",
            "Return every day to earn points to level up"
          );
        }
      } else {
        await AsyncStorage.setItem("dateReward", today);
        console.log("inital set dateReward");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkXPReward();
    loadTransactions();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      loadTransactions();
      return () => {};
    }, [])
  );

  //console.log(trans);

  return (
    <SafeArea>
      <FlatList
        data={trans}
        renderItem={(item) => {
          return (
            <TransactionComponent
              item={item.item}
              setTrans={() => loadTransactions()}
            />
          );
        }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <EmptyListItem>
            Added transactions will appear here. Try and add one in the "Add"
            tab below.
          </EmptyListItem>
        }
      />
    </SafeArea>
  );
};

const EmptyListItem = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.title};
  text-align: center;
  padding-top: 50px;
`;
