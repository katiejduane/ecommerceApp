import axios from 'axios';

export default (formData) => {
    console.log("login action is running")
    console.log(formData)
    const axiosPromise = axios({
        url: `${window.apiHost}/login`,
        method: 'POST',
        data: formData
    })
    return {
        type: "LOGIN_ACTION",
        payload: axiosPromise
    }
}