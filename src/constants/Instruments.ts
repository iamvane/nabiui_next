export enum SkillLevel {
    beginner = 'beginner',
    intermediate = 'intermediate',
    advanced = 'advanced'
}

export interface SkillLevelOptions {
    label: SkillLevel;
    value: string;
}

export const skillLevelOptions = {
    Beginner: <SkillLevelOptions>{
        label: SkillLevel.beginner,
        value: 'beginner'
    },
    Intermediate: <SkillLevelOptions>{
        label: SkillLevel.intermediate,
        value: 'intermediate'
    },
    Advanced: <SkillLevelOptions>{
        label: SkillLevel.advanced,
        value: 'advanced'
    }
};

export namespace InstrumentsComponent {
    export enum Text {
        Instruments = 'Instruments',
        SpecifyWhatInstrument = 'Specify what instrument(s) you can teach and at what level',
        Add = 'Add Instrument'
    }

    export enum FieldNames {
        Instrument = 'instrument',
        SkillLevel = 'skillLevel'
    }

    export enum Ids {
        Instrument = 'instrument',
        SkillLevel = 'skillLevel'
    }

    export enum DisabledPlaceholders {
        SelectLevel = 'Select level',
        SelectInstrument = 'Select instrument'
    }
}

export namespace InstrumentAddedComponent {
    export const instrumentAdded = '- {instrumentReplace} ({skillLevelReplace})';
    export const instrumentPlaceholder = '{instrumentReplace}';
    export const skillLevelPlaceholder = '{skillLevelReplace}';
}
