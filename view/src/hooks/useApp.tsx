import { 
  Dispatch, SetStateAction, ReactNode, 
  createContext, useContext, 
  useState, useEffect 
} from "react"

export const defaultAppContext = {
  page: "home"
}
export type AppContext = typeof defaultAppContext & {
  change?: Dispatch<SetStateAction<AppContext>>
}

export const autorContext = createContext<AppContext>(defaultAppContext)
export default function useApp() {
  return useContext(autorContext)
}

export function AppProvider(props: { children: ReactNode }) {
  const [context, setContext] = useState<AppContext>(defaultAppContext)

  useEffect(() => {
    setContext({
      ...context,
      change: setContext
    })
  }, [setContext])

  return (
    <autorContext.Provider value={context}>
      {props.children}
    </autorContext.Provider>
  )
}