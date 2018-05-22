/* @flow */

export type Loader = {
  load: (key: string | Array<string>) => Promise<any>,
  loadMany: (keys: Array<string>) => Promise<any>,
  clear: (key: string | Array<string>) => void
}

export type DataLoaderOptions = {
  cache?: boolean
}

export type GraphQLContext = {
  user: DBUser,
  loaders: {
    [key: string]: Loader
  }
}

export type Resolver = (
  parent: any,
  args: any,
  context: GraphQLContext,
  info: any
) => any

export type ResolverMap = {
  [key: string]: {
    [key: string]: Resolver
  }
}

// INPUT TYPES

export type GetUserInput = {
  id?: string,
  username?: string
}

export type SaveUserProviderInput = {
  userId: string,
  providerMethod: string,
  providerId: number,
  extraFields?: Object
}

// DB TYPES

export type DBUser = {
  id: string,
  email?: string,
  createdAt: Date,
  name: string,
  coverPhoto?: string,
  profilePhoto?: string,
  providerId?: ?string,
  githubProviderId?: ?string,
  githubUsername?: ?string,
  username: ?string,
  isOnline?: boolean,
  lastSeen?: ?Date,
  description?: ?string,
  website?: ?string,
  modifiedAt: ?Date
}

export type GithubUser = {
  id: string,
  name: string,
  bio: string,
  public_repos: number,
  public_gists: number
}

export type Gist = {
  url: string,
  forks_url: string,
  commits_url: string,
  id: string,
  git_pull_url: string,
  git_push_url: string,
  html_url: string,
  files: { [key: string]: File },
  public: boolean,
  created_at: string,
  updated_at: string,
  description: string,
  comments: number,
  user: null,
  comments_url: string,
  owner: Owner,
  fork_of?: Gist,
  forks: Fork[],
  history: History[],
  truncated: boolean
}

export type File = {
  filename: string,
  type: string,
  language: string,
  raw_url: string,
  size: number,
  truncated: boolean,
  content: string
}

export type Fork = {
  url: string,
  user: Owner,
  id: string,
  created_at: string,
  updated_at: string
}

export type Owner = {
  login: string,
  id: number,
  avatar_url: string,
  gravatar_id: string,
  url: string,
  html_url: string,
  followers_url: string,
  following_url: string,
  gists_url: string,
  starred_url: string,
  subscriptions_url: string,
  organizations_url: string,
  repos_url: string,
  events_url: string,
  received_events_url: string,
  type: string,
  site_admin: boolean
}

export type History = {
  user: Owner,
  version: string,
  committed_at: string,
  change_status: ChangeStatus,
  url: string
}

export type ChangeStatus = {
  total?: number,
  additions?: number,
  deletions?: number
}
