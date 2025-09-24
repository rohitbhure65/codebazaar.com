import { useQuery } from "@blitzjs/rpc"
import getCategory from "../queries/getCategory"

export const useCategory = () => {
  const [category] = useQuery(getCategory, null)
  return category
}
