import React from 'react';
import { Routes } from '../common/constants/Routes';
import { parseCookies } from '../../utils/parseCookies';

export default (ChildComponent, permission = 'Public', roles = []) => class extends React.Component<any> {
  static async getInitialProps(context) {
    let { req, res, store, pathname } = context;

    const cookies = parseCookies(context.req)
    const { user } = store.getState();
    const token = cookies.token;
    const role = cookies.role;
    let initialProps = {
      isServer: !!req,
      permission,
      roles,
      token,
      user,
      role
    };

    const isLoginPage = pathname.startsWith(Routes.Login);
    roles = roles.map((role) => role.toLowerCase());
    const hasRole = roles.includes(role);

    if (token) {
      if (permission === 'Public') {
        res.writeHead(302, {
          Location: Routes.Dashboard,
        });
        res.end();
      }
      if (permission === 'Private' && role && !hasRole) {
        res.writeHead(302, {
          Location: Routes.Dashboard,
        });
        res.end();
      }
    }


    if (!token && !isLoginPage && permission === 'Private') {
      res.writeHead(302, {
        Location: Routes.Login,
      });
      res.end();
    }
    return initialProps;
  }

  render() {
    return (
      <ChildComponent {...this.props} />
    );
  }
};
