import gql from 'graphql-tag'

export const REGISTER = gql`
  mutation($name: String, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      success
    }
  }
`

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
      }
      token
    }
  }
`

export const LOGOUT = gql`
  mutation {
    logout {
      success
    }
  }
`

export const VIEWER = gql`
  {
    viewer {
      me {
        id
        emailConfirmed
      }
    }
  }
`
