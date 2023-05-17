import { UsersRepositories } from 'src/repositories/users-repositories'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuhtenticateServiceRequest {
  email: string
  password: string
}

interface AuhtenticateServiceResponse {
  user: User
}

export class AuthenticateService {
  constructor(private userRepositories: UsersRepositories) {}

  async execute({
    email,
    password,
  }: AuhtenticateServiceRequest): Promise<AuhtenticateServiceResponse> {
    const user = await this.userRepositories.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
