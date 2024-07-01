import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const prisma = new PrismaClient();

async function main() {
  try {
    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        email: 'alice123@example.com',
        name: 'Alice',
        password: 'Ronaldo312'
      },
    });
    console.log('User created:', newUser);

    // Create a new post for the new user
    const newPost = await prisma.post.create({
      data: {
        title: 'My First Post',
        content: 'This is the content of the post.',
        published: true,
        authorId: newUser.id,
      },
    });
    console.log('Post created:', newPost);
  } catch (error) {
    console.error('Error creating data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
