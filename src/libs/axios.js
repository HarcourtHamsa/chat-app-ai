import axios from 'axios'

const env = process.env.NODE_ENV

const baseURL = {
    development: "https://shielded-cliffs-15232-110fd52a9c2c.herokuapp.com/api",
}

const instance = axios.create({
    baseURL: baseURL[env]
})

export default instance