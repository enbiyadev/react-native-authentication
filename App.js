import React, { Component } from "react";
import { AppRegistry, Text, View } from "react-native";
import firebase from "firebase";
//
import Header from "./src/common/Header";
import LoginForm from "./src/LoginForm";
import Button from "./src/common/Button";
import CardSection from "./src/common/CardSection";
import Spinner from "./src/common/Spinner";


export default class App extends Component<{}> {
  state = { loggedIn: null }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBwbryj86lXKviHcXPWcBQh5Y4x3T6gS-I',
      authDomain: 'kimlikdogrulama-9bd6d.firebaseapp.com',
      databaseURL: 'https://kimlikdogrulama-9bd6d.firebaseio.com',
      projectId: 'kimlikdogrulama-9bd6d',
      storageBucket: 'kimlikdogrulama-9bd6d.appspot.com',
      messagingSenderId: '854701135159'
    });

    firebase.auth().onAuthStateChanged(( user ) => {
      if( user ) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });    
  }

  clickLogout() {
    firebase.auth().signOut();
  }

  renderContent() {
    switch ( this.state.loggedIn ) {
      case true:
        return(
          <CardSection>
            <Button onPress={ this.clickLogout.bind(this) }>ÇIKIŞ</Button>
          </CardSection>
        );

      case false:
        return(
          <LoginForm />
        );

      default:
        return(
          <View style={{ marginTop: 20 }}>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Giriş Ekranı" />
        { this.renderContent() }
      </View>
    );
  }
}


AppRegistry.registerComponent("kimlik_dogrulama", () => App);