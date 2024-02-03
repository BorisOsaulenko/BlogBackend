export interface Profile {
  userId: string;
  nickName: string;
  followers: string[];
  createdAt: number;
  avatarURL: string;

  livePlace?: string;
  birthdate?: number;
  school?: string;
  bio?: string;
}

export interface profileFieldsProvidedByUser {
  //same as public part of Profile
  nickName: string;
  avatarURL: string;
  livePlace?: string;
  birthdate?: number;
  school?: string;
  bio?: string;
}
//todo: implement blocking user