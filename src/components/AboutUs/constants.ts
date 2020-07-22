export interface Teammate {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedIn?: string;
  email?: string;
}

export const team: Teammate[] = [
  {
    name: 'Vanessa Charles',
    role: 'Founder & CEO/CTO',
    image: 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/vanessa-charles.JPG',
    bio: 'Vanessa was born in Caracas, Venezuela, and grew up in Carupano, a small city on the Venezuelan Caribbean coast. She moved to Boston to attend college, and got her Bachelor’s from UMass Boston. Vanessa started Nabi with the dream of bringing music education to the lives of many children. She is a former classical piano teacher and self-taught software engineer. She worked at Oracle as a Software Engineer for almost two years, and helped her brothers create Coco Mercado, Venezuela’s first and only online supermarket. Vanessa means butterfly in Greek and Nabi means butterfly in Korean.',
    linkedIn: 'https://www.linkedin.com/in/vanessacharlesnabi/',
    email: 'vanessa@nabimusic.com'
  },
  {
    name: 'Jennie Legary',
    role: 'Marketing Strategist',
    image: 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/jennie-legary.jpeg',
    bio: 'Jennie is a mezzo-soprano opera singer with a Master in Performing Arts Management from Accademia Teatro alla Scala. She’s also a design, marketing, and business consultant, with experience in promoting classical music, real estate, and early-stage startups. With her two other singer colleagues, she has co-founded Coloratura: The Opera Dolls, a company that produces educational musical toys for children.'
  },
  {
    name: 'Luis Llave',
    role: 'Back-end Engineer',
    image: 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/luis-llave.png',
    bio: 'Luis was born in Arequipa (Perú), but was living in Venezuela, where graduated as an Electrical Engineer at University of Carabobo (UC). At UC, he worked in development of a web system for student academic records and class scheduling. Also, Luis helped build English-Spanish translations in Mandriva and Mageia Linux distributions. He returned to his natal city and now can see a volcano (Misti) everyday. He\'s a fan of Morricone music too.'

  },
  {
    name: 'Marycarmen Mora',
    role: 'Graphic Designer',
    image: 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/marycarmen-mora.jpg',
    bio: 'Marycarmen is a licensed Graphic Designer. She got her education from the University of Antonio José de Sucre and from the University of Los Andes in Venezuela. She currently lives in Mérida and works as a graphic designer and illustrator. During her free time, she likes to do aerial silk and crossfit. Marycarmen is passionate about music.'
  },
  {
    name: 'Mariana Del Rosal',
    role: 'Content Writer',
    image: 'https://nabimusic.s3.us-east-2.amazonaws.com/assets/images/mariana-del-rosal.jpeg',
    bio: 'Mariana studied Language and Literature at the University of Buenos Aires. She is a part-time middle school teacher and has a great time teaching teens. She lives in Buenos Aires, Argentina, with her husband, a music teacher, and their two young kids, who are growing up surrounded by all kinds of musical instruments. Mariana enjoys writing more than anything, and  in her free time, she\'s learning to play the Irish tin whistle.'
  }
];

export const titleAbout = 'About Nabi Music';
export const ourMission = 'Our mission is to make music education easily accessible and bring encouragement to every young musician.';
export const titleWhatWeDo = 'What We Do';
export const whatWeDo = 'Nabi Music is an innovative music learning experience for children. Nabi allows parents to connect with qualified instructors worldwide and provides unique features that motivate parents’ involvement in their children musical path.'
export const titleTeam = 'The Team';
