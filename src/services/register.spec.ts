import { InMemoryUsersRepository } from './../repositories/in-memory/in-memory-users-repository'
import { RegisterService } from 'src/services/register'
import { expect, describe, it } from 'vitest'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Service', () => {
  it('should be to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.execute({
      name: 'welton',
      email: 'welton2@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.execute({
      name: 'welton',
      email: 'welton2@email.com',
      password: '123456',
    })

    const passwordCorrectlyHashed = await compare('123456', user.password_hash)

    expect(passwordCorrectlyHashed).toBe(true)
  })

  it('should not be able register with email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const email = 'welton@email.com'

    await registerService.execute({
      name: 'welton',
      email,
      password: '123456',
    })

    await expect(() =>
      registerService.execute({
        name: 'welton',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
