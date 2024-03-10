export interface Profile {
  userId: string;
  nickName: string;
  followers: string[]; // ids of users who are following
  createdAt: number;
  avatarURL: string;
  sponsors: string[]; // user is sponsoring, not being sponsored by

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
