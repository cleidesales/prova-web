import express from 'express'
import AlunoController from '../controllers/AlunoController.js'

const router = express.Router()

// GET /alunos - Listar todos os alunos
router.get('/', AlunoController.listarTodos)

// GET /alunos/:id - Buscar aluno por ID
router.get('/:id', AlunoController.buscarPorId)

// POST /alunos - Criar novo aluno
router.post('/', AlunoController.criar)

// PUT /alunos/:id - Atualizar aluno
router.put('/:id', AlunoController.atualizar)

// DELETE /alunos/:id - Deletar aluno
router.delete('/:id', AlunoController.deletar)

export default router
