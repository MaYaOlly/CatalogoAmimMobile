import { PrismaClient } from "@prisma/client";
import { IUsuarioRepository } from "../../domain/models/interfaces/IUsuarioRepository";
import { Usuario } from "../../domain/models/class/Usuario";

export class PrismaUsuarioRepository implements IUsuarioRepository {
  constructor(private prisma: PrismaClient) {}

  public async criar(usuario: Usuario): Promise<Usuario> {
    const usuarioData = await this.prisma.usuario.create({
      data: usuario.toPersistence(),
    });
    return Usuario.fromPersistence(usuarioData);
  }

  public async buscarPorEmail(email: string): Promise<Usuario | null> {
    const usuarioData = await this.prisma.usuario.findUnique({ where: { email } });
    return usuarioData ? Usuario.fromPersistence(usuarioData) : null;
  }

  public async buscarPorId(id: string): Promise<Usuario | null> {
    const usuarioData = await this.prisma.usuario.findUnique({ where: { id } });
    return usuarioData ? Usuario.fromPersistence(usuarioData) : null;
  }

  public async atualizar(id: string, data: Partial<Usuario>): Promise<Usuario> {
    const usuarioData = await this.prisma.usuario.update({
      where: { id },
      data,
    });
    return Usuario.fromPersistence(usuarioData);
  }
}