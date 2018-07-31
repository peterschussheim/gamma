const debug = require('debug')('api:controllers:confirmEmail')

import { v4 as uuid } from 'uuid'
import * as mime from 'mime-types'
import * as multiparty from 'multiparty'

// TODO: https://github.com/prismagraphql/prisma/tree/914fe144396cafa6e9f3894291f381b228e18cc9/examples/archive/file-handling-s3#2-setup-your-aws-s3-file-bucket--set-environment-variables
export default ({ prisma, s3 }) => (req, res) => {
  let form = new multiparty.Form()

  form.on('part', async function(part) {
    if (part.name !== 'data') {
      return
    }

    const name = part.filename
    const secret = uuid()
    const size = part.byteCount
    const contentType = mime.lookup(part.filename)

    try {
      // Upload to S3
      const response = await s3
        .upload({
          Key: secret,
          ACL: 'public-read',
          Body: part,
          ContentLength: size,
          ContentType: contentType
        })
        .promise()

      const s3Url = response.Location

      // Sync with Prisma
      const data = {
        name,
        size,
        uuid: secret,
        contentType,
        s3Url
      }

      const { id }: { id: string } = await prisma.mutation.createFile(
        { data },
        ` { id } `
      )

      const file = {
        id,
        name,
        secret,
        contentType,
        size,
        s3Url
      }

      return res.status(200).send(file)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500)
    }
  })

  form.on('error', err => {
    console.log(err)
    return res.sendStatus(500)
  })

  form.parse(req)
}
