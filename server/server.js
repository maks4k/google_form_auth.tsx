import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
const prisma = new PrismaClient();
app.use(express.json()); //для ответов сервера
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); //указываем на каком порте будет принимать запросы ,надо что бы он мечился с клинетским сервером

const jwtSecret = process.env.JWT_SECRET;

export const BaseFormSchemaConst = {
  emailMin: 6,
  passwordMin: 4,
  passwordMax: 20,
};

const passwordSchema = z
  .string()
  .min(
    BaseFormSchemaConst.passwordMin,
    `Password must not be less than ${BaseFormSchemaConst.passwordMin} characters.`,
  )
  .max(
    BaseFormSchemaConst.passwordMax,
    `Password must not be more than ${BaseFormSchemaConst.passwordMax} characters.`,
  )
  .regex(/[A-Z]/, "Password must contain capital characters.")
  .regex(/[a-z]/, "Password must contain small characters.")
  .regex(/[0-9]/, "Password must contain numeric characters.");

const BaseFormSchema = z.object({
  email: z
    .string()
    .email()
    .min(
      BaseFormSchemaConst.emailMin,
      `Email must be at least ${BaseFormSchemaConst.emailMin} characters.`,
    ),
  password: passwordSchema,
});

export const signinFormSchema = BaseFormSchema;

export const signUpFormSchema = BaseFormSchema.extend({
  confirmPassword: passwordSchema.optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
// /хуй пойми что это ,походу дефолтное значение для проверки
// app.get("/", (req, resp) => {
//   resp.status(200).json({
//     id: 2,
//     name: "max",
//   });
// });
const generateTokens = (id, email) => {
  const token = jwt.sign({ id, email }, jwtSecret, {
    expiresIn: "1h",
  });
  return { token };
};

app.post("/api/signin", async (req, resp) => {
  const result = signinFormSchema.safeParse(req.body);

  if (!result.success) {
    return resp.status(400).json({ error: result.error.flatten().fieldErrors });
  }
  const { email, password } = result.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return resp.status(401).json({ error: "Email is not correct" });
    }
    const isValiadPassword = await bcrypt.compare(password, user.password);
    if (!isValiadPassword) {
      return resp.status((401).json({ error: "password is not correct" }));
    }
    const { token } = generateTokens(user.id, user.email);
    // return resp
    //   .status(200)
    //   .json({ token, user: { id: user.id, email: user.email } });
    return resp
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: true,
        maxAge: 60 * 60 * 1000,
      })
      .status(200)
      .json({ user: { id: user.id, email: user.email } });
  } catch (error) {
    return resp.status(500).json({ error: "Server error" });
  }
});









app.post("/api/signup", async (req, resp) => {
  const result = signUpFormSchema.safeParse(req.body);

  if (!result.success) {
    return resp.status(400).json({ error: result.error.flatten().fieldErrors });
  }
  const { email, password } = result.data;
  try {
    const isUserExist = await prisma.user.findUnique({ where: { email } });
    if (isUserExist) {
      return resp.status(400).json({ error: "Email is already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    if (newUser) {
      const { token } = generateTokens(newUser.id, newUser.email);

      // return resp
      //   .status(201)
      //   .json({ token, user: { id: newUser.id, email: newUser.email } });
      return resp
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: true,
          maxAge: 60 * 60 * 1000,
        })
        .status(200)
        .json({ user: { id: newUser.id, email: newUser.email } });
    } else {
      throw new Error();
    }
  } catch (error) {
    return resp.status(500).json({ error: "Server error" });
  }
});




const checkAuth = (req, resp, next) => {
  const messages = {
    notFoundToken: "Token is not found",
    invalidToken: "invalid token",
  };
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error(messages.notFoundToken);
    }
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        throw new Error(messages.invalidToken);
      } else {
        req.user=user 
        next();
      }
    });
  } catch (error) {
    console.log(error);

    return resp.status(401).json({ error: error.message });
  }
};




app.get("/api/protected", checkAuth, async (req, resp) => {
  console.log(req.user);
  return resp.status(200).json({ user: { id: req.user.id, email: req.user.email } });
});
app.listen(4000, () => {
  console.log("server open");
}); //указываем на каком порте будет работать сервер
