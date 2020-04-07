import React from 'react';
import { Routes } from '../common/constants/Routes';
import { parseCookies } from '../../utils/parseCookies';

export default (ChildComponent, permission = 'Public', roles = [], custom?) => class extends React.Component<any> {
  static async getInitialProps(context) {
    let { res, pathname } = context;

    const cookies = parseCookies(context.req)
    const token = cookies.token;
    const role = cookies.role;

    const isLoginPage = pathname.startsWith(Routes.Login);
    roles = roles.map((role) => role.toLowerCase());
    const hasRole = roles.includes(role);

    if (res) {
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
        if (custom === 'Request View') {
          res.writeHead(302, {
            Location: Routes.Requests,
          });
          res.end();
        }
        res.writeHead(302, {
          Location: Routes.Login,
        });
        res.end();
      }
    }
    return {};
  }

  render() {
    return (
      <ChildComponent {...this.props} />
    );
  }
};
