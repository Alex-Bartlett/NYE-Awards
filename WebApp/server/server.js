import Fastify from 'fastify';
const fastify = Fastify({
    logger: true
})

let categoryId = 0;
let categories = [];

fastify.get('/', async function handler(request, reply) {
    return 'This is the server. Try connecting to the client.'
})

fastify.get('/categories', async function hander(request, reply) {
    reply
        .code(200)
        .header('Content-Type', 'application/json')
        .send(Object.values(categories))
})

fastify.post('/categories/new', async function handler(request, reply) {
    const body = request.body;
    if (body) {
        CreateCategory(body);
        reply.code(201);
    }
    else {
        reply.code(400);
    }
})

function CreateCategory(catergoryName) {
    const category = {
        id: categoryId,
        name: catergoryName
    }
    categories.push(category);
    categoryId++;
}


try {
    await fastify.listen({ port: 3000 })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}