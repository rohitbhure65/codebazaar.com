import { useQuery } from "@blitzjs/rpc"
import getTechStack from "../queries/getTechStack"

export const useTechStack = () => {
  const [techStacks] = useQuery(getTechStack, null)
  return techStacks
}
