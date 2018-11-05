const initialState = {
    user: null,
    isLogged: false,
    isAdmin: false,
    admin: null,
    hasPaid: false,
    refreshToken: null,
    trainingList: []
};
//a type to change the refresh token
const SUBMIT = 'SUBMIT';
const SUBMIT_ADMIN = 'SUBMIT_ADMIN';

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SUBMIT: {
            const user = action.payload;
            return {
                ...state,
                isLogged: true,
                user: user.user,
                refreshToken: user.refreshToken
            }
        }
        case SUBMIT_ADMIN: {
         const user = action.payload;
         return {
             ...state,
             isAdmin: true,
             admin: user
         }
        }
        default : {
            return state;
        }
    }
};

export default authReducer;