import React from 'react';

import MainNoUser from '../view-components/main-page/main-no-user-logged';
import MainUserLogged from '../view-components/main-page/main-user-logged';
import LoginSignup from '../container-components/login-signup-page/login-signup';
import AdminView from '../admin-tool/admin-view';
import ProtectedRoute from "./protected-route";
import TrainingView from "../view-components/training-view/training-view";
import TrainingForm from '../container-components/training-container/training-form';
import TrainingPage from '../view-components/training-view/training-page';
import VideoView from './../view-components/video-view/video';
import OfferList from './../container-components/offers-container/offers-list';
import CalculatorComponent from './../container-components/calculator-container/calculator-component';
import OddsList from '../view-components/oddsmatcher-view/oddsmatcher-list';
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
        path: '/',
        component: MainUserLogged,
        exact: false,
        name: 'logged',
        protected: true
    },
    {
        path: '/admin',
        component: AdminView,
        exact: false,
        name: 'admin-main'
    },
    {
        path: '/admin/training',
        component: TrainingView,
        exact: true,
        name: 'training-admin-view',
        protected: true
    },
    {
        path: '/training',
        component: TrainingView,
        exact: true,
        name: 'training-user-view',
        protected: true
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
      name: 'training-page' + Math.floor(Math.random() * 1000),
      protected: true
    },
    {
        path: '/offers',
        component: OfferList,
        exact: true,
        name: 'offers-list',
        protected: true
    },
    {
      path: '/calculator',
      component: CalculatorComponent,
      exact:true,
      name: 'calculator',
      protected: true
    },
    {
      path: '/video/:id',
      component: VideoView,
      exact: true,
      name: 'video-view' + Math.floor(Math.random() * 1000)
    },
    {
      path: '/odds-list',
      component: OddsList,
      exact:true,
      name: 'odds-list',
      protected: true
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
            React.createElement(ProtectedRoute, {Component: component, ...route}, null )
        );
        delete route.component;
    }
});

export default routes;