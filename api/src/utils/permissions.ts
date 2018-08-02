import { User, PERMISSION } from '../generated/prisma'

export default function hasPermission(
  user: User,
  permissionsNeeded: PERMISSION[]
) {
  const matchedPermissions = user.permissions!.filter(permission =>
    permissionsNeeded.includes(permission)
  )
  if (!matchedPermissions.length) {
    // Once we are confident this permission scheme works, remove the
    // `permissionsNeeded` log in the error below.
    throw new Error(`You do not have sufficient permissions

      : ${permissionsNeeded}

      You Have:

      ${user.permissions}
      `)
  }
}
