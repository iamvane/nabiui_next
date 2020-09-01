import React from 'react';
import { Routes } from '../common/constants/Routes';
import { parseCookies } from '../../utils/parseCookies';

const redirectBasedOnRole = {
  instructor(res) {
    res.writeHead(302, {
      Location: Routes.InstructorStudio,
    });
    res.end();
  },
  parent(res) {
    res.writeHead(302, {
      Location: Routes.ParentStudio,
    });
    res.end();
  },
  student(res) {
    res.writeHead(302, {
      Location: Routes.ParentStudio,
    });
    res.end();
  }
}

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
        if (permission === 'Public' && role && !hasRole) {
          redirectBasedOnRole[role](res)
        }
        if (permission === 'Private' && role && !hasRole) {
          res.writeHead(302, {
            Location: Routes.InstructorStudio,
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
    }
    return {};
  }

  render() {
    return (
      <ChildComponent {...this.props} />
    );
  }
};
