import { Types } from 'mongoose'

export interface IVote {
  recipe: Types.ObjectId
  user: Types.ObjectId
  vote: 1 | -1
}
