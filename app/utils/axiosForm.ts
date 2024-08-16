import axios from "axios";


const host = process.env.NEXT_PUBLIC_DJANGO_HOST

const axiosForm = axios.create({
    baseURL: `${host}/api/auth`,
})

export default axiosForm