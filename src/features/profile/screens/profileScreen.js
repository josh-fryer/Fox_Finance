import React, { useState, useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import { ProgressBar } from "react-native-paper";
import { SafeArea } from "../../../components/utils/safe-area.component";
import { Spacer } from "../../../components/spacer.component";
import styled from "styled-components/native";
import { getRank, getXP } from "../../../infrastructure/global";
import { useFocusEffect } from "@react-navigation/native";

const ProfileHeader = styled(View)`
  height: 25%
  background-color: white;
  border-width: 3px;
  border-style: solid;
  border-color: #b5b5b5;
`;
const RankContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const RankBG = styled.View`
  border-radius: 50px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #ffd700;
`;

const Rank = styled(Text)`
  text-align: center;
  justify-content: center;
  font-size: 50px;
  font-weight: bold;
`;
const ProgressText = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: bold;
  margin-left: 10px;
`;

// status is if in progress or completed. 1 = complete, 0 = in-progress.
const goalsArr = [
  {
    key: 1,
    status: 0,
    title: "Add your first transaction",
    xp: 2,
  },
];

export const ProfileScreen = () => {
  const [rank, setRank] = useState("1");
  const [xp, setXP] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      // use .then() to convert promise object to useable value
      getRank().then((output) => setRank(output));
      getXP().then((output) => setXP(output));
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setXP(0);
      };
    }, [])
  );

  // get goals

  return (
    <SafeArea>
      <ProfileHeader>
        <RankContainer>
          <RankBG>
            <Rank>Level: {rank}</Rank>
          </RankBG>
        </RankContainer>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ProgressText>Progress to next level:</ProgressText>
          <Spacer />
          <ProgressBar
            progress={xp}
            color={"#0df20d"}
            style={{ height: 12, backgroundColor: "grey" }}
          />
          <Spacer />
        </View>
      </ProfileHeader>
    </SafeArea>
  );
};
