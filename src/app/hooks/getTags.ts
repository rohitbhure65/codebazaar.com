import { useQuery } from "@blitzjs/rpc"
import getTags from "../queries/getTags"

export const gettags = () => {
  const [tags] = useQuery(getTags, null)
  return tags
}
