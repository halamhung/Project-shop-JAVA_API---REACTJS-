import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'http://localhost:8080/api'

export const getListProduct = createAsyncThunk("/getListProduct",async({currentPage,limit},thunkAPI)=>{
    const url = `${BASE_URL}/products?page=${currentPage}&size=${limit}`
    try {
        const response = await axios.get(url);
        const products = response.data.data.productResponses;

        const productsWithImages = await Promise.all(
            products.map(async (product) => {
                const response = await getImageID(product.productId);
                const images = URL.createObjectURL(response.data);
                return { ...product, images };
            })
        );
        
        return {
            ...response.data,
            data: {
                ...response.data.data,
                productResponses: productsWithImages,
            },
        };

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const getListProductbyCate = createAsyncThunk("/getListProductbyCate",async(categoryID,thunkAPI)=>{
    const url = `${BASE_URL}`
    try {
        const response = await axios.get(`${url}/products/category/${categoryID}`);
        const products = response.data.data;

        const productsWithImages = await Promise.all(
            products.map(async (product) => {
                console.log('product: ', product);
                const response = await getImageID(product.productId);
                const images = URL.createObjectURL(response.data);
                return { ...product, images };
            })
        );
        
        return {
            ...response.data,
            data: {
                ...response.data.data,
                data: productsWithImages,
            },
        };

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})


export const getProductByID = createAsyncThunk("getProductByID", async (id, apiThunk) => {
    const url1 = BASE_URL + `/products/${id}`
    try {
        const response = await axios.get(url1);
        return response.data
    } catch (error) {
        return apiThunk.rejectWithValue(error.response.data)
    }
})


export const getImageID = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/products/getAllImages/${id}`,{
            responseType: "blob" 
        });
        return response;
    } catch(error) {
        console.log('error: ', error);
    }
}

export const getImageID_2 = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/products/getAllImages/${id}`,{
            responseType: "blob" 
        });
        const image = URL.createObjectURL(response.data);
        return image;
    } catch(error) {
        console.log('error: ', error);
    }
}



const ListProductSlice = createSlice({
    name:"GetListProduct",
    initialState:{
        products:[],
        status: 'start',
        message:"",
        error: null,
        currentPage: 0,
        totalPage: 6,
        productDetail: [],
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getListProduct.fulfilled, (state,action)=>{
            state.status = action.payload.status;
            state.products = action.payload.data.productResponses; 
            console.log(' state.products : ',  state.products );
        })
        .addCase(getListProduct.rejected, (state,action)=>{
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.error = action.payload.error;
        })
        .addCase(getProductByID.fulfilled, (state,action)=>{
            state.status = action.payload.status;
            state.productDetail = action.payload.data; 
        })
        .addCase(getProductByID.rejected, (state,action)=>{
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.error = action.payload.error;
        })
        .addCase(getListProductbyCate.fulfilled, (state,action) => {
            state.status = action.payload.status;
            state.products = action.payload.data.data; 
            console.log(' state.products : ',  state.products );
        })
        .addCase(getListProductbyCate.rejected, (state,action)=>{
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.error = action.payload.error;
        })
    }
})
export default ListProductSlice.reducer;