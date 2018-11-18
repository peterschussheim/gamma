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

export const LOGOUT_ALL_SESSIONS = gql`
  mutation {
    logoutOfAllSessions {
      success
    }
  }
`

export const VIEWER_ME = gql`
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

export const VIEWER_GISTS = gql`
  {
    viewer {
      gists {
        gistId
        url
        description
        isPublic
        truncated
        files {
          filename
          type
          language
          raw_url
          size
        }
      }
    }
  }
`

export const GET_GIST_BY_ID = gql`
  query getGistById($gistId: String!) {
    getGistById(gistId: $gistId) {
      gistId
      description
      files {
        filename
        type
        language
        raw_url
        size
        truncated
        content
      }
      isPublic
    }
  }
`

export const CREATE_GIST = gql`
  mutation($data: GistCreateInput) {
    createGist(data: $data) {
      description
      isPublic
      files {
        filename
        type
        language
        raw_url
        size
        truncated
        content
      }
      created_at
    }
  }
`

export const EDIT_GIST = gql`
  mutation($data: GistUpdateInput) {
    updateGist(data: $data) {
      description
      isPublic
      files {
        filename
        type
        language
        raw_url
        size
        truncated
        content
      }
      created_at
      updated_at
    }
  }
`

export const DELETE_GIST = gql`
  mutation($gistId: String!) {
    deleteGist(gistId: $gistId) {
      success
    }
  }
`

export const CREATE_POST = gql`
  mutation($data: PostCreateInput) {
    createPost(data: $data) {
      id
      visibility
      files {
        name
        type
        content
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
