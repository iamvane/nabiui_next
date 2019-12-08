import { UserType } from '../../types/user';
import { Role } from '../../constants/Roles';

export const setProfile = (user: UserType) => {
    let profile;
    if (user.role === Role.instructor) {
        return profile = {
            bioTitle: user.bioTitle,
            bioDescription: user.bioDescription,
            music: user.music,
            instruments: user.instruments,
            lessonSize: user.lessonSize,
            ageGroup: user.ageGroup,
            rates: user.lessonRate,
            placeForLessons: user.placeForLessons,
            availability: user.availability,
            qualifications: user.qualifications,
            languages: user.languages,
            studioAddress: user.studioAddress,
            travelDistance: user.travelDistance,
            education: user.education,
            employment: user.employment
        };
    }
    if (user.role === Role.student) {
        return profile = {
            instrument: user.instrument,
            skillLevel: user.skillLevel,
            lessonPlace: user.lessonPlace,
            lessonDuration: user.lessonDuration
        };
    }
    if (user.role === Role.parent) {
        return profile = {
            students: user.students
        };
    }

    return;
};
