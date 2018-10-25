import React from 'react';

import MainNoUser from '../view-components/main-page/main-no-user-logged';
import MainUserLogged from '../view-components/main-page/main-user-logged';
import LoginSignup from '../container-components/login-signup-page/login-signup';
import AboutComponent from '../view-components/about-view/about-view-component';
import AdminView from '../admin-tool/admin-view';
import ProtectedRoute from "./protected-route";
import TrainingView from "../view-components/training-view/training-view";
import TrainingForm from '../container-components/training-container/training-form';
import TrainingPage from '../view-components/training-view/training-page';
import VideoView from './../view-components/video-view/video';
import ErrorPage from '../view-components/error-view/error-page';

const routes = [
    {
        path: '/notlogged',
        component: MainNoUser,
        exact: true,
        name: 'notlogged'
    },
    {
        path: '/login',
        component: LoginSignup,
        exact: true,
        name: 'login'
    },
    {
        path: '/signup',
        component: LoginSignup,
        exact: true,
        name: 'singup'
    },
    {
        path: '/logged',
        component: MainUserLogged,
        exact: true,
        name: 'logged',
        protected: true
    },
    {
        path: '/about',
        component: AboutComponent,
        exact: true,
        name: 'about'
    },
    {
        path: '/admin',
        component: AdminView,
        exact: true,
        name: 'admin-main'
    },
    {
        path: '/admin/training' || '/training',
        component: TrainingView,
        exact: true,
        name: 'training-list'
    },
    {
      path: '/new-training',
      component: TrainingForm,
      exact: true,
      name: 'new-training'
    },
    {
      path: '/training-page/:id',
      component: TrainingPage,
      exact: true,
      name: 'training-page' + Math.floor(Math.random() * 1000)
    },
    {
      path: '/video/:id',
      component: VideoView,
      exact: true,
      name: 'video-view' + Math.floor(Math.random() * 1000)
    },
    {
        path: '/error',
        component: ErrorPage,
        exact: true,
        name: 'error-page'
    }
];

routes.forEach(route => {
    if(route.protected){
        const component = route.component;
        route.render = () => (
            React.createElement(ProtectedRoute, {Component: component}, null )
        );
        delete route.component;
    }
});

export default routes;