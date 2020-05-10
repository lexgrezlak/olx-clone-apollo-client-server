import { gql, UserInputError } from "apollo-server";
import { Parent } from "../types";
import User from "../models/User";
import { compare, hash } from "bcrypt";
import { JWT_SECRET } from "../utils/config";
import { sign } from "jsonwebtoken";

interface ISignInInput {
  input: {
    email: string;
    password: string;
  };
}

interface ISignUpInput {
  input: {
    name: string;
    email: string;
    password: string;
  };
}

export const authTypeDefs = gql`
  input SignInInput {
    email: String!
    password: String!
  }

  input SignUpInput {
    name: String
    email: String!
    password: String!
  }

  type SignOutput {
    user: User
    token: String
  }

  extend type Mutation {
    signIn(input: SignInInput!): SignOutput!
    signUp(input: SignUpInput!): SignOutput!
  }
`;

export const authResolvers = {
  Mutation: {
    signIn: async (
      _parent: Parent,
      { input: { email, password } }: ISignInInput
    ) => {
      const user = (await User.findOne({ email })) as any;

      const isPasswordCorrect =
        user === null ? false : await compare(password, user.passwordHash);

      if (!user || !isPasswordCorrect) {
        throw new UserInputError("Wrong email or password.");
      }

      const token = sign(
        {
          id: user._id,
          email: user.email,
        },
        JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

      return { token, user };
    },

    signUp: async (
      _parent: Parent,
      { input: { name, email, password } }: ISignUpInput
    ) => {
      if (password.length < 4)
        throw new UserInputError(
          "Password should be at least 4 characters long.",
          {
            invalidArgs: { password },
          }
        );

      const passwordHash = await hash(password, 10);

      const newUser = new User({
        name,
        email: email.toLowerCase(),
        passwordHash,
      });

      try {
        const user = (await newUser.save()) as any;
        const token = sign({ id: user._id, email: user.email }, JWT_SECRET, {
          expiresIn: "30d",
        });
        return { token, user };
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: { email, password },
        });
      }
    },
  },
};
