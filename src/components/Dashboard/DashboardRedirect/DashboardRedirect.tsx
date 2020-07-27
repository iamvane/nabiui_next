import { Routes } from '../../common/constants/Routes';
import { parseCookies } from '../../../utils/parseCookies';

function Dashboard() {
  return <div></div>
}

Dashboard.getInitialProps = async (ctx) => {
  let { res } = ctx;
  const cookies = parseCookies(ctx.req);
  const role = cookies.role;
  if (['parent', 'student'].includes(role)) {
    res.writeHead(302, {
      Location: Routes.ParentStudio,
    });
    res.end();
    return;
  }

  if (['instructor'].includes(role)) {
    res.writeHead(302, {
      Location: Routes.InstructorStudio,
    });
    res.end();
    return;
  }
  return;
}

export default Dashboard;
