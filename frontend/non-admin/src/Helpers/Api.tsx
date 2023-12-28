import axios from "axios";

class Api {
    constructor() {}

    static async get({ url, params, data }: { url: string; params?: any; data?: any }) {
        const response = await axios.get(url, {
            method: "GET",
            data: data,
            params: params,
            timeout: 1000,
            validateStatus: (status) => status >= 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    }

    static async post({ url, data }: { url: string; data: any }) {
        const response = await axios.post(url, data, {
            method: "POST",
            timeout: 1000,
            validateStatus: (status) => status >= 200,
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    }
}

export default Api;
