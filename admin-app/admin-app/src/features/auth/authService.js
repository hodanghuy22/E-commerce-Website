import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const login = async(user) => {
    const response = await axios.post(`${base_url}user/admin-login`, user);
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

const getOrders = async(user) => {
    const response = await axios.get(`${base_url}user/get-allOrders`, config);
    
    return response.data;
}

const getOrder = async(id) => {
    const response = await axios.get(`${base_url}user/getaOrder/${id}`,config);
    
    return response.data;
}

const updateOrder = async(data) => {
    const response = await axios.put(`${base_url}user/updateOrder/${data.id}`,{status: data.status},config);
    
    return response.data;
}

const getMonthOrders = async() => {
    const response = await axios.get(`${base_url}user/getMonthWiseOrderIncome`,config);
    
    return response.data;
}

const getYearStats = async() => {
    const response = await axios.get(`${base_url}user/getyearorders`,config);
    
    return response.data;
}

const authService = {
    login,
    getOrders,
    getOrder,
    getMonthOrders,
    getYearStats,
    updateOrder
};
export default authService;
