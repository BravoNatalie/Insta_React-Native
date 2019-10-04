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
  FlatList
} from 'react-native';
import Post from '../components/Post';
import AsyncStorage from '@react-native-community/async-storage';
const width = Dimensions.get('screen').width;

export default class InstaluraMobile extends Component {


  constructor() {
    super();
    this.state = {
      fotos: []
    }
  }


  like(idFoto) {

    const foto =  await this.state.fotos.find(foto => foto.id === idFoto);
    console.warn(foto)

    /* const foto = { "urlPerfil": "https://s3.amazonaws.com/caelum-online-public/react-native-parte-2/images/adittional-resources/profile-photo-rafael.jpg", "loginUsuario": "rafael", "horario": "03/10/2019 16:04", "urlFoto": "https://s3.amazonaws.com/caelum-online-public/react-native-parte-2/images/adittional-resources/photo-1.jpg", "id": 3, "likeada": false, "likers": [{'login': 'rafael'}], "comentarios": [], "comentario": "Legenda da foto" };
 */
    /* let novaLista = []
    if (!foto.likeada) {
      novaLista = foto.likers.concat({ login: 'meuUsuario' })
    } else {
      novaLista = foto.likers.filter(liker => {
        return liker.login !== 'meuUsuario'
      })
    }

    const fotoAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista
    }
    const fotos = this.state.fotos
      .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

    this.setState({ fotos: fotos })
 */


    AsyncStorage.getItem('usuario')
      .then(usuarioLogado => {
        let novaLista = []
        if (!foto.likeada) {
          novaLista = foto.likers.concat({ login: 'usuarioLogado' })
        } else {
          novaLista = foto.likers.filter(liker => {
            return liker.login !== 'usuarioLogado'
          })
        }
      })
      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          likeada: !foto.likeada,
          likers: novaLista
        }

        const fotos = this.state.fotos
          .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

        this.setState({ fotos: fotos })
      })

    const uri = `http://instalura-api.herokuapp.com/api/fotos/${idFoto}/like`;

    AsyncStorage.getItem('token')
      .then(token => {
        return {
          method: 'POST',
          headers: new Headers({
            "X-AUTH-TOKEN": token
          })
        }
      })
      .then(requestInfo => fetch(uri, requestInfo))

  }

  adicionaComentario(idFoto, valorComentario, inputComentario) {

    if (valorComentario === '')
      return;

    const foto = this.state.fotos.find(foto => foto.id === idFoto)

    const novaLista = [...foto.comentarios, {
      id: valorComentario,
      login: 'meuUsuario',
      texto: valorComentario
    }];

    const fotoAtualizada = {
      ...foto,
      comentarios: novaLista
    }

    const fotos = this.state.fotos
      .map(foto => foto.id === fotoAtualizada.id ? fotoAtualizada : foto)

    this.setState({ fotos: fotos });
    inputComentario.clear();
  }


  componentDidMount() {

    //  ou rodar o jar do instalura.jar com o comando : 
    //  $ java -jar -Dspring.datasource.password=Sonserina7 -Dspring.datasource.username=root instalura.jar
    //  e usar a url: 'http://localhost:8080/api/fotos'

    const uri = 'https://instalura-api.herokuapp.com/api/fotos';

    AsyncStorage.getItem('token')
      .then(token => {
        return {
          headers: new Headers({
            "X-AUTH-TOKEN": token
          })
        }
      })
      .then(requestInfo => fetch(uri, requestInfo))
      .then(resposta => resposta.json())
      .then(json => this.setState({ fotos: json }))
      .catch(e => {
        console.warn('Não foi possível carregar as fotos: ' + this.setState({ status: 'ERRO' }))
      })
  }

  render() {
    return (
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={this.state.fotos}
        renderItem={({ item }) =>
          <Post foto={item}
            likeCallback={this.like.bind(this)}
            comentarioCallback={this.adicionaComentario.bind(this)} />
        }
      />
    );
  }
}


const styles = StyleSheet.create({

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
  }

});