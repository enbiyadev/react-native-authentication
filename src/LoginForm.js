import React, { Component } from "react";
import { Alert, TextInput } from "react-native";
import firebase from "firebase";
//
import Button from "./common/Button";
import Card from "./common/Card";
import CardSection from "./common/CardSection";
import Spinner from "./common/Spinner";

class LoginFrom extends Component {
  state = { email: "", password: "", loading: false }

  clickLogin() {
    this.setState({ loading: true });

    const { email, password } = this.state;

    if( email === "" || password === "" ) {
      this.setState({ loading: false });
      
      Alert.alert(
        "Mesaj",
        "Her iki alanda dolu olmalı!",
        [
          { text: "Tamam", onPress: () => null }
        ]
      );
    } else {
      firebase.auth().signInWithEmailAndPassword( email, password )
      .then( this.loginSuccess.bind(this) )
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword( email, password )
        .then( this.loginSuccess.bind(this) )
        .catch( this.loginFail.bind(this) );
      });
    }
  }

  loginSuccess() {
    console.log("Success");

    this.setState({ loading: false });
  }

  loginFail() {
    console.log("Fail");

    this.setState({ loading: false });

    Alert.alert(
      "Mesaj",
      "Kullanıcı adı veya şifre hatalı!",
      [
        { text: "Tamam", onPress: () => null }
      ]
    );
  }

  renderButton() {
    if ( !this.state.loading ){
      return <Button onPress={ this.clickLogin.bind(this) }>GİRİŞ</Button>
    }

    return <Spinner size="small" />;
  }

  render() {
    const { inputStyle } = styles;

    return (
      <Card>
        <CardSection>
          <TextInput 
            placeholder="E-mail"
            style={ inputStyle }
            value={ this.state.email }
            onChangeText={ email => this.setState({ email }) }
          />
        </CardSection>

        <CardSection>
          <TextInput 
            secureTextEntry
            placeholder="Şifre"
            style={ inputStyle }
            value={ this.state.password }
            onChangeText={ password => this.setState({ password }) }
          />
        </CardSection>

        <CardSection>
          { this.renderButton() }
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  }
}

export default LoginFrom;