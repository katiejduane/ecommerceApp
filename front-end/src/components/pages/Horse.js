import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import './Horse.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import updateCart from '../../actions/updateCart';

class Horse extends Component {
    constructor() {
        super()
        this.state = {
            horse: {}
        }
    }

    componentDidMount(){
        const hid = this.props.match.params.id
        const horseResponse = axios.get(`${window.apiHost}/horses/${hid}`);
        horseResponse.then((response) => {
            const horseData = response.data[0];
            console.log(horseData)
            this.setState({
                horse: horseData
            })
        })
    }

    componentWillReceiveProps(newProps){
        if(newProps.cart.length !== this.props.cart.length){
            //user just changed cart, onto homepage
            this.props.history.push('/?added=item')
        }
    }

    addToCart = (event)=>{
        const token = this.props.auth.token
        this.props.updateCart(token, this.state.horse.id)
    }

    render() {
        console.log(this.state.horse)
        let image = "";
        if(this.state.horse.screenshot_url){
            image = this.state.horse.screenshot_url.split(',')[0];
            image = image.replace('t_thumb', 't_cover_big')
        }
        return (
            <div className="horse-container">
                <div className="row">
                    <div className="col s12 m4">
                        <img src={image} alt="" className="horse-pic" />
                    </div>
                    <div className="col s12 m8">
                        <div className="row">
                            <h3 className="horse-title">horse TITLE</h3>
                            <div className="horse-desc">
                                <p>{this.state.horse.summary}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s1">
                                <span>Qty:</span>
                            </div>
                            <div className="col s8">
                                <input type="text" name="quantity" />
                            </div>
                            <div className="col s2">
                                <button onClick={this.addToCart}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        auth: state.auth,
        cart: state.cart
    }
}

function mapDispatchToProps(dispatcher){
    return bindActionCreators({
        updateCart: updateCart
    }, dispatcher)
};

export default connect(mapStateToProps, mapDispatchToProps)(Horse);