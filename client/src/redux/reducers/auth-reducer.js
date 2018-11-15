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
const LOGOUT = 'LOGOUT';
const ADMIN_LOGOUT = 'ADMIN_LOGOUT';

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
        case ADMIN_LOGOUT: {
            return {
                ...state,
                admin: null,
                isAdmin: false
            }
        }
        case LOGOUT: {
            return {
                ...state,
                user: null,
                refreshToken: null,
                isLogged: false
            }
        }
        default : {
            return state;
        }
    }
};

export default authReducer;