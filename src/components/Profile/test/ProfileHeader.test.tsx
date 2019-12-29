import * as React from 'react';

import { shallow } from 'enzyme';
import ProfileHeader from 'components/Profile/ProfileHeader';
import { Role } from 'components/common/constants/Registration';
import { UserType } from 'redux/models/UserModel';
import { SkillLevel } from 'components/Instruments/constants';
import { accountInfo } from 'components/AccountInfo/test/mockData';

const rates = {
    mins30: 30,
    mins45: 33,
    mins60: 44,
    mins90: 88,
  };

describe('ProfileHeader', () => {
  let wrapper: any;
  const mockFunction = jest.fn();

  describe('Shallow', () => {

    const mockUser: UserType = {
      ...accountInfo,
      id: 'fooId',
      firstName: 'foo',
      lastName: 'bar',
      email: 'oreo',
      password: '',
      zipCode: '',
      role: Role.instructor,
      displayName: ''
    };

    beforeEach(() => {
      wrapper = shallow(
        <ProfileHeader
          bioTitle="fun and experienced piano teacher"
          displayName="Vanessa"
          user={mockUser}
          avatarImage=""
          reviews={30}
          handleSave={mockFunction}
          showRatesForm={false}
          toggleRatesForm={mockFunction}
          experience={2}
          toggleBioTitleForm={mockFunction}
          handleChange={mockFunction}
          backgroundCheck={false}
          changeAvatar={mockFunction}
          favorite={false}
          showInstrumentsForm={false}
          instrument=""
          skillLevel={SkillLevel.beginner}
          addInstrument={mockFunction}
          deleteInstrument={mockFunction}
          cancelNameEdition={mockFunction}
          toggleInstrumentsForm={mockFunction}
          rates={rates}
          memberSince={2017}
          lessonsTaught={2}
          age={27}
          instruments={[]}
        />
      );
    });

    it('Matches snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
