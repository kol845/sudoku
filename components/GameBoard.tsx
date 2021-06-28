import * as React from 'react';

import { StyleSheet } from 'react-native';

import { Text } from './Themed';

import { View } from 'react-native';
import { MonoText } from './StyledText'

import colors from '../constants/Colors'

type GameBoardProps = {
    board:string[][],
    difficulty?:string,
}

export default function GameBoard(props:GameBoardProps) {
    let {board, difficulty} = props
    return( 
        <View style={styles.boardContainer}>
            {difficulty &&
                <Text>Difficulty: {difficulty}</Text>
            }
            { board.map((row, rId) => (
                <View key={rId} style={styles.row}>
                    { 
                    row.map((square, cId) => (
                        
                        <Square
                            key={rId+cId}
                            value={square}
                            style={[
                                (isEven(cId+1) ? styles.horizontalEven:{}),
                                (isEven(rId+1) ? styles.verticalEven:{}),
                                (cId==0 ? styles.leftSquare:{}),
                                (rId==0 ? styles.topSquare:{}),
                            ]}
                        />
                        
                    )) }
                </View>
            )) }
        </View>
    )
}

type SquareProps = {
    value:string,
    style:any,
}

function Square( props:SquareProps ) {
    return( 
        <View style={[styles.square, props.style]}>
            <MonoText style={styles.squareText}>{props.value}</MonoText>
        </View>
    )
}

const isEven = (n:number):boolean =>{
    return n % 3 == 0;
}

const styles = StyleSheet.create({
    boardContainer:{
        height:"40%",
        width:"80%",
    },

    squareText:{
        fontSize: 16,
        textAlign: "center",
        height:"100%",
    },
    square: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal:10,
        borderWidth:1,
        borderStyle:"solid",
        borderColor:colors.pallet.Plum[500],
        backgroundColor:colors.pallet.Gray[300],
    },
    row: {
        flex: 1,
        textAlign: 'center',
        flexDirection:"row",
    },

    horizontalEven: {
      borderRightWidth:10,
    },
    verticalEven: {
        borderBottomWidth:10,
    },
    topSquare:{
        borderTopWidth:10,
    },
    leftSquare:{
        borderLeftWidth:10,
    }
  });
  