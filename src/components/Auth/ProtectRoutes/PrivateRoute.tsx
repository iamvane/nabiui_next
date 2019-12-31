import React from 'react';
import Router from 'next/router';
import ServerCookie from 'next-cookies';
import { Routes } from '../../common/constants/Routes';


export default (ChildComponent, permission = 'Public', roles = []) => class extends React.Component<any> {
    static async getInitialProps(context) {
        let { req, res, store, pathname } = context;
        const {
            user
        } = store.getState();
        const token = ServerCookie(context)['currentUser'];
        let initialProps = {
            isServer: !!req,
            permission,
            roles,
            token,
            user
        };
        const isLoginPage = pathname.startsWith(Routes.Login);
        const isDashboardPage = pathname.startsWith(Routes.Dashboard);

        if (!token && !isLoginPage) {
            res.writeHead(302, {
                Location: Routes.Login,
            });
            res.end();
        }

        if (token && !isDashboardPage) {
            res.writeHead(302, {
                Location: Routes.Dashboard,
            });
            res.end();
        }

        return initialProps;
    }

    render() {
        let {
            roles,
            user: {
                role
            }
        } = this.props;
        roles = roles.map((role) => role.toLowerCase());
        const hasRole = roles.includes(role);

        if (role && !hasRole) {
            Router.push(Routes.Dashboard);
            return null;
        }
        return (
            <ChildComponent {...this.props} />
        );
    }
};