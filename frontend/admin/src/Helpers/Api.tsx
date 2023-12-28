import axios from "axios";
class Api {
    constructor() {}

    static async get({ url, params }: { url: string; params?: any }) {
        const response = await axios(url, {
            params: params,
            timeout: 1000,
            method: "GET",
            validateStatus: (status) => status >= 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response?.data;
    }
    static async post({ url, data, contentType = "application/json" }: { url: string; data: any; contentType?: string }) {
        const response = await axios(url, {
            data: data,
            timeout: 1000,
            method: "POST",
            validateStatus: (status) => status >= 200,
            headers: {
                "Content-Type": contentType
            }
        });
        return response.data;
    }
}

export default Api;
