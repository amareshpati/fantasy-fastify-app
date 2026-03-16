import Fastify from 'fastify';
import pc from 'picocolors';

const fastify = Fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:HH:MM:ss',
                ignore: 'pid,hostname',
            },
        },
    },
});

// Cool Startup Banner
const printBanner = () => {
    const banner = `
  ${pc.cyan('╔══════════════════════════════════════════════════════════════════════════════╗')}
  ${pc.cyan('║')}                                                                              ${pc.cyan('║')}
  ${pc.cyan('║')}    ${pc.bold(pc.magenta('🚀 FANTASY FASTIFY APP'))}                                                    ${pc.cyan('║')}
  ${pc.cyan('║')}    ${pc.dim('The ultimate high-performance backend')}                                     ${pc.cyan('║')}
  ${pc.cyan('║')}                                                                              ${pc.cyan('║')}
  ${pc.cyan('╚══════════════════════════════════════════════════════════════════════════════╝')}
  `;
    console.log(banner);
};

// Declare a route
fastify.get('/', async (request, reply) => {
    return {
        status: 'online',
        message: 'Welcome to the Fantasy Fastify App!',
        timestamp: new Date().toISOString()
    };
});

// Run the server!
const start = async () => {
    try {
        printBanner();
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log(`\n  ${pc.green('✔')} ${pc.bold('Server is screaming at:')} ${pc.yellow('http://localhost:3000')}\n`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
