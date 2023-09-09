// pages/api/resolve.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { shortCode } = req.body;

  const link = await prisma.shortUrl.findUnique({
    where: {
      shortCode,
    },
  });

  if (!link) {
    return res.status(404).json({ error: 'Link not found' });
  }

  return res.status(200).json({ longUrl: link.longUrl });
}