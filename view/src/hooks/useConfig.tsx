import { 
  ReactNode, 
  createContext, useContext, 
  useState, useEffect 
} from "react"

export const configStorageKey = "autorConfig"

export const defaultConfig = {
  autoHideSubmenu: true
}
export type Config = typeof defaultConfig & {
  save?: (config: Config) => void
}

export const localConfigContext = createContext<Config>(defaultConfig)
export default function useConfig() {
  return useContext(localConfigContext)
}

export function ConfigProvider(props: { children: ReactNode }) {
  const [context, setContext] = useState<Config>(defaultConfig)

  useEffect(() => {
    const data = window.localStorage.getItem(configStorageKey)
    if (data) {
      const config = JSON.parse(data)
      setContext({
        ...context,
        ...config
      })
    }
  }, [])
  
  useEffect(() => {
    const save = (config: Config) => {
      const data = JSON.stringify(config)
      window.localStorage.setItem(configStorageKey, data)
      setContext(config)
    }
    setContext({
      ...context,
      save
    })
  }, [setContext])

  return (
    <localConfigContext.Provider value={context}>
      {props.children}
    </localConfigContext.Provider>
  )
}