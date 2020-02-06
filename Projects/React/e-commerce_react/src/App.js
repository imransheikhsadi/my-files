import React, { Component } from 'react'
import './App.css';
import { Route, Switch,Redirect } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage.component';
import ShopPage from './pages/shop/ShopPage.component';
import Header from './components/header/Header.component';
import { LoginPage } from './pages/login/LoginPage.component';
import { auth,createUserProfileDocument } from './firebasse/firebase.utils'
import { connect } from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import CheckoutPage from './pages/checkout/CheckoutPage.component';


class App extends Component {

  unsubscribeFromAuth = null

  componentDidMount(){
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot=>{
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      }else{
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }
  
  render() {
    return (
      <div className="app-container">
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/login' render={()=>this.props.currentUser ? (<Redirect to="/"/>):(<LoginPage/>)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
