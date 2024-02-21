import axios from "axios";


export const postAxiosApi = async (url: string, form: FormData | null) => {
    try {
        if (form === null) {
            throw new Error("FormData is null");
        }

        const server = import.meta.env.VITE_BACKEND_URL;

        const response = await axios.post(`${server}${url}`, form, {
            withCredentials: true,
        });
        return response.data;
        
    } catch (error) {
        return error;
    }
}


export const getAxiosApi = async (url: string) => {
    try {
        const server = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${server}${url}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error;
    }
};

export const getAxiosApiWithToken = async (url: string, token: string) => {
    try {
        const server = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${server}${url}`, {
            withCredentials: true,
            headers: { "Authorization": `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error;
    }
};

export const postAxiosApiWithToken = async (url: string, form: FormData | null, token: string) => {
    try {
        if (form === null) {
            throw new Error("FormData is null");
        }

        const server = import.meta.env.VITE_BACKEND_URL;

        const response = await axios.post(`${server}${url}`, form, {
            withCredentials: true,
            headers: { "Authorization": `Bearer ${token}` },
        });
        return response.data;
        
    } catch (error) {
        return error;
    }
}
