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

type Feedback = {
  provider: string;
  siteId: string;
  text: string;
  rating: number;
  status: string;
  author: string;
  createdAt: string;
  authorId: string;
};

export type { Site, User, Feedback };
