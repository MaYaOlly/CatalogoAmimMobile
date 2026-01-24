"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUsuarioRepository = void 0;
const Usuario_1 = require("../../domain/models/class/Usuario");
/**
 * Implementação de PrismaUsuarioRepository usando Prisma ORM.
 * Fornece acesso aos dados de usuários no banco de dados.
 */
class PrismaUsuarioRepository {
    /**
     * Cria uma nova instância do repositório de usuários.
     * @param prisma - Cliente Prisma para acesso ao banco de dados
     */
    constructor(prisma) {
        this.prisma = prisma;
    }
    async criar(usuario) {
        const usuarioData = await this.prisma.usuario.create({
            data: {
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.toPersistence().senha,
                endereco: usuario.endereco,
                telefone: usuario.telefone,
            },
        });
        return Usuario_1.Usuario.fromPersistence(usuarioData);
    }
    /**
     * Busca um usuário no banco de dados pelo seu e-mail.
     * @param email - E-mail do usuário a ser buscado
     * @returns Promise que resolve para o usuário encontrado ou null
     */
    async buscarPorEmail(email) {
        const usuarioData = await this.prisma.usuario.findUnique({ where: { email } });
        return usuarioData ? Usuario_1.Usuario.fromPersistence(usuarioData) : null;
    }
    /**
     * Busca um usuário no banco de dados pelo seu ID.
     * @param id - ID do usuário a ser buscado
     * @returns Promise que resolve para o usuário encontrado ou null
     */
    async buscarPorId(id) {
        const usuarioData = await this.prisma.usuario.findUnique({ where: { id } });
        return usuarioData ? Usuario_1.Usuario.fromPersistence(usuarioData) : null;
    }
    /**
     * Atualiza um usuário existente no banco de dados.
     * @param usuario - Entidade Usuario com os dados atualizados
     * @returns Promise que resolve para o usuário atualizado
     */
    async atualizar(usuario) {
        const dados = usuario.toPersistence();
        const usuarioAtualizado = await this.prisma.usuario.update({
            where: { id: usuario.id },
            data: {
                nome: dados.nome,
                endereco: dados.endereco,
                telefone: dados.telefone,
            },
        });
        return Usuario_1.Usuario.fromPersistence(usuarioAtualizado);
    }
}
exports.PrismaUsuarioRepository = PrismaUsuarioRepository;
