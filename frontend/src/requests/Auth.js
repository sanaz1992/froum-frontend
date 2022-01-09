import Axios, {baseUrl} from "@/axios";
import axios from "axios";

export let registerRequest = (formData) => {
    return Axios.post("auth/register", formData);
};

export let loginRequest = async (formData) => {

    if (!await checkAuth()) {
        let loginReq;
        await axios.get(`${baseUrl}csrf-cookie`).then(res => {
            loginReq = Axios.post("auth/login", formData);
        });
        return loginReq;
    }
};

export let logoutRequest = () => {
    return Axios.post("auth/logout");
};

export let checkAuth = async () => {
    let isAuth = false;
    if (localStorage.getItem('isAuth') === 'true') {
        await Axios.get('auth/user').then(res => {
            isAuth = true;
            localStorage.setItem('isAuth', 'true');
        }).catch(res => isAuth = false);
    }
    localStorage.setItem('isAuth', isAuth ? 'true' : 'false');
    return isAuth;
}

export let getUserDataRequest = () => {
    return Axios.get('auth/user');
}