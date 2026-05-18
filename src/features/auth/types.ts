export type User = {
  id: string
  email: string
  fullName: string
}

export type AuthSession = {
  token: string
  user: User
}

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterCredentials = {
  fullName: string
  email: string
  password: string
}
