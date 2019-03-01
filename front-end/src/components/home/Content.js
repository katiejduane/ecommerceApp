import React, { Component } from 'react';
import axios from 'axios';
import HorseCard from '../utility/HorseCard';

class Content extends Component {
    constructor(){
        super()
        this.state = {
            horses: []
        }
    }

    componentDidMount(){
        const horsesPromise = axios.get(`${window.apiHost}/horses/getHome`);
        horsesPromise.then((response)=>{
            const horses = response.data;
            this.setState({
                horses:horses
            })
        })
    }

    render(){
        const horseCards = this.state.horses.map((horse, i)=> {
            return (<HorseCard data={horse} key={i}/>)
        })
        return (
            <div className="row">
                <div className="col s12">
                    {horseCards}
                </div>
            </div>
        ) 
    }    
}

export default Content;