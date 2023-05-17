import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from 'src/services/errors/user-already-exists-error'
import { makeRegisterUseCase } from 'src/services/factories/make-register-service'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerService = makeRegisterUseCase()

    await registerService.execute({
      name,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
  }

  return reply.status(201).send()
}
