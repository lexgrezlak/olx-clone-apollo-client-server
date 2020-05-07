import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "./utils/config";

export interface IContext {
  user?: null | object;
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

export default ({ req }: any): IContext => {
  const tokenWithBearer = req.headers.authorization || "";
  const token = tokenWithBearer.split(" ")[1];
  const user = getUser(token);

  return { user };
};
