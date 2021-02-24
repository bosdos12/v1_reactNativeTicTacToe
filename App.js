import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
let DeviceWidth = Dimensions.get("window").width

export default function App() {
  // creating some state data so we can edit these and rerender the page later
  // the given data is the start values
  let [curPlayer, setCurPlayer] = useState("X");
  let [gameDataArr, setGameDataArr] = useState([[0,0,0], [0,0,0], [0,0,0]]);
  let [curPlayerColor, setCurPlayerColor] = useState("red");
  let [filledBoxes, setFilledBoxes] = useState(0);


  // this function will be hit after an attempted move succeeds, 
  // it will change the user to the other user.
  const ChangePlayer = () => {
    if (curPlayer == "X") {
      setCurPlayer("O");
      setCurPlayerColor("blue");
    } else {
      setCurPlayer("X");
      setCurPlayerColor("red");
    }
  }

  // this function will check if the game has ended yet.
  const checkIfWin = () => {
    let curGameState = gameDataArr;
    let TUA = ["X", "O"];
    setFilledBoxes(filledBoxes + 1); // note: finally found that fucking bug OMG!
    for (let i = 0; i < TUA.length ; i++) {
      // checking if there is a win
      if (
        // horizontal checks
        (curGameState[0][0] == TUA[i] && curGameState[0][1] == TUA[i] && curGameState[0][2] == TUA[i]) ||
        (curGameState[1][0] == TUA[i] && curGameState[1][1] == TUA[i] && curGameState[1][2] == TUA[i]) ||
        (curGameState[2][0] == TUA[i] && curGameState[2][1] == TUA[i] && curGameState[2][2] == TUA[i]) ||
        // vertical checks
        (curGameState[0][0] == TUA[i] && curGameState[1][0] == TUA[i] && curGameState[2][0] == TUA[i]) ||
        (curGameState[0][1] == TUA[i] && curGameState[1][1] == TUA[i] && curGameState[2][1] == TUA[i]) ||
        (curGameState[0][2] == TUA[i] && curGameState[1][2] == TUA[i] && curGameState[2][2] == TUA[i]) ||
        // diagonal checks
        (curGameState[0][0] == TUA[i] && curGameState[1][1] == TUA[i] && curGameState[2][2] == TUA[i]) ||
        (curGameState[0][2] == TUA[i] && curGameState[1][1] == TUA[i] && curGameState[2][0] == TUA[i])
      ) {
        // there was a win
        Alert.alert("Congrats!", `Player [${TUA[i]}] has won the game!`);
        i += 5;
        setFilledBoxes(0);
        setCurPlayer("X");
        setCurPlayerColor("red");
        setGameDataArr([[0,0,0], [0,0,0], [0,0,0]]);
      } else {
        // if there is no win, we check if the 9 moves have been played,
        // and if all the moves have been played, we call the game a draw
        if (filledBoxes == 8) {
          Alert.alert("Draw", "Noone won the game, good luck on the next one!");
          setFilledBoxes(0);
          setCurPlayer("X");
          setCurPlayerColor("red");
          setGameDataArr([[0,0,0], [0,0,0], [0,0,0]]);
        }
      }
    }
  }

  // this function will do the move and render the changes
  const doMove = (num1, num2) => {
    // setting the received data to the game array
    let newArr = gameDataArr;
    newArr[num1][num2] = curPlayer;
    setGameDataArr([newArr[0], newArr[1], newArr[2]])
    // checking if the current game status has any "wins"
    checkIfWin();
    // changing the player
    ChangePlayer();
  }
  
  const attemptMove = (num1, num2) => {
    // checking if the value of the desired array location is empty
    if (gameDataArr[num1][num2] == 0) {
      doMove(num1, num2);
    } else {
      // alerting user that the game location is already used
      Alert.alert("Error", "The box is already filled");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tttHText}>TIC TAC TOE</Text>
      <View style={styles.AGV}>
        <View>
          <TouchableOpacity style={styles.gameInputStyles} activeOpacity={0.7} onPress={() => attemptMove(0,0)}>
            <Text style={styles.gameInputText}>{gameDataArr[0][0] != 0 ? gameDataArr[0][0] : null}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gameInputStyles} activeOpacity={0.7} onPress={() => attemptMove(1,0)}>
            <Text style={styles.gameInputText}>{gameDataArr[1][0] != 0 ? gameDataArr[1][0] : null}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gameInputStyles} activeOpacity={0.7} onPress={() => attemptMove(2,0)}>
            <Text style={styles.gameInputText}>{gameDataArr[2][0] != 0 ? gameDataArr[2][0] : null}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.gameInputStyles} activeOpacity={0.7} onPress={() => attemptMove(0,1)}>
            <Text style={styles.gameInputText}>{gameDataArr[0][1] != 0 ? gameDataArr[0][1] : null}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gameInputStyles} activeOpacity={0.7} onPress={() => attemptMove(1,1)}>
            <Text style={styles.gameInputText}>{gameDataArr[1][1] != 0 ? gameDataArr[1][1] : null}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gameInputStyles} activeOpacity={0.7} onPress={() => attemptMove(2,1)}>
            <Text style={styles.gameInputText}>{gameDataArr[2][1] != 0 ? gameDataArr[2][1] : null}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.gameInputStyles} activeOpacity={0.7} onPress={() => attemptMove(0,2)}>
            <Text style={styles.gameInputText}>{gameDataArr[0][2] != 0 ? gameDataArr[0][2] : null}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gameInputStyles} activeOpacity={0.7} onPress={() => attemptMove(1,2)}>
            <Text style={styles.gameInputText}>{gameDataArr[1][2] != 0 ? gameDataArr[1][2] : null}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gameInputStyles} activeOpacity={0.7} onPress={() => attemptMove(2,2)}>
            <Text style={styles.gameInputText}>{gameDataArr[2][2] != 0 ? gameDataArr[2][2] : null}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.WTVC}>
        <View style={{width: "80%", marginTop: 25, backgroundColor: curPlayerColor, alignItems: 'center'}}>
          <Text style={{fontSize: 35, color:"white"}}>Current Turn: {curPlayer}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50
  },
  tttHText: {
    fontSize: 35,
    marginBottom: 40
  },
  AGV: {
    width: "90%",
    height: 330,
    backgroundColor: "lightgray",
    marginBottom: 20,
    borderRadius: 15,
    borderColor: "gray",
    borderWidth: 3,
    display: "flex",
    flexDirection: 'row'
  },
  WTVC: {
    width: "92%",
    height: 120,
    backgroundColor: "lightgray",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    alignItems: 'center',
  },
  gameInputStyles: {
    width: DeviceWidth * 0.24, 
    height: DeviceWidth * 0.24, 
    marginBottom:7,
    marginLeft:14, 
    backgroundColor: '#444',
    marginTop: 7,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  gameInputText: {
    fontSize: 50,
    color: "white"
  }

});
