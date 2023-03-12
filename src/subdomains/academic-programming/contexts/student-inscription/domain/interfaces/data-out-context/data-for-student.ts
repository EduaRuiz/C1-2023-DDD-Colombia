export interface IDataForStudent {
  studentId: string;
  fullName: string;
  photo: string;
  documentType: string;
  document: string;
  birthday: Date;
  address: string;
  personalMail: string;
  institutionalMail: string;
  phone: string;
  studentState: string;
  academicAverage: number;
  career: { careerId: string; careerCode: string; careerName: string };
}
