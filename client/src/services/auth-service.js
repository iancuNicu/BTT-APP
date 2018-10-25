import store from '../redux/configStore';

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
    }

};

export default AuthService