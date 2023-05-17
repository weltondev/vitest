import { InMemoryUsersRepository } from './../repositories/in-memory/in-memory-users-repository'
import { RegisterService } from 'src/services/register'
import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterService

describe('Register Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterService(usersRepository)
  })

  it('should be to register', async () => {
    const { user } = await sut.execute({
      name: 'welton',
      email: 'welton2@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password', async () => {
    const { user } = await sut.execute({
      name: 'welton',
      email: 'welton2@email.com',
      password: '123456',
    })

    const passwordCorrectlyHashed = await compare('123456', user.password_hash)

    expect(passwordCorrectlyHashed).toBe(true)
  })

  it('should not be able register with email twice', async () => {
    const email = 'welton@email.com'

    await sut.execute({
      name: 'welton',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'welton',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
