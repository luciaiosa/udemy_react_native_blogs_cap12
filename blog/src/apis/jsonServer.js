import axios from 'axios';


const baseUrl = "http://1f21129a.ngrok.io/";

export default axios.create({
    baseURL: baseUrl
})