import { hash } from 'bcryptjs'
import { UsersRepositories } from 'src/repositories/users-repositories'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

interface registerServiceRequest {
  name: string
  email: string
  password: string
}

interface RegisterServiceResponse {
  user: User
}

export class RegisterService {
  constructor(private usersRepository: UsersRepositories) {}

  async execute({
    name,
    email,
    password,
  }: registerServiceRequest): Promise<RegisterServiceResponse> {
    const password_hash = await hash(password, 6)

    const emailExist = await this.usersRepository.findByEmail(email)

    if (emailExist) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
