export interface Profile {
  userId: string;
  name: string;
  followers: string[];
  following: string[];
  createdAt: Date;
  avatarURL?: string;
  livePlace?: string;
  birthdate?: Date;
  school?: string;
  surname?: string;
  bio?: string;
}

export interface profileFieldsProvidedByUser {
  name: string;
  avatarURL?: string;
  livePlace?: string;
  birthdate?: Date;
  school?: string;
  surname?: string;
  bio?: string;
}
