import { useQuery } from "@blitzjs/rpc"
import getCategory from "../queries/getCategory"

export const getcategory = () => {
  const [category] = useQuery(getCategory, null)
  return category
}
