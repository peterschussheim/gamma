import { Context } from '../gamma'

export const ExperiencesByCity = {
  city: async ({ id }, args, ctx: Context, info) => {
    return ctx.db.query.city({ where: { id } }, info)
  },

  experiences: async ({ id }, args, ctx: Context, info) => {
    return ctx.db.query.experiences(
      { where: { location: { neighborhood: { city: { id } } } } },
      info
    )
  }
}
