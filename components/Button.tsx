import * as React from 'react';

import { TouchableOpacity, StyleSheet, TextPropTypes } from 'react-native';

import { Text, TextProps } from './Themed';


type ButtonProps = {
    onTap: Function;
    title:string;
    style?:any
}

export default function Button(props: ButtonProps) {
    return( 
        <TouchableOpacity style={[styles.btn, props.style]} onPress={() =>  props.onTap()}>
            <Text style={styles.txt}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        display: 'flex',  
        maxHeight: 50,
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#f15b5d',
        padding:20,
        borderRadius:30,
        
    },

    txt: { 
        
        fontSize: 16,
        fontWeight: 'bold',
    },
})