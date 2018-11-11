import gql from 'graphql-tag'

export const CREATE_POST = gql`
  mutation($data: PostCreateInput) {
    createPost(data: $data) {
      id
      visibility
      content {
        name
        data
      }
    }
  }
`

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

export const RESEND_CONFIRMATION_EMAIL = gql`
  mutation($email: String!) {
    resendConfirmationEmail(email: $email) {
      success
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
        name
        emailConfirmed
        email
        githubProfile {
          login
          githubUserId
          name
        }
      }
    }
  }
`

export const COUNTER_SUBSCRIPTION = gql`
  subscription {
    counter {
      count
    }
  }
`

export const USER_POSTS = gql`
  fragment UserPosts on User {
    id
    posts {
      id
      visibility
      content {
        id
        name
        type
        data
      }
    }
  }
`
