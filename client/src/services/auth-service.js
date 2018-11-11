import store from '../redux/configStore';
import axios from 'axios';
const tokenUrl = 'http://localhost:5000/api/token';

const AuthService  = {

    isLogged : function() {
        return store.getState().isLogged && store.getState().user != null;
    },

    isAdminLogged: function() {
        return store.getState().isAdmin && store.getState().admin != null;
    },

    getPermissions: function() {
        return {
          isAdmin: store.getState().isAdmin,
          isLogged: store.getState().isLogged
        };
    },

    checkToken: async function(header) {
        let res = await axios({
            method: 'post',
            url: tokenUrl,
            data: {
                _id: store.getState().user._id,
                refreshToken: store.getState().refreshToken
            },
            credentials: 'include',
            headers: header
        });
        if (res instanceof Error) {
            return Promise.reject(res);
        }
        else return Promise.resolve(res);
    }

};

export default AuthService