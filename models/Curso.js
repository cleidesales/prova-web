import db from '../config/banco.js'

const Curso = db.sequelize.define('cursos', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: db.Sequelize.STRING(100),
        allowNull: false
    },
    descricao: {
        type: db.Sequelize.TEXT,
        allowNull: true
    },
    carga_horaria: {
        type: db.Sequelize.INTEGER,
        allowNull: true
    }
}, {
    timestamps: true
})

// Sincronizar com o banco de dados (criar tabela se não existir)
Curso.sync()

export default Curso
