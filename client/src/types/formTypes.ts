export interface FormHelpers {
  resetForm: () => void;
}

export interface ContactFormValuesTypes {
  name: string;
  lastname: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormValuesWithId extends ContactFormValuesTypes {
  id: string;
}

export interface CreateUserDataType {
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
}
export type SignInUserInfoType = {
  userName: string;
  phoneNumber: string;
  email: string;
};

export type SignInDataRecievingType = {
  token: string;
  user: SignInUserInfoType;
};

export interface CheckUserSendingDataType {
  email: string;
  password: string;
}

export interface ReserveTableInfoType {
  address: string;
  date: string;
  count: string;
  tableType: string;
}

export interface UpdateDataOnProfileType {
  email: any;
  password: string;
  newPassword: string;
}

export interface CheckingUserType {
  email: string;
  password: string;
}
