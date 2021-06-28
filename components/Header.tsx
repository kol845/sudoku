import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Text, View } from '../components/Themed';

import Button from "./Button"

type HeaderProps = {
    goBack:Function,
    hasSolveButton?:boolean
    doSolve?:Function,
}

export default function Header(props: HeaderProps) {
    return( 
        <View style={styles.headerContainer} >
            <TouchableOpacity style={{marginRight: 'auto'}} onPress={() =>  props.goBack()}>
                    <Icon name="chevron-left" size={42} color="#fff" />
            </TouchableOpacity>
            
            {
                props.hasSolveButton &&
                <View>
                    <Button onTap={()=>{props.doSolve!=undefined ?props.doSolve():{}}} title="Solve"/>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: { 
        flexDirection:"row",
        alignItems:"center",
        position: 'absolute',
        top:100,
        width:"80%",
    },

})