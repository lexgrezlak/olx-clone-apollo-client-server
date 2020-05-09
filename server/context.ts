import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "./utils/config";
import User from "./models/User";

export interface IContext {
  user: null | object;
}

function getUser(token: string): null | object {
  try {
    if (token) {
      return verify(token, JWT_SECRET) as any;
    }

    return null;
  } catch (error) {
    return null;
  }
}

export default async ({ req }: any): Promise<IContext> => {
  const tokenWithBearer = req.headers.authorization || "";
  const token = tokenWithBearer.split(" ")[1];
  const decodedUser = getUser(token) as any;

  if (decodedUser === null) {
    const user = null;
    return { user };
  }

  const user = await User.findById(decodedUser.id)
    .populate("ownPostings")
    .populate("followedPostings");

  console.log(user);

  return { user };
};
