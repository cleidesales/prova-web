import Curso from '../models/Curso.js'

const CursoController = {
    // GET /cursos - Listar todos os cursos
    async listarTodos(req, res) {
        try {
            const cursos = await Curso.findAll()
            return res.status(200).json(cursos)
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao buscar cursos: ' + error.message })
        }
    },

    // GET /cursos/:id - Buscar curso por ID
    async buscarPorId(req, res) {
        try {
            const { id } = req.params
            const curso = await Curso.findByPk(id)

            if (!curso) {
                return res.status(404).json({ erro: 'Curso não encontrado' })
            }

            return res.status(200).json(curso)
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao buscar curso: ' + error.message })
        }
    },

    // POST /cursos - Criar novo curso
    async criar(req, res) {
        try {
            const { nome, descricao, carga_horaria } = req.body

            // Validação
            if (!nome) {
                return res.status(400).json({ erro: 'O campo nome é obrigatório' })
            }

            const novoCurso = await Curso.create({
                nome,
                descricao,
                carga_horaria
            })

            return res.status(201).json(novoCurso)
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao criar curso: ' + error.message })
        }
    },

    // PUT /cursos/:id - Atualizar curso
    async atualizar(req, res) {
        try {
            const { id } = req.params
            const { nome, descricao, carga_horaria } = req.body

            const curso = await Curso.findByPk(id)

            if (!curso) {
                return res.status(404).json({ erro: 'Curso não encontrado' })
            }

            // Validação
            if (nome !== undefined && !nome) {
                return res.status(400).json({ erro: 'O campo nome não pode ser vazio' })
            }

            await curso.update({
                nome: nome !== undefined ? nome : curso.nome,
                descricao: descricao !== undefined ? descricao : curso.descricao,
                carga_horaria: carga_horaria !== undefined ? carga_horaria : curso.carga_horaria
            })

            return res.status(200).json(curso)
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao atualizar curso: ' + error.message })
        }
    },

    // DELETE /cursos/:id - Deletar curso
    async deletar(req, res) {
        try {
            const { id } = req.params
            const curso = await Curso.findByPk(id)

            if (!curso) {
                return res.status(404).json({ erro: 'Curso não encontrado' })
            }

            await curso.destroy()

            return res.status(200).json({ mensagem: 'Curso deletado com sucesso' })
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao deletar curso: ' + error.message })
        }
    }
}

export default CursoController
