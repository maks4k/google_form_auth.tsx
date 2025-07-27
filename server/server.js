import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json()); //для ответов сервера
app.use(cors({ origin: "http://localhost:5173", credentials: true })); //указываем на каком порте будет принимать запросы ,надо что бы он мечился с клинетским сервером
const prisma = new PrismaClient();
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

app.get("/", (req, resp) => {
  resp.status(200).json({
    id: 2,
    name: "max",
  });
});

app.post("/signin", (req, resp) => {
  if (!req.body.email || !req.body.password) {
    return resp
      .status(400)
      .json({ error: "Вы должны передать email и password" });
  }
  const { email, password } = req.body; //сначала дестроктуризация потом find
  const users = [
    { email: "admin@mail.ru", password: "1234Dm" },
    { email: "user@mail.ru", password: "1234" },
  ];

  const user = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (user) {
    resp.status(200).json({ message: "Вы успешно авторизованы" });
  } else {
    resp
      .status(401)
      .json({ error: "Пользователь не найден или неверно введены данные" });
  }
});








app.post("/signup", async (req, resp) => {
  const result = signUpFormSchema.safeParse(req.body);

  if (!result.success) {
    return resp.status(400).json({ error: result.error.flatten().fieldErrors });
  }
  const { email, password } = req.body;

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
    const token = jwt.sign({ id: newUser.id }, jwtSecret, {
      expiresIn: "1h",
    });

    return resp.status(201).json({ token,user:{id:newUser.id,emai:newUser.email}});
  }else{
    return resp.status(500).json({ error: "Server error" });
  } 
});

app.listen(4000, () => {
  console.log("server open");
}); //указываем на каком порте будет работать сервер
