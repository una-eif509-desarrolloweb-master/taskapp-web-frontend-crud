import http from "../http-common";

const signup = data => {
    return http.post("/users/sign-up", data);
};

export default {
    signup,
};