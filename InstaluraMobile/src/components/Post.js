/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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
  TextInput
} from 'react-native';
import InputComentario from './InputComentario'
import Likes from './Likes'
import Comentario from './Comentario'

const width = Dimensions.get('screen').width;

export default class Post extends Component { 

  exibeLegenda(foto) {
    if (foto.comentario === '')
      return;

    return  <Comentario usuario={foto.loginUsuario}
    texto={foto.comentario} />
  }


  render() {

    const {foto, likeCallback, comentarioCallback} = this.props;

    return (
      <View>
        <View style={styles.header}>
          <Image source={{ uri: foto.urlPerfil }} style={styles.profilePhoto} />
          <Text>{foto.loginUsuario}</Text>
        </View>
        <Image source={{ uri: foto.urlFoto }} style={styles.photoPost} />
        <View style={styles.rodape}>
          <Likes foto={foto} likeCallback={likeCallback}/>
          {this.exibeLegenda(foto)}
          {foto.comentarios.map(comentario =>
            <Comentario key={comentario.id} 
            usuario={comentario.login} texto={comentario.texto}/>
          )}
          <InputComentario idFoto={foto.id} comentarioCallback={comentarioCallback} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    marginTop: 5
  },
  header: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  profilePhoto: {
    marginRight: 10,
    borderRadius: 20,
    width: 40,
    height: 40
  },
  photoPost: {
    width: width,
    height: width
  },
  comentario: {
    flexDirection: 'row'
  },
  rodape: {
    margin: 5
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5
  }

});