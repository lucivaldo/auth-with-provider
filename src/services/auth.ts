import { User } from '../context/AuthProvider'

type SigninResponse = User & { token: string }

const signin = async (
  username: string,
  password: string,
): Promise<SigninResponse> => {
  const headers = {
    'Content-Type': 'application/json',
  }
  const body = JSON.stringify({ username, password })

  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'post',
    body,
    headers,
  })

  if (response.ok) {
    return response.json()
  } else {
    throw new Error('authentication error')
  }
}

export default {
  signin,
}
