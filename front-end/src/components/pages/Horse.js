import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import './Horse.css';

class Horse extends Component {
    constructor() {
        super()
        this.state = {
            horse: {}

        }
    }

    componentDidMount(){
        console.log(this.props.match.params.id);
        const hid = this.props.match.params.id
        const horseResponse = axios.get(`${window.apiHost}/horses/${hid}`);
        console.log(horseResponse)
        horseResponse.then((response) => {
            const horseData = response.data[0];
            console.log(horseData)
            this.setState({
                horse: horseData
            })
        })
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
                                <button>ADD</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Horse;