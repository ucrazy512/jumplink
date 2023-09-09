// pages/api/shorten.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  if (req.method === "POST") {
    const { longUrl } = req.body;
    const shortCode = generateShortCode();

    const newUrl = await prisma.shortUrl.create({
      data: { longUrl, shortCode },
    });

    res.status(201).json(newUrl);
  } else {
    res.status(405).end(); //Method Not Allowed
  }
}

function generateShortCode() {
  // Implement your short code generator here
  return Math.random().toString(36).substr(2, 8);
}