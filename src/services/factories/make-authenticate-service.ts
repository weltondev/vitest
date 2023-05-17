import { PrismaUsersRepositories } from 'src/repositories/prisma/prisma-users-repositories'
import { AuthenticateService } from '../authenticate'

export function makeAuthenticateService() {
  const prismaUsersRepositories = new PrismaUsersRepositories()
  const authenticateService = new AuthenticateService(prismaUsersRepositories)

  return authenticateService
}
