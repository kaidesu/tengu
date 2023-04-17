import { createContext, useReducer } from 'react'

const initialState = {
  forms: {
    negative: false,
    past: false,
    te: false,
    progressive: false,
    desire: false,
    volitional: false,
    potential: false,
    imperative: false,
    passive: false,
    causative: true,    
  },
  groups: {
    ichidan: true,
    godan: false,
  },
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FORM':
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.payload]: !state.forms[action.payload],
        },
      }
    case 'TOGGLE_GROUP':
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.payload]: !state.groups[action.payload],
        },
      }
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

const SettingsContext = createContext()

const SettingsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsContext, SettingsContextProvider }