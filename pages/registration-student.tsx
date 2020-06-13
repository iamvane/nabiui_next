import Registration from '../src/components/Auth/Registration/Registration';
import { Role } from '../src/constants/Roles';

const RegistrationPage = (props) => {
  return (
    <Registration role={Role.student} { ...props} />
  )
}

export default RegistrationPage;
