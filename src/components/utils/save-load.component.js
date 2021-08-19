import AsyncStorage from "@react-native-async-storage/async-storage";

export const addTransaction = async (description, date, amount, type) => {
  var parsed = [];
  try {
    const savedTrans = await AsyncStorage.getItem("transactions");

    if (savedTrans && JSON.parse(savedTrans).length) {
      var parsed = JSON.parse(savedTrans);
    }
  } catch (e) {
    console.log(e);
  }

  // default id is nextID = 1
  let nextID = "1";
  //console.log("nextID = ", nextID);
  //console.log("parsed = " + parsed);
  if (parsed.length >= 1) {
    nextID = (parsed.length + 1).toString();
  }

  let newTrans = { id: nextID, description, date, amount, type };
  parsed.unshift(newTrans);
  //console.log("transactions array after add: ", parsed);
  saveTransaction(parsed);
};

const saveTransaction = async (data) => {
  try {
    await AsyncStorage.setItem("transactions", JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

export const deleteTransaction = async (id) => {
  try {
    // 1. get transactions list to object array.
    // 2. find transaction.
    // 3. remove from array.
    // 4. save new array.
    const savedTrans = await AsyncStorage.getItem("transactions");

    if (savedTrans && JSON.parse(savedTrans).length) {
      let parsedArr = JSON.parse(savedTrans);
      // Filter array where id is not equal to requested id.

      parsedArr = parsedArr.filter((item) => item.id !== id);
      console.log("arr after filter = ", parsedArr);
      await saveTransaction(parsedArr);
    }
  } catch (e) {
    console.log(e);
  }
};
