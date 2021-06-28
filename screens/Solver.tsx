import * as React from 'react';
import { StyleSheet } from 'react-native';

import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';


import Button from '../components/Button';
import { View } from '../components/Themed';

import GameBoard from '../components/GameBoard';
import Header from '../components/Header';


import { solve, interpretInput } from '../utils/logic'

import * as DocumentPicker from 'expo-document-picker';



type RootStackParamList = {
  Selection: undefined,
  Selected: { board: string[][]},
  Solved:{ board: string[][], solvedBoard:string[][], difficulty:string},
};

type SelectedRouteProp = RouteProp<RootStackParamList, 'Selected'>;
type SolvedRouteProp = RouteProp<RootStackParamList, 'Solved'>;

type SelectNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Selection'
>;
type SelectedNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Selected'
>;
type SolvedNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Solved'
>;

const Stack = createStackNavigator<RootStackParamList>();



type SelectionProps = {
  navigation: SelectNavigationProp,
};
type SelectedProps = {
  navigation: SelectedNavigationProp,
  route: SelectedRouteProp
};
type SolvedProps = {
  navigation: SolvedNavigationProp,
  route: SolvedRouteProp
};

export default function Solver() {
  return (
    <Stack.Navigator initialRouteName="Selection">
      <Stack.Screen name="Selection" component={SelectionScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Selected" component={SelectedScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Solved" component={SolvedScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function SelectionScreen({navigation}: SelectionProps) {
  return (
    <View style={styles.container}>
      <Button title="Upload Sudoku Board" onTap={()=>selectFile({navigation})} />
    </View>
  );
}
function SelectedScreen({navigation, route}:SelectedProps) {
  let { board } = route.params
  return (
    <View style={styles.container}>
      <Header hasSolveButton={true} goBack={()=>navigation.navigate("Selection")} doSolve={()=>solveBoard({navigation,route}, board)}/>
      <GameBoard board={board}/>
    </View>
  );
}

function SolvedScreen({navigation, route}:SolvedProps) {
  let { board, solvedBoard, difficulty } = route.params
  return (
    <View style={styles.container}>
      <Header goBack={()=>navigation.navigate("Selected", {board})}/>
      <Header goBack={()=>navigation.goBack()}/>
      <GameBoard board={solvedBoard} difficulty={difficulty}/>
    </View>
  );
}

const solveBoard = ({navigation}: SelectedProps, board:string[][])=>{
  try{
    let [solution, difficulty] = solve(board);
    if(solution.length!=0){
      navigation.navigate("Solved",{board:board, solvedBoard:solution, difficulty:difficulty})
    }
  }catch (err){
    if(err.code != undefined){
      alert("Error: "+err.code+" - "+err.message)
    }else{
      console.log("Unknown Error occured")
      alert(err);
    }
  }
}

const selectFile = async ({navigation}: SelectionProps) => {
  try{
    let pick = await DocumentPicker.getDocumentAsync({ type: "text/plain" });
    if (pick.type != "cancel") { // type == "cancel" when user cancels picker window
      let file = await fetch(pick.uri)
      let text = await file.text()
      var board = interpretInput(text)
      navigation.navigate("Selected",{board:board})
    }
  }catch (err){
    if(err.code != undefined){
      alert("Error: "+err.code+" - "+err.message)
    }else{
      console.log("Unknown Error occured")
      alert(err);
    }
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
