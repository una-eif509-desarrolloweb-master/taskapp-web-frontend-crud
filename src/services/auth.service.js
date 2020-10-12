import http from "../http-common";

const signup = data => {
    return http.post('/users/sign-up', data);
};

const login = data => {
    return http
        .post('/login', data)
        .then((response) => {
            console.log(response.headers.authorization);
            if (response.headers.authorization) {
                localStorage.setItem("user.headers", JSON.stringify(response.headers));
                localStorage.setItem("user.data", JSON.stringify(response.data));
            }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user.headers");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    signup,
    login,
    logout,
    getCurrentUser,
};