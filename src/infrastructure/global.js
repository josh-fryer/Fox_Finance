import AsyncStorage from "@react-native-async-storage/async-storage";
// const transactionsGoalCheck = (total) => {
//     const getTRansactionsGoals = () => {

//     };
// };

// export const addToTransactionsCount = async (val) => {
//   let current = await getTransactionsCount();
//   let total = current + val;

//   try {
//     await AsyncStorage.setItem("transactionsCount", total);
//     transactionsGoalCheck(total);
//   } catch (e) {
//     console.log(e);
//   }
// };

export const getTransactionsCount = async () => {
  try {
    const val = await AsyncStorage.getItem("transactionsCount");

    if (val !== null) {
      return val;
    } else {
      return 0;
    }
  } catch (e) {
    console.log(e);
  }
};

export const getRank = async () => {
  try {
    const val = await AsyncStorage.getItem("userRank");

    if (val !== null) {
      const result = val;
      return result;
    } else {
      return "1";
    }
  } catch (e) {
    console.log("getRank error: ", e);
  }
};

export const setRank = async (val) => {
  try {
    await AsyncStorage.setItem("userRank", val.toString());
  } catch (e) {
    console.log(e);
  }
};

const nextRank = async (val) => {
  //console.log("nextRank getRank = ", await getRank());
  // # Await converts promise to useable var.
  const rank = await getRank();
  const newRank = parseInt(rank, 10) + val;
  console.log("newRank is " + newRank);
  setRank(newRank);
};

export const addXP = async (val) => {
  let userXP = await getXP(); // get float
  let newXPTotal = userXP + val;

  // reached next level
  if (newXPTotal >= 1) {
    await nextRank(Math.floor(newXPTotal));
    setXP(0); // reset XP to 0
  } else {
    setXP(newXPTotal);
  }
};

export const setXP = async (val) => {
  try {
    await AsyncStorage.setItem("XPCount", val.toString());
  } catch (e) {
    console.log(e);
  }
};

export const getXP = async () => {
  try {
    // 0 - 1 float
    const val = await AsyncStorage.getItem("XPCount");

    if (val !== null) {
      return parseFloat(val);
    } else {
      return 0;
    }
  } catch (e) {
    console.log(e);
  }
};

export const formatDate = (date) => {
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
};
