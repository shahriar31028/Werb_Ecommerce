import axios from 'axios';
export const getAllProducts=()=>async dispatch=>{

        dispatch({type:'GET_All_REQ'})

        try {
            const response = await axios.get('/storeAPI/products/getAllProducts')
            
            dispatch({type:'GET_All_SUCCESS', payload: response.data})

        } catch (error) {
            dispatch({type:'GET_All_FAILED' , payload:error})
        }

}
export const addNewProducts=(product)=>async dispatch=>{

    dispatch({type:'CREATE_NEWPROD_REQ'})

    try {
        const response = await axios.post('/storeAPI/products/addNewProduct',product)
       
        dispatch({type:'CREATE_NEWPROD_SUCCESS', payload: response.data})

    } catch (error) {
        dispatch({type:'CREATE_NEWPROD_FAILED' , payload:error})
    }

}