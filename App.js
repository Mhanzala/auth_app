import React, { Component } from "react";
import { View } from "react-native";
// import the firebase third party lib
import firebase from "firebase";
// Custom Components to be used in the app
import {CustomButton,Header, Card, CardSection,Spinner} from "./src/Component/Common/Index"

// Import our LoginForm component to be displayed on the screen
import LoginForm from "./src/Component/LoginForm";

class App extends Component {
  state = { loggedIn: null };
  // Life cycle method to init the firebase
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyALzjmEDI7XkxoSW5qv1Bd-NSTvSTHMHeM",
      authDomain: "afmid-auth-class.firebaseapp.com",
      databaseURL: "https://afmid-auth-class.firebaseio.com",
      projectId: "afmid-auth-class",
      storageBucket: "afmid-auth-class.appspot.com",
      messagingSenderId: "1052972427030"
  
    });

    //Handle the Application when it's logged in or logged out
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <CustomButton onPress={() => firebase.auth().signOut()}>
                Logout
              </CustomButton>
            </CardSection>
          </Card>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }
  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
        {/* 
        Before the renderContent Handling
        <LoginForm /> */}
      </View>
    );
  }
}

export default App;
