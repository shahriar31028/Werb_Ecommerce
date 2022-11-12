
export const loginUseridReducer= (state={},action)=>{

    switch(action.type){

        case 'USER_ID_FAILED': return {

            loading:false,
            success:false,
            error:action.payload
        }
        case 'USER_ID_SUCCESS': return {

            loading:false,
            success:true,
            currentBankUser:action.payload
        }

        case 'USER_ID_REQUEST': return {

            loading:true,
            success:false,
        }
      
        default : return state;
    }
}