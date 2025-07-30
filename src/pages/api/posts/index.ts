import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { verifyToken } from '../../../middlewares/verifyToken';
import { PostSchema } from '../../../utils/validatePost'; // Optional zod validation

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return verifyToken(req, res, async () => {
      const { title, content, categoryId, tags } = req.body;

      try {
        const post = await prisma.post.create({
  data: {
    title,
    content,
    authorid: (req as any).user.userId,  // lowercase id, exactly as in schema
    categoryid: categoryId ? categoryId : undefined,
    PostTags: tags?.length
      ? {
          create: tags.map((tagName: string) => ({
            Tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName },
              },
            },
          })),
        }
      : undefined,
  },
  include: {
    Category: true,
    PostTags: { include: { Tag: true } },
  },
});


        return res.status(201).json(post);
      } catch (error) {
        console.error('Post creation error:', error);
        return res.status(500).json({ error: 'Failed to create post' });
      }
    });
  }

  if (req.method === 'GET') {
    const { search, category } = req.query;

    try {
      const posts = await prisma.post.findMany({
        where: {
          AND: [
            search
              ? {
                  OR: [
                    { title: { contains: String(search), mode: 'insensitive' } },
                    { content: { contains: String(search), mode: 'insensitive' } },
                  ],
                }
              : {},
            category
              ? {
                  Category: {
                    name: {
                      equals: String(category),
                      mode: 'insensitive',
                    },
                  },
                }
              : {},
          ],
        },
        include: {
          Category: true,
          PostTags: { include: { Tag: true } },
        },
      });

      return res.status(200).json(posts);
    } catch (err) {
      console.error('Fetch posts error:', err);
      return res.status(500).json({ error: 'Failed to fetch posts' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
