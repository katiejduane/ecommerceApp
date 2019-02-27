import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import authAction from '../../actions/authAction';
import { connect } from 'react-redux';

class Register extends Component {
    constructor(){
        super()
    }

    componentWillReceiveProps(newProps){
        console.log(newProps)
        if(newProps.auth.msg === 'userExists'){

        }
    }
    
    registerSubmit = (event) => {
        event.preventDefault();
        // console.dir(event.target);
        const username = event.target[0].value;
        // alternate syntax:
        // const username = document.getElementById('email').value;
        const password = event.target[1].value;
        // console.log(username);
        // console.log(password);
        this.props.authAction({
            username, password
        })
    }

    render() {
        return (
            <main>
                <center>
                    <div className="container">
                        <div className="z-depth-1 grey lighten-4 row login">
                            <form className="col s12" onSubmit={this.registerSubmit}>
                                <div className='row'>
                                    <div className='col s12'>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input className='validate' type='email' name='email' id='email' />
                                        <label htmlFor='email'>Enter your email</label>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input className='validate' type='password' name='password' id='password' />
                                        <label htmlFor='password'>Enter your password</label>
                                    </div>
                                    <label>
                                        <a className='pink-text' href='#!'><b>Forgot Password?</b></a>
                                    </label>
                                </div>
                                <br />
                                <center>
                                    <div className='row'>
                                        <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Register</button>
                                    </div>
                                </center>
                            </form>
                        </div>
                    </div>
                    <Link to="/register">Create account</Link>
                </center>
                <div className="section"></div>
                <div className="section"></div>
            </main>
        )
    }
}

function mapStateToProps(state){
    // state = rootReducer/store
    return {
        // key = this.props.KEY will be accessible to this component
        // value = property of rootReducer!
        auth: state.auth
    }
}

function mapDispatchToProps(dispatcher){
    // dispatch is the thing that send the action to all the reducers
    return bindActionCreators({
        authAction: authAction
    }, dispatcher)
    
}

// export default Register; 
export default connect(mapStateToProps, mapDispatchToProps)(Register)