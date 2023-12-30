import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getBlogCategories = async(user) => {
    const response = await axios.get(`${base_url}blogCategory/`);
    
    return response.data;
}

const createCategory = async (blogCategory) => {
    const response = await axios.post(`${base_url}blogCategory`, blogCategory, config);
  
    return response.data;
};

const updateCategory = async (blogCategory) => {
    const response = await axios.put(`${base_url}blogCategory/${blogCategory.id}`, {title: blogCategory.blogCategoryData.title}, config);
  
    return response.data;
};

const getCategory = async (id) => {
    const response = await axios.get(`${base_url}blogCategory/${id}`, config);
  
    return response.data;
};

const deleteCategory = async (id) => {
    const response = await axios.delete(`${base_url}blogCategory/${id}`, config);
  
    return response.data;
};


const bcategoryService = {
    getBlogCategories,
    createCategory,
    updateCategory,
    getCategory,
    deleteCategory
};
export default bcategoryService;