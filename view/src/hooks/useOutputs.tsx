import {
  ReactNode,
  createContext, useContext,
  useState
} from "react"

import { api } from "@autor/sdk"

import autor from "@/utils/autor"

export const defaultOutputs = {
  current: null as api.outputs.OutputBlock[] | null
}
export type Outputs = typeof defaultOutputs

export const outputsContext = createContext<Outputs>(defaultOutputs)
export default function useOutputs() {
  return useContext(outputsContext)
}

export function OutputsProvider(props: { children: ReactNode }) {
  const [context, setContext] = useState<Outputs>(defaultOutputs)

  autor.api.outputs.set_on_r_current_output(async (data) => {
    setContext({ current: data })
  })

  return (
    <outputsContext.Provider value={context}>
      {props.children}
    </outputsContext.Provider>
  )
}