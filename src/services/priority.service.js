import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
    return http.get(`/priorities`, { headers: authHeader() });
};

const get = id => {
    return http.get(`/priorities/${id}`, { headers: authHeader() });
};

const create = data => {
    return http.post("/priorities", data, { headers: authHeader() });
};

const update = (data) => {
    return http.put(`/priorities/`, data, { headers: authHeader() });
};

const remove = id => {
    return http.delete(`/priorities/${id}`, { headers: authHeader() });
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
};