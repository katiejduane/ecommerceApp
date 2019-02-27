// an action is a JS function that returns an object
// this object MUST have a type property
import axios from 'axios';

export default(formData)=>{
    console.log("auth action is running")
    console.log(formData)
    const axiosPromise = axios({
        url: `${window.apiHost}/register`,
        method: 'POST',
        data: formData
    })
    return{
        type: "AUTH_ACTION",
        payload: axiosPromise
    }
}