import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
2;
import { TransactionComponent } from "../components/transactionComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export const TransactionsScreen = (refresh) => {
  const [trans, setTrans] = useState([]);

  const loadTransactions = async () => {
    try {
      const savedTrans = await AsyncStorage.getItem("transactions");

      if (savedTrans && JSON.parse(savedTrans).length) {
        //console.log("savedTrans: ", savedTrans);
        // setTrans to empty array before updating fixes broken styling layout of items.
        setTrans([]);
        setTrans(JSON.parse(savedTrans));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      loadTransactions();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return (
    <SafeArea>
      <FlatList
        data={trans}
        extraData={trans}
        renderItem={(item) => {
          //console.log("item = ", item.item.id);
          return (
            <Spacer position="bottom" size="large">
              <TransactionComponent item={item.item} />
            </Spacer>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </SafeArea>
  );
};
