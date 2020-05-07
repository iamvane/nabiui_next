export interface Availability {
  day: string;
  from: string;
  to: string;
}

export interface AvailabilityType {
  mon8to10?: boolean;
  mon10to12?: boolean;
  mon12to3?: boolean;
  mon3to6?: boolean;
  mon6to9?: boolean;
  tue8to10?: boolean;
  tue10to12?: boolean;
  tue12to3?: boolean;
  tue3to6?: boolean;
  tue6to9?: boolean;
  wed8to10?: boolean;
  wed10to12?: boolean;
  wed12to3?: boolean;
  wed3to6?: boolean;
  wed6to9?: boolean;
  thu8to10?: boolean;
  thu10to12?: boolean;
  thu12to3?: boolean;
  thu3to6?: boolean;
  thu6to9?: boolean;
  fri8to10?: boolean;
  fri10to12?: boolean;
  fri12to3?: boolean;
  fri3to6?: boolean;
  fri6to9?: boolean;
  sat8to10?: boolean;
  sat10to12?: boolean;
  sat12to3?: boolean;
  sat3to6?: boolean;
  sat6to9?: boolean;
  sun8to10?: boolean;
  sun10to12?: boolean;
  sun12to3?: boolean;
  sun3to6?: boolean;
  sun6to9?: boolean;
  [key: string]: any;
}