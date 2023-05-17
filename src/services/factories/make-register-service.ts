import { PrismaUsersRepositories } from 'src/repositories/prisma/prisma-users-repositories'
import { RegisterService } from '../register'

export function makeRegisterUseCase() {
  const prismaUsersRepositories = new PrismaUsersRepositories()
  const registerService = new RegisterService(prismaUsersRepositories)

  return registerService
}
