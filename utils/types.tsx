type Site = {
  authorId: string;
  createdAt: string;
  site: string;
  url: string;
};

type User = {
  uid: string;
  name: string;
  email: string;
  provider: string;
  photoUrl: string;
};

export type { Site, User };
