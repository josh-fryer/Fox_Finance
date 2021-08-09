import { SafeAreaView, StatusBar } from "react-native";
import styled from "styled-components/native";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  /* if there is statusbar height then return this or returns no value */
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;
