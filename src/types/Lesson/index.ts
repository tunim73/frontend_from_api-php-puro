import { User } from "types"

export interface Lesson {
  id: number
  name: string
  lessonType: {
    id: number
    type: string
  }
  embed?:string
  watched?: boolean
  teacher?: User
}