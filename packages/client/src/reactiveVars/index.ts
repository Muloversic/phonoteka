import { makeVar } from '@apollo/client'

export const userInfoVar = makeVar({
  name: '',
  email: '',
  id: null,
})