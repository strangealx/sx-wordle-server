import { Model } from 'objection'
import { TModelId } from '../type'

export class BaseModel extends Model {
  id!: TModelId
}
