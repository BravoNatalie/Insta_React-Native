import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    FlatList,
    TouchableOpacity,
    TextInput,
    Button, 
    //AsyncStorage
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import AsyncStorage from '@react-native-community/async-storage';

const width = Dimensions.get('screen').width;

export default class Post extends Component {

    constructor() {
        super();
        this.state = {
            usuario: '',
            senha: '',
            mensagem: ''
        } 
    }  

    efetuaLogin(){
        
        const uri = "https://instalura-api.herokuapp.com/api/public/login";

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.usuario,
                senha: this.state.senha
            }),
            headers: new Headers({'Content-type':'application/json'})
        }

        fetch(uri, requestInfo)
            .then(response => {
                if(response.ok)
                    return response.text();
                throw new Error("Não foi possível fetuar login.");
            })
            .then(token => {
                AsyncStorage.setItem('token', token);
                AsyncStorage.setItem('usuario', this.state.usuario);

                /* const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Feed' })],
                  });
                  this.props.navigation.dispatch(resetAction); */
                  this.props.navigation.navigate('App');
                
            })
            .catch(e => this.setState({mensagem: e.message}))

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Instalura</Text>
                <View style={styles.forms}>
                    <TextInput style={styles.input} placeholder="Usuário..."
                        onChangeText={texto => this.setState({ usuario: texto })}
                        autoCapitalize="none"
                    />
                    <TextInput style={styles.input} placeholder="Senha..."
                        onChangeText={texto => this.setState({ senha: texto })}
                        secureTextEntry={true}
                    />
                    <Button title="Login" onPress={() => this.efetuaLogin()}/>
                </View>
                <Text style={styles.mensagem}>{this.state.mensagem}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    forms: {
        width: width * 0.8
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 26
    },
    mensagem: {
        marginTop: 15,
        color: '#e74c3c'
    }
})