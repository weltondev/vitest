import { Prisma } from '@prisma/client'
import { prisma } from 'src/lib/prisma'
import { UsersRepositories } from '../users-repositories'

export class PrismaUsersRepositories implements UsersRepositories {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
