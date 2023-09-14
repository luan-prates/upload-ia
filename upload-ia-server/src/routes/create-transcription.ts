import { FastifyInstance } from 'fastify'
import { createReadStream } from 'node:fs'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function createTranscriptionRoute(app: FastifyInstance) {
  app.post('/videos/:videoId/transcription', async (req) => {
    const paramsSchema = z.object({
      videoId: z.string().uuid(),
    })

    const { videoId } = paramsSchema.parse(req.params)

    const bodySchema = z.object({
      prompt: z.string(),
    })

    const { prompt } = bodySchema.parse(req.body)

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId
      }
    })

    const videoPath = video.path

    return {
      videoId,
      prompt,
      videoPath,
    }
  })
}