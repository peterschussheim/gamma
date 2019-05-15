import gql from 'graphql-tag'

export const REGISTER = gql`
  mutation Signup($name: String, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      success
    }
  }
`

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
      }
      token
    }
  }
`

export const RESEND_CONFIRMATION_EMAIL = gql`
  mutation ResendConfirmationEmail($email: String!) {
    resendConfirmationEmail(email: $email) {
      success
    }
  }
`

export const LOGOUT = gql`
  mutation Logout {
    logout {
      success
    }
  }
`

export const LOGOUT_ALL_SESSIONS = gql`
  mutation LogoutOfAllSessions {
    logoutOfAllSessions {
      success
    }
  }
`

export const VIEWER_ME = gql`
  query Me {
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
  query ViewerGists {
    viewer {
      gists {
        gistId
        files {
          filename
          type
          language
          raw_url
          size
          truncated
          content
        }
        description
        isPublic
        url
        forks_url
        commits_url
        git_pull_url
        git_push_url
        html_url
        created_at
        updated_at
        comments
        history
      }
    }
  }
`

export const GET_GIST_BY_ID = gql`
  query GetGistById($gistId: String!) {
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
  mutation CreateGist($data: GistCreateInput) {
    createGist(data: $data) {
      gistId
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
  mutation UpdateGist($data: GistUpdateInput) {
    updateGist(data: $data) {
      gistId
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
  mutation DeleteGist($gistId: String!) {
    deleteGist(gistId: $gistId) {
      success
    }
  }
`

export const COUNTER_SUBSCRIPTION = gql`
  subscription Counter {
    counter {
      count
    }
  }
`
