import { createReadStream } from 'node:fs'
import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { openai } from '../lib/openai'
import {streamToResponse, OpenAIStream} from 'ai'
import { z } from 'zod'

export async function generateAICompletionRoute(app: FastifyInstance) {
  app.post('/ai/complete', async (req, reply) => {

    const bodySchema = z.object({
      videoId: z.string().uuid(),
      template: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
    })

    const { videoId, template, temperature } = bodySchema.parse(req.body)


    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      }
    })

    if(!video.transcrition) {
      return reply.status(400).send({ error: 'Video transcription was not generated yet.'})
    }

    const promptMessage = template.replace('{transcrition}', video.transcrition)

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      temperature,
      messages: [
        {role: 'user', content: promptMessage },
      ],
      stream: true,
    })

    const stream = OpenAIStream(response)

    streamToResponse(stream, reply.raw, {
      headers:{
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
    })

  })
}