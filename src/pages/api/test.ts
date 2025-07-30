import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma'; // ✅ Correct path

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ users });
  } catch (error: any) {
    console.error('🔥 Test Prisma Error:', error);
    res.status(500).json({
      message: 'Prisma failed',
      error: error.message || 'Unknown error',
    });
  }
}
