import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';


export default class Likes extends Component {
    
    exibeLikes(likers) {
       
        if (likers.length <= 0)
            return;

        return (
            <Text style={styles.likes}>
                {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>
        );

    }

    carregaIcone(likeada) {
        return likeada ? require('../../resources/img/s2-checked.png') :
            require('../../resources/img/s2.png')
    }

    render() {

        const { foto, likeCallback } = this.props;

        return (
            <View>
                <TouchableOpacity onPress={() => { likeCallback(foto.id) }}>
                    <Image style={styles.buttonLike}
                        source={this.carregaIcone(foto.likeada)} />
                </TouchableOpacity>
                {this.exibeLikes(foto.likers)}
            </View>
        );
    }
}


const styles = StyleSheet.create({

    buttonLike: {
        width: 30,
        height: 30,
    },

    likes: {
        fontWeight: 'bold'
    }
});