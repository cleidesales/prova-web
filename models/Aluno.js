import db from '../config/banco.js'
import Curso from './Curso.js'

const Aluno = db.sequelize.define('alunos', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: db.Sequelize.STRING(100),
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    matricula: {
        type: db.Sequelize.STRING(20),
        allowNull: false,
        unique: true
    },
    curso_id: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'cursos',
            key: 'id'
        }
    }
}, {
    timestamps: true
})

// Definir relacionamento: Aluno pertence a um Curso
Aluno.belongsTo(Curso, {
    foreignKey: 'curso_id',
    as: 'curso'
})

// Sincronizar com o banco de dados (criar tabela se não existir)
Aluno.sync()

export default Aluno
