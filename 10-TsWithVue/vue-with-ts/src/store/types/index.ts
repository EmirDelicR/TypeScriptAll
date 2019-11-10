interface Profile {
  username: string;
  bio?: string;
  image?: string;
  following: boolean;
}

interface User {
  email: string;
  token: string;
  username: string;
  bio?: string;
  image?: string;
}

interface UserAuth {
  email: string;
  password: string;
}

export { Profile, User, UserAuth };
