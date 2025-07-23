import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";


const app = express();
app.use(express.json()); //для ответов сервера
app.use(cors({ origin: "http://localhost:5173", credentials: true })); //указываем на каком порте будет принимать запросы ,надо что бы он мечился с клинетским сервером
const prisma = new PrismaClient();
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

app.post("/signup",async (req, resp) => {
  console.log("sign up");
  
  // if (!req.body.email || !req.body.password) {
  //   return resp
  //     .status(400)
  //     .json({ error: "Вы должны передать email и password" });
  // }
  // const { email, password } = req.body; //сначала дестроктуризация потом find
const email="sda@mail.ru";
const password="123";
  const isUserExist =await prisma.user.findUnique({ where: { email } });
  if (isUserExist) {
    return resp.status(400).json({error:"LOGIN is already exist"})
  }
  await prisma.user.create({data:{
    email,
    password,
  }})
  return resp.status(200).json({message:"OK"})
  // const users = [
  //   { email: "admin@mail.ru", password: "1234" },
  //   { email: "user@mail.ru", password: "1234" },
  // ];

  // const user = users.some(
  //   (user) => user.email === email && user.password === password,
  // );

  // if (user) {
  //   resp.status(400).json({ error: "Пользователь существует" });
  // } else {
  //   users.push({ email, password });
  //   resp.status(201).json({ message: "Вы успешно зарегестрировались" });
  // }
});

app.listen(4000, () => {
  console.log("server open");
}); //указываем на каком порте будет работать сервер
