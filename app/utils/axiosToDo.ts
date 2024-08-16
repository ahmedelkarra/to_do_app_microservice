import axios from "axios";


const host = process.env.NEXT_PUBLIC_EXPRESS_HOST

const axiosToDo = axios.create({
    baseURL: `${host}/api`,
})

export default axiosToDo