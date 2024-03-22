import { Sequelize } from 'sequelize';
import config from '../config';

const sequelize = new Sequelize(config.nameDB, config.userDB, config.passwordDB, {
    host: config.hostDB,
    dialect: 'mysql',
    logging: false,
});

const verificarConexion = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
}

const sincronizarModelos = async () => {
    try {
        await sequelize.sync()
        console.log('Modelos sincronizados con la base de datos');
    } catch (error) {
        console.error('Error al sincronizar modelos con la base de datos:', error);
    }
}

export { sequelize, verificarConexion, sincronizarModelos };
