import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import BrowserRouter from "react-router-dom/es/BrowserRouter";
import { PersistGate } from 'redux-persist/lib/integration/react';
import  store, { persistor } from './redux/configStore';


ReactDOM.render(<CookiesProvider>
                   <PersistGate persistor={persistor}>
                    <BrowserRouter>
                       <Provider store={store}>
                                <App />
                       </Provider>
                   </BrowserRouter>
                   </PersistGate>
                </CookiesProvider>,
                document.getElementById('root'));

registerServiceWorker();
