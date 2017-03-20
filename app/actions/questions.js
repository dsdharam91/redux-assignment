import { CALL_API, CHAIN_API } from 'middleware/api'


export const LOADED_RULES = Symbol('LOADED_RULES')
export function loadRules() {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/api/rules',
      successType: LOADED_RULES
    }
  }
}

