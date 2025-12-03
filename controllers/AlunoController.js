import Aluno from '../models/Aluno.js'
import Curso from '../models/Curso.js'

const AlunoController = {
    // GET /alunos - Listar todos os alunos
    async listarTodos(req, res) {
        try {
            const alunos = await Aluno.findAll({
                include: [{
                    model: Curso,
                    as: 'curso',
                    attributes: ['id', 'nome', 'descricao']
                }]
            })
            return res.status(200).json(alunos)
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao buscar alunos: ' + error.message })
        }
    },

    // GET /alunos/:id - Buscar aluno por ID
    async buscarPorId(req, res) {
        try {
            const { id } = req.params
            const aluno = await Aluno.findByPk(id, {
                include: [{
                    model: Curso,
                    as: 'curso',
                    attributes: ['id', 'nome', 'descricao']
                }]
            })

            if (!aluno) {
                return res.status(404).json({ erro: 'Aluno não encontrado' })
            }

            return res.status(200).json(aluno)
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao buscar aluno: ' + error.message })
        }
    },

    // POST /alunos - Criar novo aluno
    async criar(req, res) {
        try {
            const { nome, email, matricula, curso_id } = req.body

            // Validações
            if (!nome) {
                return res.status(400).json({ erro: 'O campo nome é obrigatório' })
            }
            if (!email) {
                return res.status(400).json({ erro: 'O campo email é obrigatório' })
            }
            if (!matricula) {
                return res.status(400).json({ erro: 'O campo matricula é obrigatório' })
            }
            if (!curso_id) {
                return res.status(400).json({ erro: 'O campo curso_id é obrigatório' })
            }

            // Verificar se o curso existe
            const curso = await Curso.findByPk(curso_id)
            if (!curso) {
                return res.status(400).json({ erro: 'Curso não encontrado' })
            }

            const novoAluno = await Aluno.create({
                nome,
                email,
                matricula,
                curso_id
            })

            // Buscar o aluno criado com os dados do curso
            const alunoCompleto = await Aluno.findByPk(novoAluno.id, {
                include: [{
                    model: Curso,
                    as: 'curso',
                    attributes: ['id', 'nome', 'descricao']
                }]
            })

            return res.status(201).json(alunoCompleto)
        } catch (error) {
            // Tratar erros de unicidade (email ou matrícula duplicados)
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ erro: 'Email ou matrícula já cadastrados' })
            }
            return res.status(500).json({ erro: 'Erro ao criar aluno: ' + error.message })
        }
    },

    // PUT /alunos/:id - Atualizar aluno
    async atualizar(req, res) {
        try {
            const { id } = req.params
            const { nome, email, matricula, curso_id } = req.body

            const aluno = await Aluno.findByPk(id)

            if (!aluno) {
                return res.status(404).json({ erro: 'Aluno não encontrado' })
            }

            // Validações
            if (nome !== undefined && !nome) {
                return res.status(400).json({ erro: 'O campo nome não pode ser vazio' })
            }
            if (email !== undefined && !email) {
                return res.status(400).json({ erro: 'O campo email não pode ser vazio' })
            }
            if (matricula !== undefined && !matricula) {
                return res.status(400).json({ erro: 'O campo matricula não pode ser vazio' })
            }

            // Verificar se o curso existe (se curso_id foi fornecido)
            if (curso_id !== undefined) {
                const curso = await Curso.findByPk(curso_id)
                if (!curso) {
                    return res.status(400).json({ erro: 'Curso não encontrado' })
                }
            }

            await aluno.update({
                nome: nome !== undefined ? nome : aluno.nome,
                email: email !== undefined ? email : aluno.email,
                matricula: matricula !== undefined ? matricula : aluno.matricula,
                curso_id: curso_id !== undefined ? curso_id : aluno.curso_id
            })

            // Buscar o aluno atualizado com os dados do curso
            const alunoAtualizado = await Aluno.findByPk(id, {
                include: [{
                    model: Curso,
                    as: 'curso',
                    attributes: ['id', 'nome', 'descricao']
                }]
            })

            return res.status(200).json(alunoAtualizado)
        } catch (error) {
            // Tratar erros de unicidade (email ou matrícula duplicados)
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ erro: 'Email ou matrícula já cadastrados' })
            }
            return res.status(500).json({ erro: 'Erro ao atualizar aluno: ' + error.message })
        }
    },

    // DELETE /alunos/:id - Deletar aluno
    async deletar(req, res) {
        try {
            const { id } = req.params
            const aluno = await Aluno.findByPk(id)

            if (!aluno) {
                return res.status(404).json({ erro: 'Aluno não encontrado' })
            }

            await aluno.destroy()

            return res.status(200).json({ mensagem: 'Aluno deletado com sucesso' })
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao deletar aluno: ' + error.message })
        }
    }
}

export default AlunoController
