import pc from 'picocolors';
import { config } from './config/env.js';
import { buildConfigs } from './app.js';


// Cool Startup Banner
const printBanner = () => {
    const banner = `
  ${pc.cyan('╔══════════════════════════════════════════════╗')}
  ${pc.cyan('║')}                                              ${pc.cyan('║')}
  ${pc.cyan('║')}    ${pc.bold(pc.magenta('🚀 FANTASY FASTIFY APP -- ' + config.NODE_ENV))}     ${pc.cyan('║')}
  ${pc.cyan('║')}    ${pc.dim('The ultimate high-performance backend')}     ${pc.cyan('║')}
  ${pc.cyan('║')}                                              ${pc.cyan('║')}
  ${pc.cyan('╚══════════════════════════════════════════════╝')}
  `;
    console.log(banner);
};

const init = async () => {
    const app = await buildConfigs();

    // will active these later

    /* 
    await server(fastify);
 
    // Graceful shutdown: close DB connection when the server shuts down
    fastify.addHook('onClose', async (instance) => {
        instance.log.info('Closing database connection…');
        await closeDbConnection();
    });
 
    // Handle termination signals for graceful shutdown
    const shutDown = async (signal: string) => {
        fastify.log.info(`Received ${signal}, shutting down gracefully…`);
        await fastify.close();
        process.exit(0);
    };
    process.on('SIGTERM', () => shutDown('SIGTERM'));
    process.on('SIGINT', () => shutDown('SIGINT'));
    */


    // Run the server!
    try {
        printBanner();
        await app.listen({ port: config.PORT, host: config.HOST });
        console.log(`\n  ${pc.green('✔')} ${pc.bold('Server is screaming at:')} ${pc.yellow(`http://localhost:${config.PORT}`)}\n`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

init();
