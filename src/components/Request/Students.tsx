import * as React from 'react';

import {
  Button,
  FormControl,
  Grid,
  Icon,
  Input,
  Select,
  TextField,
  Typography
} from '@material-ui/core';

import SectionTitle from '../common/SectionTitle';
import { skillLevelOptions } from '../Instruments/constants';
// import { InstrumentsType } from '../Instruments/model';
import { StudentType } from './models';
import { RequestFormComponent } from './constants';
import StudentAdded from './StudentAdded';

interface Props extends  StudentType {
  students: StudentType[];
  handleChange: (event: React.FormEvent<{}>) => void;
  handleBlur: (event: React.FormEvent<{}>) => void;
  addStudent: (event: React.FormEvent<{}>) => void;
  deleteStudent: (student: string) => void;
}

const Students: React.StatelessComponent<Props> = props => {
  const selectedStudents = props.students.map((student, i) => (
    <StudentAdded
      key={i}
      name={student.name}
      age={student.age}
      skillLevel={student.skillLevel}
      deleteStudent={(studentName: string) => props.deleteStudent(studentName)}
    />
  ));

  const skillLevelItems: any = [];
  for (const [key, value] of Object.entries(skillLevelOptions)) {
    skillLevelItems.push(<option key={key} value={value.value}>{value.label}</option>);
  }

  return (
    <div>
      <SectionTitle text={RequestFormComponent.studentTitle} />

      {selectedStudents}

      <Grid item={true} md={7}>
        <Typography className="nabi-margin-top-xsmall">
          {RequestFormComponent.studentDescription}
        </Typography>
      </Grid>

      <Grid spacing={8} container={true}>
        <Grid item={true} md={3} xs={12}>
          <TextField
            id={RequestFormComponent.Ids.StudentName}
            name={RequestFormComponent.FieldNames.StudentName}
            placeholder={RequestFormComponent.Placeholders.StudentName}
            required={true}
            fullWidth={true}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.name}
          />
        </Grid>

        <Grid item={true} md={3} xs={7}>
          <TextField
            id={RequestFormComponent.Ids.StudentAge}
            name={RequestFormComponent.FieldNames.StudentAge}
            placeholder={RequestFormComponent.Placeholders.StudentAge}
            required={true}
            fullWidth={true}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            type="number"
            value={!(props.age === 0) ? props.age : ''}
          />
        </Grid>

        <Grid item={true} md={3} xs={7}>
          <FormControl fullWidth={true}>
            <Select
              native={true}
              input={
                <Input
                  id={RequestFormComponent.Ids.SkillLevel}
                  name={RequestFormComponent.FieldNames.SkillLevel}
                />}
              value={props.skillLevel}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
            >
            <option value="" disabled={true}>{RequestFormComponent.Placeholders.SkillLevel}</option>
            {skillLevelItems}
            </Select>
          </FormControl>
        </Grid>

        <Grid item={true} md={3} xs={10}>
          <Button
            color="primary"
            variant="contained"
            className="nabi-text-uppercase nabi-margin-top-xsmall"
            onClick={props.addStudent}
          >
            <Icon>add</Icon>
            {RequestFormComponent.addStudent}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Students;
