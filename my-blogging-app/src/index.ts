import { PrismaClient } from '@prisma/client/extension';
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from 'hono/jwt';
import { Hono } from "hono";

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

app.post('/api/v1/user/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL, 
    }).$extends(withAccelerate());

    const body: any = await c.req.json();
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password
            }
        });

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt });
    } catch (e) {
        c.status(403);
        return c.json({ error: 'error while signing up' });
    } finally {
        await prisma.$disconnect();  // Ensure the connection is closed
    }
});

app.post('/api/v1/user/signin', async (c) => {
    return c.json('This is the signin route');
});

app.get('/api/v1/blog/:id', async (c) => {
    return c.text('GET /');
});

app.get('/api/v1/blog/bulk', async (c) => {
    return c.json('This is the blog route');
});

app.post('/api/v1/blog', async (c) => {
    return c.text('This is the blog posting route');
});

app.put('/api/v1/blog', async (c) => {
    return c.text('This route is specifically for updating your blog posts.');
});

export default app;
