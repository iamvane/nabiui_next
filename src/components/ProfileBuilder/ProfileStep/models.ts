
export interface ProfileType {
  bioTitle?: string;
  bioDescription?: string;
  yearsOfExperience?: string | number;
  music?: string[];
  zoomLink?: string;
}

export interface ApiProfileType {
  bio_title?: string;
  bio_description?: string;
  music?:  string[];
}
