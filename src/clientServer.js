import axios from "axios";

const clientServer = axios.create({
    baseURL: "https://github-backend-1-m11r.onrender.com/"
});

export default clientServer;