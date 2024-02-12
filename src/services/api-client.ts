import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: 'b03d4095aab24c37b46910a3842dda61'
    }
})