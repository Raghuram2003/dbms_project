import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
const salt = bcrypt.genSaltSync(10);

app.get("/test", (req, res) => {
  res.send("hello");
});

app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, salt);
  const username_check = await prisma.emp_data.findFirst({
    where : {
      emp_name : username
    }
  });
  if(username_check){
    res.status(409).json({
      message : "Username already Exists"
    });
    return
  }
  try {
    const user_data = await prisma.emp_data.create({
      data: {
        emp_name: username,
        emp_password: hashedPassword,
        is_signed_in: true,
      },
    });
    res.json({
      user_data,
      message : "Logged in successfully"
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "prisma error",
    });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user_data = await prisma.emp_data.findFirst({
    where: {
      emp_name: username,
    },
  });
  if(!user_data){
    res.status(404).json({
      message : "The username does not exist"
    })
  }
  const auth = bcrypt.compareSync(password, user_data.emp_password);
  if (auth) {
    await prisma.emp_data.update({
      where: {
        id: user_data.id,
      },
      data: {
        is_signed_in: true,
      },
    });
    res.json({
      user_data,
      message : "Logged in successfully"
    });
  } else {
    res.status(401).json({ message: "unauthorized" });
  }
});

app.post("/api/logout", async (req, res) => {
  const { id } = req.body;
  try {
    console.log("trying");
    await prisma.emp_data.update({
      where: {
        id: id,
      },
      data: {
        is_signed_in: false,
      },
    });
    console.log("signed out");
    res.status(200).json({ message: "signed out" });
  } catch (err) {
    console.log(err);
    res.json({
      message: "prisma error",
    });
  }
});

app.listen(3000, () => {
  console.log("server is running ");
});
