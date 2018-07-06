import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
  users: <T = User[]>(
    args: {
      where?: UserWhereInput
      orderBy?: UserOrderByInput
      skip?: Int
      after?: String
      before?: String
      first?: Int
      last?: Int
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  githubProfiles: <T = GithubProfile[]>(
    args: {
      where?: GithubProfileWhereInput
      orderBy?: GithubProfileOrderByInput
      skip?: Int
      after?: String
      before?: String
      first?: Int
      last?: Int
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  accessTokens: <T = AccessToken[]>(
    args: {
      where?: AccessTokenWhereInput
      orderBy?: AccessTokenOrderByInput
      skip?: Int
      after?: String
      before?: String
      first?: Int
      last?: Int
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  posts: <T = Post[]>(
    args: {
      where?: PostWhereInput
      orderBy?: PostOrderByInput
      skip?: Int
      after?: String
      before?: String
      first?: Int
      last?: Int
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  tags: <T = Tag[]>(
    args: {
      where?: TagWhereInput
      orderBy?: TagOrderByInput
      skip?: Int
      after?: String
      before?: String
      first?: Int
      last?: Int
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  comments: <T = Comment[]>(
    args: {
      where?: CommentWhereInput
      orderBy?: CommentOrderByInput
      skip?: Int
      after?: String
      before?: String
      first?: Int
      last?: Int
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  files: <T = File[]>(
    args: {
      where?: FileWhereInput
      orderBy?: FileOrderByInput
      skip?: Int
      after?: String
      before?: String
      first?: Int
      last?: Int
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  directories: <T = Directory[]>(
    args: {
      where?: DirectoryWhereInput
      orderBy?: DirectoryOrderByInput
      skip?: Int
      after?: String
      before?: String
      first?: Int
      last?: Int
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  messages: <T = Message[]>(
    args: {
      where?: MessageWhereInput
      orderBy?: MessageOrderByInput
      skip?: Int
      after?: String
      before?: String
      first?: Int
      last?: Int
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  notifications: <T = Notification[]>(
    args: {
      where?: NotificationWhereInput
      orderBy?: NotificationOrderByInput
      skip?: Int
      after?: String
      before?: String
      first?: Int
      last?: Int
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  user: <T = User | null>(
    args: { where: UserWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  githubProfile: <T = GithubProfile | null>(
    args: { where: GithubProfileWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  accessToken: <T = AccessToken | null>(
    args: { where: AccessTokenWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  post: <T = Post | null>(
    args: { where: PostWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  tag: <T = Tag | null>(
    args: { where: TagWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  comment: <T = Comment | null>(
    args: { where: CommentWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  file: <T = File | null>(
    args: { where: FileWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  directory: <T = Directory | null>(
    args: { where: DirectoryWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  message: <T = Message | null>(
    args: { where: MessageWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  notification: <T = Notification | null>(
    args: { where: NotificationWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  usersConnection: <T = UserConnection>(
    args: {
      where?: UserWhereInput
      orderBy?: UserOrderByInput
      skip?: Int
      after?: String
      before?: String
      first?: Int
      last?: Int
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  githubProfilesConnection: <T = GithubProfileConnection>(
    args: {
      where?: GithubProfileWhereInput
      orderBy?: GithubProfileOrderByInput
      skip?: Int
      after?: String
      before?: String
      first?: Int
      last?: Int
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  accessTokensConnection: <T = AccessTokenConnection>(
    args: {
      where?: AccessTokenWhereInput
      orderBy?: AccessTokenOrderByInput
      skip?: Int
      after?: String
      before?: String
      first?: Int
      last?: Int
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  postsConnection: <T = PostConnection>(
    args: {
      where?: PostWhereInput
      orderBy?: PostOrderByInput
      skip?: Int
      after?: String
      before?: String
      first?: Int
      last?: Int
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  tagsConnection: <T = TagConnection>(
    args: {
      where?: TagWhereInput
      orderBy?: TagOrderByInput
      skip?: Int
      after?: String
      before?: String
      first?: Int
      last?: Int
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  commentsConnection: <T = CommentConnection>(
    args: {
      where?: CommentWhereInput
      orderBy?: CommentOrderByInput
      skip?: Int
      after?: String
      before?: String
      first?: Int
      last?: Int
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  filesConnection: <T = FileConnection>(
    args: {
      where?: FileWhereInput
      orderBy?: FileOrderByInput
      skip?: Int
      after?: String
      before?: String
      first?: Int
      last?: Int
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  directoriesConnection: <T = DirectoryConnection>(
    args: {
      where?: DirectoryWhereInput
      orderBy?: DirectoryOrderByInput
      skip?: Int
      after?: String
      before?: String
      first?: Int
      last?: Int
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  messagesConnection: <T = MessageConnection>(
    args: {
      where?: MessageWhereInput
      orderBy?: MessageOrderByInput
      skip?: Int
      after?: String
      before?: String
      first?: Int
      last?: Int
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  notificationsConnection: <T = NotificationConnection>(
    args: {
      where?: NotificationWhereInput
      orderBy?: NotificationOrderByInput
      skip?: Int
      after?: String
      before?: String
      first?: Int
      last?: Int
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  node: <T = Node | null>(
    args: { id: ID_Output },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
}

export interface Mutation {
  createUser: <T = User>(
    args: { data: UserCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  createGithubProfile: <T = GithubProfile>(
    args: { data: GithubProfileCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  createAccessToken: <T = AccessToken>(
    args: { data: AccessTokenCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  createPost: <T = Post>(
    args: { data: PostCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  createTag: <T = Tag>(
    args: { data: TagCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  createComment: <T = Comment>(
    args: { data: CommentCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  createFile: <T = File>(
    args: { data: FileCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  createDirectory: <T = Directory>(
    args: { data: DirectoryCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  createMessage: <T = Message>(
    args: { data: MessageCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  createNotification: <T = Notification>(
    args: { data: NotificationCreateInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  updateUser: <T = User | null>(
    args: { data: UserUpdateInput; where: UserWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  updateGithubProfile: <T = GithubProfile | null>(
    args: {
      data: GithubProfileUpdateInput
      where: GithubProfileWhereUniqueInput
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  updateAccessToken: <T = AccessToken | null>(
    args: { data: AccessTokenUpdateInput; where: AccessTokenWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  updatePost: <T = Post | null>(
    args: { data: PostUpdateInput; where: PostWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  updateTag: <T = Tag | null>(
    args: { data: TagUpdateInput; where: TagWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  updateComment: <T = Comment | null>(
    args: { data: CommentUpdateInput; where: CommentWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  updateFile: <T = File | null>(
    args: { data: FileUpdateInput; where: FileWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  updateDirectory: <T = Directory | null>(
    args: { data: DirectoryUpdateInput; where: DirectoryWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  updateMessage: <T = Message | null>(
    args: { data: MessageUpdateInput; where: MessageWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  updateNotification: <T = Notification | null>(
    args: {
      data: NotificationUpdateInput
      where: NotificationWhereUniqueInput
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  deleteUser: <T = User | null>(
    args: { where: UserWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  deleteGithubProfile: <T = GithubProfile | null>(
    args: { where: GithubProfileWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  deleteAccessToken: <T = AccessToken | null>(
    args: { where: AccessTokenWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  deletePost: <T = Post | null>(
    args: { where: PostWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  deleteTag: <T = Tag | null>(
    args: { where: TagWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  deleteComment: <T = Comment | null>(
    args: { where: CommentWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  deleteFile: <T = File | null>(
    args: { where: FileWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  deleteDirectory: <T = Directory | null>(
    args: { where: DirectoryWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  deleteMessage: <T = Message | null>(
    args: { where: MessageWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  deleteNotification: <T = Notification | null>(
    args: { where: NotificationWhereUniqueInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  upsertUser: <T = User>(
    args: {
      where: UserWhereUniqueInput
      create: UserCreateInput
      update: UserUpdateInput
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  upsertGithubProfile: <T = GithubProfile>(
    args: {
      where: GithubProfileWhereUniqueInput
      create: GithubProfileCreateInput
      update: GithubProfileUpdateInput
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  upsertAccessToken: <T = AccessToken>(
    args: {
      where: AccessTokenWhereUniqueInput
      create: AccessTokenCreateInput
      update: AccessTokenUpdateInput
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  upsertPost: <T = Post>(
    args: {
      where: PostWhereUniqueInput
      create: PostCreateInput
      update: PostUpdateInput
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  upsertTag: <T = Tag>(
    args: {
      where: TagWhereUniqueInput
      create: TagCreateInput
      update: TagUpdateInput
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  upsertComment: <T = Comment>(
    args: {
      where: CommentWhereUniqueInput
      create: CommentCreateInput
      update: CommentUpdateInput
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  upsertFile: <T = File>(
    args: {
      where: FileWhereUniqueInput
      create: FileCreateInput
      update: FileUpdateInput
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  upsertDirectory: <T = Directory>(
    args: {
      where: DirectoryWhereUniqueInput
      create: DirectoryCreateInput
      update: DirectoryUpdateInput
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  upsertMessage: <T = Message>(
    args: {
      where: MessageWhereUniqueInput
      create: MessageCreateInput
      update: MessageUpdateInput
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  upsertNotification: <T = Notification>(
    args: {
      where: NotificationWhereUniqueInput
      create: NotificationCreateInput
      update: NotificationUpdateInput
    },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  updateManyUsers: <T = BatchPayload>(
    args: { data: UserUpdateInput; where?: UserWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  updateManyGithubProfiles: <T = BatchPayload>(
    args: { data: GithubProfileUpdateInput; where?: GithubProfileWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  updateManyAccessTokens: <T = BatchPayload>(
    args: { data: AccessTokenUpdateInput; where?: AccessTokenWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  updateManyPosts: <T = BatchPayload>(
    args: { data: PostUpdateInput; where?: PostWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  updateManyTags: <T = BatchPayload>(
    args: { data: TagUpdateInput; where?: TagWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  updateManyComments: <T = BatchPayload>(
    args: { data: CommentUpdateInput; where?: CommentWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  updateManyFiles: <T = BatchPayload>(
    args: { data: FileUpdateInput; where?: FileWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  updateManyDirectories: <T = BatchPayload>(
    args: { data: DirectoryUpdateInput; where?: DirectoryWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  updateManyMessages: <T = BatchPayload>(
    args: { data: MessageUpdateInput; where?: MessageWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  updateManyNotifications: <T = BatchPayload>(
    args: { data: NotificationUpdateInput; where?: NotificationWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  deleteManyUsers: <T = BatchPayload>(
    args: { where?: UserWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  deleteManyGithubProfiles: <T = BatchPayload>(
    args: { where?: GithubProfileWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  deleteManyAccessTokens: <T = BatchPayload>(
    args: { where?: AccessTokenWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  deleteManyPosts: <T = BatchPayload>(
    args: { where?: PostWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  deleteManyTags: <T = BatchPayload>(
    args: { where?: TagWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  deleteManyComments: <T = BatchPayload>(
    args: { where?: CommentWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  deleteManyFiles: <T = BatchPayload>(
    args: { where?: FileWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  deleteManyDirectories: <T = BatchPayload>(
    args: { where?: DirectoryWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  deleteManyMessages: <T = BatchPayload>(
    args: { where?: MessageWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
  deleteManyNotifications: <T = BatchPayload>(
    args: { where?: NotificationWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<T>
}

export interface Subscription {
  user: <T = UserSubscriptionPayload | null>(
    args: { where?: UserSubscriptionWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<AsyncIterator<T>>
  githubProfile: <T = GithubProfileSubscriptionPayload | null>(
    args: { where?: GithubProfileSubscriptionWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<AsyncIterator<T>>
  accessToken: <T = AccessTokenSubscriptionPayload | null>(
    args: { where?: AccessTokenSubscriptionWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<AsyncIterator<T>>
  post: <T = PostSubscriptionPayload | null>(
    args: { where?: PostSubscriptionWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<AsyncIterator<T>>
  tag: <T = TagSubscriptionPayload | null>(
    args: { where?: TagSubscriptionWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<AsyncIterator<T>>
  comment: <T = CommentSubscriptionPayload | null>(
    args: { where?: CommentSubscriptionWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<AsyncIterator<T>>
  file: <T = FileSubscriptionPayload | null>(
    args: { where?: FileSubscriptionWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<AsyncIterator<T>>
  directory: <T = DirectorySubscriptionPayload | null>(
    args: { where?: DirectorySubscriptionWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<AsyncIterator<T>>
  message: <T = MessageSubscriptionPayload | null>(
    args: { where?: MessageSubscriptionWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<AsyncIterator<T>>
  notification: <T = NotificationSubscriptionPayload | null>(
    args: { where?: NotificationSubscriptionWhereInput },
    info?: GraphQLResolveInfo | string,
    options?: Options
  ) => Promise<AsyncIterator<T>>
}

export interface Exists {
  User: (where?: UserWhereInput) => Promise<boolean>
  GithubProfile: (where?: GithubProfileWhereInput) => Promise<boolean>
  AccessToken: (where?: AccessTokenWhereInput) => Promise<boolean>
  Post: (where?: PostWhereInput) => Promise<boolean>
  Tag: (where?: TagWhereInput) => Promise<boolean>
  Comment: (where?: CommentWhereInput) => Promise<boolean>
  File: (where?: FileWhereInput) => Promise<boolean>
  Directory: (where?: DirectoryWhereInput) => Promise<boolean>
  Message: (where?: MessageWhereInput) => Promise<boolean>
  Notification: (where?: NotificationWhereInput) => Promise<boolean>
}

export interface Prisma {
  query: Query
  mutation: Mutation
  subscription: Subscription
  exists: Exists
  request: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>
  delegate(
    operation: 'query' | 'mutation',
    fieldName: string,
    args: {
      [key: string]: any
    },
    infoOrQuery?: GraphQLResolveInfo | string,
    options?: Options
  ): Promise<any>
  delegateSubscription(
    fieldName: string,
    args?: {
      [key: string]: any
    },
    infoOrQuery?: GraphQLResolveInfo | string,
    options?: Options
  ): Promise<AsyncIterator<any>>
  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers
}

export interface BindingConstructor<T> {
  new (options: BasePrismaOptions): T
}
/**
 * Type Defs
 */

const typeDefs = `type AccessToken implements Node {
  id: ID!
  scopes: [String!]
  token: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""A connection to a list of items."""
type AccessTokenConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [AccessTokenEdge]!
  aggregate: AggregateAccessToken!
}

input AccessTokenCreateInput {
  token: String!
  scopes: AccessTokenCreatescopesInput
}

input AccessTokenCreateManyInput {
  create: [AccessTokenCreateInput!]
  connect: [AccessTokenWhereUniqueInput!]
}

input AccessTokenCreatescopesInput {
  set: [String!]
}

"""An edge in a connection."""
type AccessTokenEdge {
  """The item at the end of the edge."""
  node: AccessToken!

  """A cursor for use in pagination."""
  cursor: String!
}

enum AccessTokenOrderByInput {
  id_ASC
  id_DESC
  token_ASC
  token_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AccessTokenPreviousValues {
  id: ID!
  scopes: [String!]
  token: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type AccessTokenSubscriptionPayload {
  mutation: MutationType!
  node: AccessToken
  updatedFields: [String!]
  previousValues: AccessTokenPreviousValues
}

input AccessTokenSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [AccessTokenSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [AccessTokenSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [AccessTokenSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: AccessTokenWhereInput
}

input AccessTokenUpdateDataInput {
  token: String
  scopes: AccessTokenUpdatescopesInput
}

input AccessTokenUpdateInput {
  token: String
  scopes: AccessTokenUpdatescopesInput
}

input AccessTokenUpdateManyInput {
  create: [AccessTokenCreateInput!]
  connect: [AccessTokenWhereUniqueInput!]
  disconnect: [AccessTokenWhereUniqueInput!]
  delete: [AccessTokenWhereUniqueInput!]
  update: [AccessTokenUpdateWithWhereUniqueNestedInput!]
  upsert: [AccessTokenUpsertWithWhereUniqueNestedInput!]
}

input AccessTokenUpdatescopesInput {
  set: [String!]
}

input AccessTokenUpdateWithWhereUniqueNestedInput {
  where: AccessTokenWhereUniqueInput!
  data: AccessTokenUpdateDataInput!
}

input AccessTokenUpsertWithWhereUniqueNestedInput {
  where: AccessTokenWhereUniqueInput!
  update: AccessTokenUpdateDataInput!
  create: AccessTokenCreateInput!
}

input AccessTokenWhereInput {
  """Logical AND on all given filters."""
  AND: [AccessTokenWhereInput!]

  """Logical OR on all given filters."""
  OR: [AccessTokenWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [AccessTokenWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  token: String

  """All values that are not equal to given value."""
  token_not: String

  """All values that are contained in given list."""
  token_in: [String!]

  """All values that are not contained in given list."""
  token_not_in: [String!]

  """All values less than the given value."""
  token_lt: String

  """All values less than or equal the given value."""
  token_lte: String

  """All values greater than the given value."""
  token_gt: String

  """All values greater than or equal the given value."""
  token_gte: String

  """All values containing the given string."""
  token_contains: String

  """All values not containing the given string."""
  token_not_contains: String

  """All values starting with the given string."""
  token_starts_with: String

  """All values not starting with the given string."""
  token_not_starts_with: String

  """All values ending with the given string."""
  token_ends_with: String

  """All values not ending with the given string."""
  token_not_ends_with: String
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
}

input AccessTokenWhereUniqueInput {
  id: ID
}

type AggregateAccessToken {
  count: Int!
}

type AggregateComment {
  count: Int!
}

type AggregateDirectory {
  count: Int!
}

type AggregateFile {
  count: Int!
}

type AggregateGithubProfile {
  count: Int!
}

type AggregateMessage {
  count: Int!
}

type AggregateNotification {
  count: Int!
}

type AggregatePost {
  count: Int!
}

type AggregateTag {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

type Comment implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  author(where: UserWhereInput): User!
  content: String
  post(where: PostWhereInput): Post!
}

"""A connection to a list of items."""
type CommentConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [CommentEdge]!
  aggregate: AggregateComment!
}

input CommentCreateInput {
  content: String
  author: UserCreateOneInput!
  post: PostCreateOneWithoutCommentsInput!
}

input CommentCreateManyWithoutPostInput {
  create: [CommentCreateWithoutPostInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateWithoutPostInput {
  content: String
  author: UserCreateOneInput!
}

"""An edge in a connection."""
type CommentEdge {
  """The item at the end of the edge."""
  node: Comment!

  """A cursor for use in pagination."""
  cursor: String!
}

enum CommentOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  content_ASC
  content_DESC
}

type CommentPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  content: String
}

type CommentSubscriptionPayload {
  mutation: MutationType!
  node: Comment
  updatedFields: [String!]
  previousValues: CommentPreviousValues
}

input CommentSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [CommentSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [CommentSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [CommentSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: CommentWhereInput
}

input CommentUpdateInput {
  content: String
  author: UserUpdateOneInput
  post: PostUpdateOneWithoutCommentsInput
}

input CommentUpdateManyWithoutPostInput {
  create: [CommentCreateWithoutPostInput!]
  connect: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  delete: [CommentWhereUniqueInput!]
  update: [CommentUpdateWithWhereUniqueWithoutPostInput!]
  upsert: [CommentUpsertWithWhereUniqueWithoutPostInput!]
}

input CommentUpdateWithoutPostDataInput {
  content: String
  author: UserUpdateOneInput
}

input CommentUpdateWithWhereUniqueWithoutPostInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateWithoutPostDataInput!
}

input CommentUpsertWithWhereUniqueWithoutPostInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateWithoutPostDataInput!
  create: CommentCreateWithoutPostInput!
}

input CommentWhereInput {
  """Logical AND on all given filters."""
  AND: [CommentWhereInput!]

  """Logical OR on all given filters."""
  OR: [CommentWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [CommentWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  content: String

  """All values that are not equal to given value."""
  content_not: String

  """All values that are contained in given list."""
  content_in: [String!]

  """All values that are not contained in given list."""
  content_not_in: [String!]

  """All values less than the given value."""
  content_lt: String

  """All values less than or equal the given value."""
  content_lte: String

  """All values greater than the given value."""
  content_gt: String

  """All values greater than or equal the given value."""
  content_gte: String

  """All values containing the given string."""
  content_contains: String

  """All values not containing the given string."""
  content_not_contains: String

  """All values starting with the given string."""
  content_starts_with: String

  """All values not starting with the given string."""
  content_not_starts_with: String

  """All values ending with the given string."""
  content_ends_with: String

  """All values not ending with the given string."""
  content_not_ends_with: String
  author: UserWhereInput
  post: PostWhereInput
}

input CommentWhereUniqueInput {
  id: ID
}

scalar DateTime

type Directory implements Node {
  id: ID!
  name: String
  children(where: FileWhereInput, orderBy: FileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [File!]
  isOpen: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""A connection to a list of items."""
type DirectoryConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [DirectoryEdge]!
  aggregate: AggregateDirectory!
}

input DirectoryCreateInput {
  name: String
  isOpen: Boolean
  children: FileCreateManyWithoutParentInput
}

input DirectoryCreateOneWithoutChildrenInput {
  create: DirectoryCreateWithoutChildrenInput
  connect: DirectoryWhereUniqueInput
}

input DirectoryCreateWithoutChildrenInput {
  name: String
  isOpen: Boolean
}

"""An edge in a connection."""
type DirectoryEdge {
  """The item at the end of the edge."""
  node: Directory!

  """A cursor for use in pagination."""
  cursor: String!
}

enum DirectoryOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  isOpen_ASC
  isOpen_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type DirectoryPreviousValues {
  id: ID!
  name: String
  isOpen: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type DirectorySubscriptionPayload {
  mutation: MutationType!
  node: Directory
  updatedFields: [String!]
  previousValues: DirectoryPreviousValues
}

input DirectorySubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [DirectorySubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [DirectorySubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [DirectorySubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: DirectoryWhereInput
}

input DirectoryUpdateInput {
  name: String
  isOpen: Boolean
  children: FileUpdateManyWithoutParentInput
}

input DirectoryUpdateOneWithoutChildrenInput {
  create: DirectoryCreateWithoutChildrenInput
  connect: DirectoryWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: DirectoryUpdateWithoutChildrenDataInput
  upsert: DirectoryUpsertWithoutChildrenInput
}

input DirectoryUpdateWithoutChildrenDataInput {
  name: String
  isOpen: Boolean
}

input DirectoryUpsertWithoutChildrenInput {
  update: DirectoryUpdateWithoutChildrenDataInput!
  create: DirectoryCreateWithoutChildrenInput!
}

input DirectoryWhereInput {
  """Logical AND on all given filters."""
  AND: [DirectoryWhereInput!]

  """Logical OR on all given filters."""
  OR: [DirectoryWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [DirectoryWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  isOpen: Boolean

  """All values that are not equal to given value."""
  isOpen_not: Boolean
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  children_every: FileWhereInput
  children_some: FileWhereInput
  children_none: FileWhereInput
}

input DirectoryWhereUniqueInput {
  id: ID
}

type File implements Node {
  id: ID!
  name: String!
  type: FILE_TYPE!
  data: String!
  parent(where: DirectoryWhereInput): Directory
  isDirty: Boolean!
  isTransient: Boolean!
  bufferType: FILE_TYPE
  description: String
  uuid: String
  contentType: String
  s3Url: String
  size: Int
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum FILE_TYPE {
  JAVASCRIPT
  TYPESCRIPT
  HTML
  CSS
  C
  CPP
  RUST
  WAT
  WASM
  DIRECTORY
  LOG
  X86
  MARKDOWN
  JSON
  DOT
  TOML
  UNKNOWN
}

"""A connection to a list of items."""
type FileConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [FileEdge]!
  aggregate: AggregateFile!
}

input FileCreateInput {
  name: String!
  type: FILE_TYPE
  data: String
  isDirty: Boolean
  isTransient: Boolean
  bufferType: FILE_TYPE
  description: String
  uuid: String
  contentType: String
  s3Url: String
  size: Int
  parent: DirectoryCreateOneWithoutChildrenInput
}

input FileCreateManyWithoutParentInput {
  create: [FileCreateWithoutParentInput!]
  connect: [FileWhereUniqueInput!]
}

input FileCreateOneInput {
  create: FileCreateInput
  connect: FileWhereUniqueInput
}

input FileCreateWithoutParentInput {
  name: String!
  type: FILE_TYPE
  data: String
  isDirty: Boolean
  isTransient: Boolean
  bufferType: FILE_TYPE
  description: String
  uuid: String
  contentType: String
  s3Url: String
  size: Int
}

"""An edge in a connection."""
type FileEdge {
  """The item at the end of the edge."""
  node: File!

  """A cursor for use in pagination."""
  cursor: String!
}

enum FileOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  type_ASC
  type_DESC
  data_ASC
  data_DESC
  isDirty_ASC
  isDirty_DESC
  isTransient_ASC
  isTransient_DESC
  bufferType_ASC
  bufferType_DESC
  description_ASC
  description_DESC
  uuid_ASC
  uuid_DESC
  contentType_ASC
  contentType_DESC
  s3Url_ASC
  s3Url_DESC
  size_ASC
  size_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type FilePreviousValues {
  id: ID!
  name: String!
  type: FILE_TYPE!
  data: String!
  isDirty: Boolean!
  isTransient: Boolean!
  bufferType: FILE_TYPE
  description: String
  uuid: String
  contentType: String
  s3Url: String
  size: Int
  createdAt: DateTime!
  updatedAt: DateTime!
}

type FileSubscriptionPayload {
  mutation: MutationType!
  node: File
  updatedFields: [String!]
  previousValues: FilePreviousValues
}

input FileSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [FileSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [FileSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [FileSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: FileWhereInput
}

input FileUpdateDataInput {
  name: String
  type: FILE_TYPE
  data: String
  isDirty: Boolean
  isTransient: Boolean
  bufferType: FILE_TYPE
  description: String
  uuid: String
  contentType: String
  s3Url: String
  size: Int
  parent: DirectoryUpdateOneWithoutChildrenInput
}

input FileUpdateInput {
  name: String
  type: FILE_TYPE
  data: String
  isDirty: Boolean
  isTransient: Boolean
  bufferType: FILE_TYPE
  description: String
  uuid: String
  contentType: String
  s3Url: String
  size: Int
  parent: DirectoryUpdateOneWithoutChildrenInput
}

input FileUpdateManyWithoutParentInput {
  create: [FileCreateWithoutParentInput!]
  connect: [FileWhereUniqueInput!]
  disconnect: [FileWhereUniqueInput!]
  delete: [FileWhereUniqueInput!]
  update: [FileUpdateWithWhereUniqueWithoutParentInput!]
  upsert: [FileUpsertWithWhereUniqueWithoutParentInput!]
}

input FileUpdateOneInput {
  create: FileCreateInput
  connect: FileWhereUniqueInput
  delete: Boolean
  update: FileUpdateDataInput
  upsert: FileUpsertNestedInput
}

input FileUpdateWithoutParentDataInput {
  name: String
  type: FILE_TYPE
  data: String
  isDirty: Boolean
  isTransient: Boolean
  bufferType: FILE_TYPE
  description: String
  uuid: String
  contentType: String
  s3Url: String
  size: Int
}

input FileUpdateWithWhereUniqueWithoutParentInput {
  where: FileWhereUniqueInput!
  data: FileUpdateWithoutParentDataInput!
}

input FileUpsertNestedInput {
  update: FileUpdateDataInput!
  create: FileCreateInput!
}

input FileUpsertWithWhereUniqueWithoutParentInput {
  where: FileWhereUniqueInput!
  update: FileUpdateWithoutParentDataInput!
  create: FileCreateWithoutParentInput!
}

input FileWhereInput {
  """Logical AND on all given filters."""
  AND: [FileWhereInput!]

  """Logical OR on all given filters."""
  OR: [FileWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [FileWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  type: FILE_TYPE

  """All values that are not equal to given value."""
  type_not: FILE_TYPE

  """All values that are contained in given list."""
  type_in: [FILE_TYPE!]

  """All values that are not contained in given list."""
  type_not_in: [FILE_TYPE!]
  data: String

  """All values that are not equal to given value."""
  data_not: String

  """All values that are contained in given list."""
  data_in: [String!]

  """All values that are not contained in given list."""
  data_not_in: [String!]

  """All values less than the given value."""
  data_lt: String

  """All values less than or equal the given value."""
  data_lte: String

  """All values greater than the given value."""
  data_gt: String

  """All values greater than or equal the given value."""
  data_gte: String

  """All values containing the given string."""
  data_contains: String

  """All values not containing the given string."""
  data_not_contains: String

  """All values starting with the given string."""
  data_starts_with: String

  """All values not starting with the given string."""
  data_not_starts_with: String

  """All values ending with the given string."""
  data_ends_with: String

  """All values not ending with the given string."""
  data_not_ends_with: String
  isDirty: Boolean

  """All values that are not equal to given value."""
  isDirty_not: Boolean
  isTransient: Boolean

  """All values that are not equal to given value."""
  isTransient_not: Boolean
  bufferType: FILE_TYPE

  """All values that are not equal to given value."""
  bufferType_not: FILE_TYPE

  """All values that are contained in given list."""
  bufferType_in: [FILE_TYPE!]

  """All values that are not contained in given list."""
  bufferType_not_in: [FILE_TYPE!]
  description: String

  """All values that are not equal to given value."""
  description_not: String

  """All values that are contained in given list."""
  description_in: [String!]

  """All values that are not contained in given list."""
  description_not_in: [String!]

  """All values less than the given value."""
  description_lt: String

  """All values less than or equal the given value."""
  description_lte: String

  """All values greater than the given value."""
  description_gt: String

  """All values greater than or equal the given value."""
  description_gte: String

  """All values containing the given string."""
  description_contains: String

  """All values not containing the given string."""
  description_not_contains: String

  """All values starting with the given string."""
  description_starts_with: String

  """All values not starting with the given string."""
  description_not_starts_with: String

  """All values ending with the given string."""
  description_ends_with: String

  """All values not ending with the given string."""
  description_not_ends_with: String
  uuid: String

  """All values that are not equal to given value."""
  uuid_not: String

  """All values that are contained in given list."""
  uuid_in: [String!]

  """All values that are not contained in given list."""
  uuid_not_in: [String!]

  """All values less than the given value."""
  uuid_lt: String

  """All values less than or equal the given value."""
  uuid_lte: String

  """All values greater than the given value."""
  uuid_gt: String

  """All values greater than or equal the given value."""
  uuid_gte: String

  """All values containing the given string."""
  uuid_contains: String

  """All values not containing the given string."""
  uuid_not_contains: String

  """All values starting with the given string."""
  uuid_starts_with: String

  """All values not starting with the given string."""
  uuid_not_starts_with: String

  """All values ending with the given string."""
  uuid_ends_with: String

  """All values not ending with the given string."""
  uuid_not_ends_with: String
  contentType: String

  """All values that are not equal to given value."""
  contentType_not: String

  """All values that are contained in given list."""
  contentType_in: [String!]

  """All values that are not contained in given list."""
  contentType_not_in: [String!]

  """All values less than the given value."""
  contentType_lt: String

  """All values less than or equal the given value."""
  contentType_lte: String

  """All values greater than the given value."""
  contentType_gt: String

  """All values greater than or equal the given value."""
  contentType_gte: String

  """All values containing the given string."""
  contentType_contains: String

  """All values not containing the given string."""
  contentType_not_contains: String

  """All values starting with the given string."""
  contentType_starts_with: String

  """All values not starting with the given string."""
  contentType_not_starts_with: String

  """All values ending with the given string."""
  contentType_ends_with: String

  """All values not ending with the given string."""
  contentType_not_ends_with: String
  s3Url: String

  """All values that are not equal to given value."""
  s3Url_not: String

  """All values that are contained in given list."""
  s3Url_in: [String!]

  """All values that are not contained in given list."""
  s3Url_not_in: [String!]

  """All values less than the given value."""
  s3Url_lt: String

  """All values less than or equal the given value."""
  s3Url_lte: String

  """All values greater than the given value."""
  s3Url_gt: String

  """All values greater than or equal the given value."""
  s3Url_gte: String

  """All values containing the given string."""
  s3Url_contains: String

  """All values not containing the given string."""
  s3Url_not_contains: String

  """All values starting with the given string."""
  s3Url_starts_with: String

  """All values not starting with the given string."""
  s3Url_not_starts_with: String

  """All values ending with the given string."""
  s3Url_ends_with: String

  """All values not ending with the given string."""
  s3Url_not_ends_with: String
  size: Int

  """All values that are not equal to given value."""
  size_not: Int

  """All values that are contained in given list."""
  size_in: [Int!]

  """All values that are not contained in given list."""
  size_not_in: [Int!]

  """All values less than the given value."""
  size_lt: Int

  """All values less than or equal the given value."""
  size_lte: Int

  """All values greater than the given value."""
  size_gt: Int

  """All values greater than or equal the given value."""
  size_gte: Int
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  parent: DirectoryWhereInput
}

input FileWhereUniqueInput {
  id: ID
  uuid: String
  s3Url: String
}

type GithubProfile {
  githubUserId: Int!
  username: String!
  name: String
  bio: String
  website: String
  email: String
  profilePhoto: String
  accessTokens(where: AccessTokenWhereInput, orderBy: AccessTokenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AccessToken!]
}

"""A connection to a list of items."""
type GithubProfileConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [GithubProfileEdge]!
  aggregate: AggregateGithubProfile!
}

input GithubProfileCreateInput {
  githubUserId: Int!
  username: String!
  name: String
  bio: String
  website: String
  email: String
  profilePhoto: String
  accessTokens: AccessTokenCreateManyInput
}

input GithubProfileCreateOneInput {
  create: GithubProfileCreateInput
  connect: GithubProfileWhereUniqueInput
}

"""An edge in a connection."""
type GithubProfileEdge {
  """The item at the end of the edge."""
  node: GithubProfile!

  """A cursor for use in pagination."""
  cursor: String!
}

enum GithubProfileOrderByInput {
  githubUserId_ASC
  githubUserId_DESC
  username_ASC
  username_DESC
  name_ASC
  name_DESC
  bio_ASC
  bio_DESC
  website_ASC
  website_DESC
  email_ASC
  email_DESC
  profilePhoto_ASC
  profilePhoto_DESC
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type GithubProfilePreviousValues {
  githubUserId: Int!
  username: String!
  name: String
  bio: String
  website: String
  email: String
  profilePhoto: String
}

type GithubProfileSubscriptionPayload {
  mutation: MutationType!
  node: GithubProfile
  updatedFields: [String!]
  previousValues: GithubProfilePreviousValues
}

input GithubProfileSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [GithubProfileSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [GithubProfileSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [GithubProfileSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: GithubProfileWhereInput
}

input GithubProfileUpdateDataInput {
  githubUserId: Int
  username: String
  name: String
  bio: String
  website: String
  email: String
  profilePhoto: String
  accessTokens: AccessTokenUpdateManyInput
}

input GithubProfileUpdateInput {
  githubUserId: Int
  username: String
  name: String
  bio: String
  website: String
  email: String
  profilePhoto: String
  accessTokens: AccessTokenUpdateManyInput
}

input GithubProfileUpdateOneInput {
  create: GithubProfileCreateInput
  connect: GithubProfileWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: GithubProfileUpdateDataInput
  upsert: GithubProfileUpsertNestedInput
}

input GithubProfileUpsertNestedInput {
  update: GithubProfileUpdateDataInput!
  create: GithubProfileCreateInput!
}

input GithubProfileWhereInput {
  """Logical AND on all given filters."""
  AND: [GithubProfileWhereInput!]

  """Logical OR on all given filters."""
  OR: [GithubProfileWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [GithubProfileWhereInput!]
  githubUserId: Int

  """All values that are not equal to given value."""
  githubUserId_not: Int

  """All values that are contained in given list."""
  githubUserId_in: [Int!]

  """All values that are not contained in given list."""
  githubUserId_not_in: [Int!]

  """All values less than the given value."""
  githubUserId_lt: Int

  """All values less than or equal the given value."""
  githubUserId_lte: Int

  """All values greater than the given value."""
  githubUserId_gt: Int

  """All values greater than or equal the given value."""
  githubUserId_gte: Int
  username: String

  """All values that are not equal to given value."""
  username_not: String

  """All values that are contained in given list."""
  username_in: [String!]

  """All values that are not contained in given list."""
  username_not_in: [String!]

  """All values less than the given value."""
  username_lt: String

  """All values less than or equal the given value."""
  username_lte: String

  """All values greater than the given value."""
  username_gt: String

  """All values greater than or equal the given value."""
  username_gte: String

  """All values containing the given string."""
  username_contains: String

  """All values not containing the given string."""
  username_not_contains: String

  """All values starting with the given string."""
  username_starts_with: String

  """All values not starting with the given string."""
  username_not_starts_with: String

  """All values ending with the given string."""
  username_ends_with: String

  """All values not ending with the given string."""
  username_not_ends_with: String
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  bio: String

  """All values that are not equal to given value."""
  bio_not: String

  """All values that are contained in given list."""
  bio_in: [String!]

  """All values that are not contained in given list."""
  bio_not_in: [String!]

  """All values less than the given value."""
  bio_lt: String

  """All values less than or equal the given value."""
  bio_lte: String

  """All values greater than the given value."""
  bio_gt: String

  """All values greater than or equal the given value."""
  bio_gte: String

  """All values containing the given string."""
  bio_contains: String

  """All values not containing the given string."""
  bio_not_contains: String

  """All values starting with the given string."""
  bio_starts_with: String

  """All values not starting with the given string."""
  bio_not_starts_with: String

  """All values ending with the given string."""
  bio_ends_with: String

  """All values not ending with the given string."""
  bio_not_ends_with: String
  website: String

  """All values that are not equal to given value."""
  website_not: String

  """All values that are contained in given list."""
  website_in: [String!]

  """All values that are not contained in given list."""
  website_not_in: [String!]

  """All values less than the given value."""
  website_lt: String

  """All values less than or equal the given value."""
  website_lte: String

  """All values greater than the given value."""
  website_gt: String

  """All values greater than or equal the given value."""
  website_gte: String

  """All values containing the given string."""
  website_contains: String

  """All values not containing the given string."""
  website_not_contains: String

  """All values starting with the given string."""
  website_starts_with: String

  """All values not starting with the given string."""
  website_not_starts_with: String

  """All values ending with the given string."""
  website_ends_with: String

  """All values not ending with the given string."""
  website_not_ends_with: String
  email: String

  """All values that are not equal to given value."""
  email_not: String

  """All values that are contained in given list."""
  email_in: [String!]

  """All values that are not contained in given list."""
  email_not_in: [String!]

  """All values less than the given value."""
  email_lt: String

  """All values less than or equal the given value."""
  email_lte: String

  """All values greater than the given value."""
  email_gt: String

  """All values greater than or equal the given value."""
  email_gte: String

  """All values containing the given string."""
  email_contains: String

  """All values not containing the given string."""
  email_not_contains: String

  """All values starting with the given string."""
  email_starts_with: String

  """All values not starting with the given string."""
  email_not_starts_with: String

  """All values ending with the given string."""
  email_ends_with: String

  """All values not ending with the given string."""
  email_not_ends_with: String
  profilePhoto: String

  """All values that are not equal to given value."""
  profilePhoto_not: String

  """All values that are contained in given list."""
  profilePhoto_in: [String!]

  """All values that are not contained in given list."""
  profilePhoto_not_in: [String!]

  """All values less than the given value."""
  profilePhoto_lt: String

  """All values less than or equal the given value."""
  profilePhoto_lte: String

  """All values greater than the given value."""
  profilePhoto_gt: String

  """All values greater than or equal the given value."""
  profilePhoto_gte: String

  """All values containing the given string."""
  profilePhoto_contains: String

  """All values not containing the given string."""
  profilePhoto_not_contains: String

  """All values starting with the given string."""
  profilePhoto_starts_with: String

  """All values not starting with the given string."""
  profilePhoto_not_starts_with: String

  """All values ending with the given string."""
  profilePhoto_ends_with: String

  """All values not ending with the given string."""
  profilePhoto_not_ends_with: String
  accessTokens_every: AccessTokenWhereInput
  accessTokens_some: AccessTokenWhereInput
  accessTokens_none: AccessTokenWhereInput
}

input GithubProfileWhereUniqueInput {
  githubUserId: Int
  username: String
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Message implements Node {
  id: ID!
  createdAt: DateTime!
  from(where: UserWhereInput): User!
  to(where: UserWhereInput): User!
  deliveredAt: DateTime!
  readAt: DateTime
}

"""A connection to a list of items."""
type MessageConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [MessageEdge]!
  aggregate: AggregateMessage!
}

input MessageCreateInput {
  deliveredAt: DateTime!
  readAt: DateTime
  from: UserCreateOneWithoutSentMessagesInput!
  to: UserCreateOneWithoutReceivedMessagesInput!
}

input MessageCreateManyWithoutFromInput {
  create: [MessageCreateWithoutFromInput!]
  connect: [MessageWhereUniqueInput!]
}

input MessageCreateManyWithoutToInput {
  create: [MessageCreateWithoutToInput!]
  connect: [MessageWhereUniqueInput!]
}

input MessageCreateWithoutFromInput {
  deliveredAt: DateTime!
  readAt: DateTime
  to: UserCreateOneWithoutReceivedMessagesInput!
}

input MessageCreateWithoutToInput {
  deliveredAt: DateTime!
  readAt: DateTime
  from: UserCreateOneWithoutSentMessagesInput!
}

"""An edge in a connection."""
type MessageEdge {
  """The item at the end of the edge."""
  node: Message!

  """A cursor for use in pagination."""
  cursor: String!
}

enum MessageOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  deliveredAt_ASC
  deliveredAt_DESC
  readAt_ASC
  readAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type MessagePreviousValues {
  id: ID!
  createdAt: DateTime!
  deliveredAt: DateTime!
  readAt: DateTime
}

type MessageSubscriptionPayload {
  mutation: MutationType!
  node: Message
  updatedFields: [String!]
  previousValues: MessagePreviousValues
}

input MessageSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [MessageSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [MessageSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [MessageSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: MessageWhereInput
}

input MessageUpdateInput {
  deliveredAt: DateTime
  readAt: DateTime
  from: UserUpdateOneWithoutSentMessagesInput
  to: UserUpdateOneWithoutReceivedMessagesInput
}

input MessageUpdateManyWithoutFromInput {
  create: [MessageCreateWithoutFromInput!]
  connect: [MessageWhereUniqueInput!]
  disconnect: [MessageWhereUniqueInput!]
  delete: [MessageWhereUniqueInput!]
  update: [MessageUpdateWithWhereUniqueWithoutFromInput!]
  upsert: [MessageUpsertWithWhereUniqueWithoutFromInput!]
}

input MessageUpdateManyWithoutToInput {
  create: [MessageCreateWithoutToInput!]
  connect: [MessageWhereUniqueInput!]
  disconnect: [MessageWhereUniqueInput!]
  delete: [MessageWhereUniqueInput!]
  update: [MessageUpdateWithWhereUniqueWithoutToInput!]
  upsert: [MessageUpsertWithWhereUniqueWithoutToInput!]
}

input MessageUpdateWithoutFromDataInput {
  deliveredAt: DateTime
  readAt: DateTime
  to: UserUpdateOneWithoutReceivedMessagesInput
}

input MessageUpdateWithoutToDataInput {
  deliveredAt: DateTime
  readAt: DateTime
  from: UserUpdateOneWithoutSentMessagesInput
}

input MessageUpdateWithWhereUniqueWithoutFromInput {
  where: MessageWhereUniqueInput!
  data: MessageUpdateWithoutFromDataInput!
}

input MessageUpdateWithWhereUniqueWithoutToInput {
  where: MessageWhereUniqueInput!
  data: MessageUpdateWithoutToDataInput!
}

input MessageUpsertWithWhereUniqueWithoutFromInput {
  where: MessageWhereUniqueInput!
  update: MessageUpdateWithoutFromDataInput!
  create: MessageCreateWithoutFromInput!
}

input MessageUpsertWithWhereUniqueWithoutToInput {
  where: MessageWhereUniqueInput!
  update: MessageUpdateWithoutToDataInput!
  create: MessageCreateWithoutToInput!
}

input MessageWhereInput {
  """Logical AND on all given filters."""
  AND: [MessageWhereInput!]

  """Logical OR on all given filters."""
  OR: [MessageWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [MessageWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  deliveredAt: DateTime

  """All values that are not equal to given value."""
  deliveredAt_not: DateTime

  """All values that are contained in given list."""
  deliveredAt_in: [DateTime!]

  """All values that are not contained in given list."""
  deliveredAt_not_in: [DateTime!]

  """All values less than the given value."""
  deliveredAt_lt: DateTime

  """All values less than or equal the given value."""
  deliveredAt_lte: DateTime

  """All values greater than the given value."""
  deliveredAt_gt: DateTime

  """All values greater than or equal the given value."""
  deliveredAt_gte: DateTime
  readAt: DateTime

  """All values that are not equal to given value."""
  readAt_not: DateTime

  """All values that are contained in given list."""
  readAt_in: [DateTime!]

  """All values that are not contained in given list."""
  readAt_not_in: [DateTime!]

  """All values less than the given value."""
  readAt_lt: DateTime

  """All values less than or equal the given value."""
  readAt_lte: DateTime

  """All values greater than the given value."""
  readAt_gt: DateTime

  """All values greater than or equal the given value."""
  readAt_gte: DateTime
  from: UserWhereInput
  to: UserWhereInput
}

input MessageWhereUniqueInput {
  id: ID
}

type Mutation {
  createUser(data: UserCreateInput!): User!
  createGithubProfile(data: GithubProfileCreateInput!): GithubProfile!
  createAccessToken(data: AccessTokenCreateInput!): AccessToken!
  createPost(data: PostCreateInput!): Post!
  createTag(data: TagCreateInput!): Tag!
  createComment(data: CommentCreateInput!): Comment!
  createFile(data: FileCreateInput!): File!
  createDirectory(data: DirectoryCreateInput!): Directory!
  createMessage(data: MessageCreateInput!): Message!
  createNotification(data: NotificationCreateInput!): Notification!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateGithubProfile(data: GithubProfileUpdateInput!, where: GithubProfileWhereUniqueInput!): GithubProfile
  updateAccessToken(data: AccessTokenUpdateInput!, where: AccessTokenWhereUniqueInput!): AccessToken
  updatePost(data: PostUpdateInput!, where: PostWhereUniqueInput!): Post
  updateTag(data: TagUpdateInput!, where: TagWhereUniqueInput!): Tag
  updateComment(data: CommentUpdateInput!, where: CommentWhereUniqueInput!): Comment
  updateFile(data: FileUpdateInput!, where: FileWhereUniqueInput!): File
  updateDirectory(data: DirectoryUpdateInput!, where: DirectoryWhereUniqueInput!): Directory
  updateMessage(data: MessageUpdateInput!, where: MessageWhereUniqueInput!): Message
  updateNotification(data: NotificationUpdateInput!, where: NotificationWhereUniqueInput!): Notification
  deleteUser(where: UserWhereUniqueInput!): User
  deleteGithubProfile(where: GithubProfileWhereUniqueInput!): GithubProfile
  deleteAccessToken(where: AccessTokenWhereUniqueInput!): AccessToken
  deletePost(where: PostWhereUniqueInput!): Post
  deleteTag(where: TagWhereUniqueInput!): Tag
  deleteComment(where: CommentWhereUniqueInput!): Comment
  deleteFile(where: FileWhereUniqueInput!): File
  deleteDirectory(where: DirectoryWhereUniqueInput!): Directory
  deleteMessage(where: MessageWhereUniqueInput!): Message
  deleteNotification(where: NotificationWhereUniqueInput!): Notification
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertGithubProfile(where: GithubProfileWhereUniqueInput!, create: GithubProfileCreateInput!, update: GithubProfileUpdateInput!): GithubProfile!
  upsertAccessToken(where: AccessTokenWhereUniqueInput!, create: AccessTokenCreateInput!, update: AccessTokenUpdateInput!): AccessToken!
  upsertPost(where: PostWhereUniqueInput!, create: PostCreateInput!, update: PostUpdateInput!): Post!
  upsertTag(where: TagWhereUniqueInput!, create: TagCreateInput!, update: TagUpdateInput!): Tag!
  upsertComment(where: CommentWhereUniqueInput!, create: CommentCreateInput!, update: CommentUpdateInput!): Comment!
  upsertFile(where: FileWhereUniqueInput!, create: FileCreateInput!, update: FileUpdateInput!): File!
  upsertDirectory(where: DirectoryWhereUniqueInput!, create: DirectoryCreateInput!, update: DirectoryUpdateInput!): Directory!
  upsertMessage(where: MessageWhereUniqueInput!, create: MessageCreateInput!, update: MessageUpdateInput!): Message!
  upsertNotification(where: NotificationWhereUniqueInput!, create: NotificationCreateInput!, update: NotificationUpdateInput!): Notification!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyGithubProfiles(data: GithubProfileUpdateInput!, where: GithubProfileWhereInput): BatchPayload!
  updateManyAccessTokens(data: AccessTokenUpdateInput!, where: AccessTokenWhereInput): BatchPayload!
  updateManyPosts(data: PostUpdateInput!, where: PostWhereInput): BatchPayload!
  updateManyTags(data: TagUpdateInput!, where: TagWhereInput): BatchPayload!
  updateManyComments(data: CommentUpdateInput!, where: CommentWhereInput): BatchPayload!
  updateManyFiles(data: FileUpdateInput!, where: FileWhereInput): BatchPayload!
  updateManyDirectories(data: DirectoryUpdateInput!, where: DirectoryWhereInput): BatchPayload!
  updateManyMessages(data: MessageUpdateInput!, where: MessageWhereInput): BatchPayload!
  updateManyNotifications(data: NotificationUpdateInput!, where: NotificationWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyGithubProfiles(where: GithubProfileWhereInput): BatchPayload!
  deleteManyAccessTokens(where: AccessTokenWhereInput): BatchPayload!
  deleteManyPosts(where: PostWhereInput): BatchPayload!
  deleteManyTags(where: TagWhereInput): BatchPayload!
  deleteManyComments(where: CommentWhereInput): BatchPayload!
  deleteManyFiles(where: FileWhereInput): BatchPayload!
  deleteManyDirectories(where: DirectoryWhereInput): BatchPayload!
  deleteManyMessages(where: MessageWhereInput): BatchPayload!
  deleteManyNotifications(where: NotificationWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

type Notification implements Node {
  id: ID!
  createdAt: DateTime!
  type: NOTIFICATION_TYPE
  user(where: UserWhereInput): User!
  link: String!
  readDate: DateTime
}

enum NOTIFICATION_TYPE {
  NEW_MESSAGE
  NEW_COMMENT
}

"""A connection to a list of items."""
type NotificationConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [NotificationEdge]!
  aggregate: AggregateNotification!
}

input NotificationCreateInput {
  type: NOTIFICATION_TYPE
  link: String!
  readDate: DateTime
  user: UserCreateOneWithoutNotificationsInput!
}

input NotificationCreateManyWithoutUserInput {
  create: [NotificationCreateWithoutUserInput!]
  connect: [NotificationWhereUniqueInput!]
}

input NotificationCreateWithoutUserInput {
  type: NOTIFICATION_TYPE
  link: String!
  readDate: DateTime
}

"""An edge in a connection."""
type NotificationEdge {
  """The item at the end of the edge."""
  node: Notification!

  """A cursor for use in pagination."""
  cursor: String!
}

enum NotificationOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  type_ASC
  type_DESC
  link_ASC
  link_DESC
  readDate_ASC
  readDate_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type NotificationPreviousValues {
  id: ID!
  createdAt: DateTime!
  type: NOTIFICATION_TYPE
  link: String!
  readDate: DateTime
}

type NotificationSubscriptionPayload {
  mutation: MutationType!
  node: Notification
  updatedFields: [String!]
  previousValues: NotificationPreviousValues
}

input NotificationSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [NotificationSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [NotificationSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [NotificationSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: NotificationWhereInput
}

input NotificationUpdateInput {
  type: NOTIFICATION_TYPE
  link: String
  readDate: DateTime
  user: UserUpdateOneWithoutNotificationsInput
}

input NotificationUpdateManyWithoutUserInput {
  create: [NotificationCreateWithoutUserInput!]
  connect: [NotificationWhereUniqueInput!]
  disconnect: [NotificationWhereUniqueInput!]
  delete: [NotificationWhereUniqueInput!]
  update: [NotificationUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [NotificationUpsertWithWhereUniqueWithoutUserInput!]
}

input NotificationUpdateWithoutUserDataInput {
  type: NOTIFICATION_TYPE
  link: String
  readDate: DateTime
}

input NotificationUpdateWithWhereUniqueWithoutUserInput {
  where: NotificationWhereUniqueInput!
  data: NotificationUpdateWithoutUserDataInput!
}

input NotificationUpsertWithWhereUniqueWithoutUserInput {
  where: NotificationWhereUniqueInput!
  update: NotificationUpdateWithoutUserDataInput!
  create: NotificationCreateWithoutUserInput!
}

input NotificationWhereInput {
  """Logical AND on all given filters."""
  AND: [NotificationWhereInput!]

  """Logical OR on all given filters."""
  OR: [NotificationWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [NotificationWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  type: NOTIFICATION_TYPE

  """All values that are not equal to given value."""
  type_not: NOTIFICATION_TYPE

  """All values that are contained in given list."""
  type_in: [NOTIFICATION_TYPE!]

  """All values that are not contained in given list."""
  type_not_in: [NOTIFICATION_TYPE!]
  link: String

  """All values that are not equal to given value."""
  link_not: String

  """All values that are contained in given list."""
  link_in: [String!]

  """All values that are not contained in given list."""
  link_not_in: [String!]

  """All values less than the given value."""
  link_lt: String

  """All values less than or equal the given value."""
  link_lte: String

  """All values greater than the given value."""
  link_gt: String

  """All values greater than or equal the given value."""
  link_gte: String

  """All values containing the given string."""
  link_contains: String

  """All values not containing the given string."""
  link_not_contains: String

  """All values starting with the given string."""
  link_starts_with: String

  """All values not starting with the given string."""
  link_not_starts_with: String

  """All values ending with the given string."""
  link_ends_with: String

  """All values not ending with the given string."""
  link_not_ends_with: String
  readDate: DateTime

  """All values that are not equal to given value."""
  readDate_not: DateTime

  """All values that are contained in given list."""
  readDate_in: [DateTime!]

  """All values that are not contained in given list."""
  readDate_not_in: [DateTime!]

  """All values less than the given value."""
  readDate_lt: DateTime

  """All values less than or equal the given value."""
  readDate_lte: DateTime

  """All values greater than the given value."""
  readDate_gt: DateTime

  """All values greater than or equal the given value."""
  readDate_gte: DateTime
  user: UserWhereInput
}

input NotificationWhereUniqueInput {
  id: ID
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

enum PERMISSION {
  ADMIN
  USER
  CREATE
  UPDATE
  DELETE
  CHANGE_PERMISSIONS
}

type Post implements Node {
  id: ID!
  author(where: UserWhereInput): User!
  visibility: VISIBILITY
  content(where: FileWhereInput): File!
  tags(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Tag!]
  views: Int
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""A connection to a list of items."""
type PostConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [PostEdge]!
  aggregate: AggregatePost!
}

input PostCreateInput {
  visibility: VISIBILITY
  views: Int
  author: UserCreateOneWithoutPostsInput!
  content: FileCreateOneInput!
  tags: TagCreateManyInput
  comments: CommentCreateManyWithoutPostInput
}

input PostCreateManyWithoutAuthorInput {
  create: [PostCreateWithoutAuthorInput!]
  connect: [PostWhereUniqueInput!]
}

input PostCreateOneWithoutCommentsInput {
  create: PostCreateWithoutCommentsInput
  connect: PostWhereUniqueInput
}

input PostCreateWithoutAuthorInput {
  visibility: VISIBILITY
  views: Int
  content: FileCreateOneInput!
  tags: TagCreateManyInput
  comments: CommentCreateManyWithoutPostInput
}

input PostCreateWithoutCommentsInput {
  visibility: VISIBILITY
  views: Int
  author: UserCreateOneWithoutPostsInput!
  content: FileCreateOneInput!
  tags: TagCreateManyInput
}

"""An edge in a connection."""
type PostEdge {
  """The item at the end of the edge."""
  node: Post!

  """A cursor for use in pagination."""
  cursor: String!
}

enum PostOrderByInput {
  id_ASC
  id_DESC
  visibility_ASC
  visibility_DESC
  views_ASC
  views_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PostPreviousValues {
  id: ID!
  visibility: VISIBILITY
  views: Int
  createdAt: DateTime!
  updatedAt: DateTime!
}

type PostSubscriptionPayload {
  mutation: MutationType!
  node: Post
  updatedFields: [String!]
  previousValues: PostPreviousValues
}

input PostSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [PostSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [PostSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PostSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PostWhereInput
}

input PostUpdateInput {
  visibility: VISIBILITY
  views: Int
  author: UserUpdateOneWithoutPostsInput
  content: FileUpdateOneInput
  tags: TagUpdateManyInput
  comments: CommentUpdateManyWithoutPostInput
}

input PostUpdateManyWithoutAuthorInput {
  create: [PostCreateWithoutAuthorInput!]
  connect: [PostWhereUniqueInput!]
  disconnect: [PostWhereUniqueInput!]
  delete: [PostWhereUniqueInput!]
  update: [PostUpdateWithWhereUniqueWithoutAuthorInput!]
  upsert: [PostUpsertWithWhereUniqueWithoutAuthorInput!]
}

input PostUpdateOneWithoutCommentsInput {
  create: PostCreateWithoutCommentsInput
  connect: PostWhereUniqueInput
  delete: Boolean
  update: PostUpdateWithoutCommentsDataInput
  upsert: PostUpsertWithoutCommentsInput
}

input PostUpdateWithoutAuthorDataInput {
  visibility: VISIBILITY
  views: Int
  content: FileUpdateOneInput
  tags: TagUpdateManyInput
  comments: CommentUpdateManyWithoutPostInput
}

input PostUpdateWithoutCommentsDataInput {
  visibility: VISIBILITY
  views: Int
  author: UserUpdateOneWithoutPostsInput
  content: FileUpdateOneInput
  tags: TagUpdateManyInput
}

input PostUpdateWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput!
  data: PostUpdateWithoutAuthorDataInput!
}

input PostUpsertWithoutCommentsInput {
  update: PostUpdateWithoutCommentsDataInput!
  create: PostCreateWithoutCommentsInput!
}

input PostUpsertWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput!
  update: PostUpdateWithoutAuthorDataInput!
  create: PostCreateWithoutAuthorInput!
}

input PostWhereInput {
  """Logical AND on all given filters."""
  AND: [PostWhereInput!]

  """Logical OR on all given filters."""
  OR: [PostWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PostWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  visibility: VISIBILITY

  """All values that are not equal to given value."""
  visibility_not: VISIBILITY

  """All values that are contained in given list."""
  visibility_in: [VISIBILITY!]

  """All values that are not contained in given list."""
  visibility_not_in: [VISIBILITY!]
  views: Int

  """All values that are not equal to given value."""
  views_not: Int

  """All values that are contained in given list."""
  views_in: [Int!]

  """All values that are not contained in given list."""
  views_not_in: [Int!]

  """All values less than the given value."""
  views_lt: Int

  """All values less than or equal the given value."""
  views_lte: Int

  """All values greater than the given value."""
  views_gt: Int

  """All values greater than or equal the given value."""
  views_gte: Int
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  author: UserWhereInput
  content: FileWhereInput
  tags_every: TagWhereInput
  tags_some: TagWhereInput
  tags_none: TagWhereInput
  comments_every: CommentWhereInput
  comments_some: CommentWhereInput
  comments_none: CommentWhereInput
}

input PostWhereUniqueInput {
  id: ID
}

type Query {
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  githubProfiles(where: GithubProfileWhereInput, orderBy: GithubProfileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [GithubProfile]!
  accessTokens(where: AccessTokenWhereInput, orderBy: AccessTokenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [AccessToken]!
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post]!
  tags(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Tag]!
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment]!
  files(where: FileWhereInput, orderBy: FileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [File]!
  directories(where: DirectoryWhereInput, orderBy: DirectoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Directory]!
  messages(where: MessageWhereInput, orderBy: MessageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Message]!
  notifications(where: NotificationWhereInput, orderBy: NotificationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Notification]!
  user(where: UserWhereUniqueInput!): User
  githubProfile(where: GithubProfileWhereUniqueInput!): GithubProfile
  accessToken(where: AccessTokenWhereUniqueInput!): AccessToken
  post(where: PostWhereUniqueInput!): Post
  tag(where: TagWhereUniqueInput!): Tag
  comment(where: CommentWhereUniqueInput!): Comment
  file(where: FileWhereUniqueInput!): File
  directory(where: DirectoryWhereUniqueInput!): Directory
  message(where: MessageWhereUniqueInput!): Message
  notification(where: NotificationWhereUniqueInput!): Notification
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  githubProfilesConnection(where: GithubProfileWhereInput, orderBy: GithubProfileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): GithubProfileConnection!
  accessTokensConnection(where: AccessTokenWhereInput, orderBy: AccessTokenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AccessTokenConnection!
  postsConnection(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PostConnection!
  tagsConnection(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TagConnection!
  commentsConnection(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CommentConnection!
  filesConnection(where: FileWhereInput, orderBy: FileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): FileConnection!
  directoriesConnection(where: DirectoryWhereInput, orderBy: DirectoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DirectoryConnection!
  messagesConnection(where: MessageWhereInput, orderBy: MessageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MessageConnection!
  notificationsConnection(where: NotificationWhereInput, orderBy: NotificationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): NotificationConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Subscription {
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  githubProfile(where: GithubProfileSubscriptionWhereInput): GithubProfileSubscriptionPayload
  accessToken(where: AccessTokenSubscriptionWhereInput): AccessTokenSubscriptionPayload
  post(where: PostSubscriptionWhereInput): PostSubscriptionPayload
  tag(where: TagSubscriptionWhereInput): TagSubscriptionPayload
  comment(where: CommentSubscriptionWhereInput): CommentSubscriptionPayload
  file(where: FileSubscriptionWhereInput): FileSubscriptionPayload
  directory(where: DirectorySubscriptionWhereInput): DirectorySubscriptionPayload
  message(where: MessageSubscriptionWhereInput): MessageSubscriptionPayload
  notification(where: NotificationSubscriptionWhereInput): NotificationSubscriptionPayload
}

type Tag implements Node {
  id: ID!
  text: String!
}

"""A connection to a list of items."""
type TagConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [TagEdge]!
  aggregate: AggregateTag!
}

input TagCreateInput {
  text: String!
}

input TagCreateManyInput {
  create: [TagCreateInput!]
  connect: [TagWhereUniqueInput!]
}

"""An edge in a connection."""
type TagEdge {
  """The item at the end of the edge."""
  node: Tag!

  """A cursor for use in pagination."""
  cursor: String!
}

enum TagOrderByInput {
  id_ASC
  id_DESC
  text_ASC
  text_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type TagPreviousValues {
  id: ID!
  text: String!
}

type TagSubscriptionPayload {
  mutation: MutationType!
  node: Tag
  updatedFields: [String!]
  previousValues: TagPreviousValues
}

input TagSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [TagSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [TagSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TagSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: TagWhereInput
}

input TagUpdateDataInput {
  text: String
}

input TagUpdateInput {
  text: String
}

input TagUpdateManyInput {
  create: [TagCreateInput!]
  connect: [TagWhereUniqueInput!]
  disconnect: [TagWhereUniqueInput!]
  delete: [TagWhereUniqueInput!]
  update: [TagUpdateWithWhereUniqueNestedInput!]
  upsert: [TagUpsertWithWhereUniqueNestedInput!]
}

input TagUpdateWithWhereUniqueNestedInput {
  where: TagWhereUniqueInput!
  data: TagUpdateDataInput!
}

input TagUpsertWithWhereUniqueNestedInput {
  where: TagWhereUniqueInput!
  update: TagUpdateDataInput!
  create: TagCreateInput!
}

input TagWhereInput {
  """Logical AND on all given filters."""
  AND: [TagWhereInput!]

  """Logical OR on all given filters."""
  OR: [TagWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TagWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  text: String

  """All values that are not equal to given value."""
  text_not: String

  """All values that are contained in given list."""
  text_in: [String!]

  """All values that are not contained in given list."""
  text_not_in: [String!]

  """All values less than the given value."""
  text_lt: String

  """All values less than or equal the given value."""
  text_lte: String

  """All values greater than the given value."""
  text_gt: String

  """All values greater than or equal the given value."""
  text_gte: String

  """All values containing the given string."""
  text_contains: String

  """All values not containing the given string."""
  text_not_contains: String

  """All values starting with the given string."""
  text_starts_with: String

  """All values not starting with the given string."""
  text_not_starts_with: String

  """All values ending with the given string."""
  text_ends_with: String

  """All values not ending with the given string."""
  text_not_ends_with: String
}

input TagWhereUniqueInput {
  id: ID
}

type User implements Node {
  id: ID!
  email: String!
  password: String!
  name: String
  connectedWithGithub: Boolean!
  githubProfile(where: GithubProfileWhereInput): GithubProfile
  githubProviderId: String
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
  sentMessages(where: MessageWhereInput, orderBy: MessageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Message!]
  receivedMessages(where: MessageWhereInput, orderBy: MessageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Message!]
  notifications(where: NotificationWhereInput, orderBy: NotificationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Notification!]
  resetToken: String
  resetTokenExpiry: String
  permissions: [PERMISSION!]
  emailConfirmed: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""A connection to a list of items."""
type UserConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  password: String!
  name: String
  connectedWithGithub: Boolean
  githubProviderId: String
  resetToken: String
  resetTokenExpiry: String
  emailConfirmed: Boolean
  permissions: UserCreatepermissionsInput
  githubProfile: GithubProfileCreateOneInput
  posts: PostCreateManyWithoutAuthorInput
  sentMessages: MessageCreateManyWithoutFromInput
  receivedMessages: MessageCreateManyWithoutToInput
  notifications: NotificationCreateManyWithoutUserInput
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutNotificationsInput {
  create: UserCreateWithoutNotificationsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutReceivedMessagesInput {
  create: UserCreateWithoutReceivedMessagesInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutSentMessagesInput {
  create: UserCreateWithoutSentMessagesInput
  connect: UserWhereUniqueInput
}

input UserCreatepermissionsInput {
  set: [PERMISSION!]
}

input UserCreateWithoutNotificationsInput {
  email: String!
  password: String!
  name: String
  connectedWithGithub: Boolean
  githubProviderId: String
  resetToken: String
  resetTokenExpiry: String
  emailConfirmed: Boolean
  permissions: UserCreatepermissionsInput
  githubProfile: GithubProfileCreateOneInput
  posts: PostCreateManyWithoutAuthorInput
  sentMessages: MessageCreateManyWithoutFromInput
  receivedMessages: MessageCreateManyWithoutToInput
}

input UserCreateWithoutPostsInput {
  email: String!
  password: String!
  name: String
  connectedWithGithub: Boolean
  githubProviderId: String
  resetToken: String
  resetTokenExpiry: String
  emailConfirmed: Boolean
  permissions: UserCreatepermissionsInput
  githubProfile: GithubProfileCreateOneInput
  sentMessages: MessageCreateManyWithoutFromInput
  receivedMessages: MessageCreateManyWithoutToInput
  notifications: NotificationCreateManyWithoutUserInput
}

input UserCreateWithoutReceivedMessagesInput {
  email: String!
  password: String!
  name: String
  connectedWithGithub: Boolean
  githubProviderId: String
  resetToken: String
  resetTokenExpiry: String
  emailConfirmed: Boolean
  permissions: UserCreatepermissionsInput
  githubProfile: GithubProfileCreateOneInput
  posts: PostCreateManyWithoutAuthorInput
  sentMessages: MessageCreateManyWithoutFromInput
  notifications: NotificationCreateManyWithoutUserInput
}

input UserCreateWithoutSentMessagesInput {
  email: String!
  password: String!
  name: String
  connectedWithGithub: Boolean
  githubProviderId: String
  resetToken: String
  resetTokenExpiry: String
  emailConfirmed: Boolean
  permissions: UserCreatepermissionsInput
  githubProfile: GithubProfileCreateOneInput
  posts: PostCreateManyWithoutAuthorInput
  receivedMessages: MessageCreateManyWithoutToInput
  notifications: NotificationCreateManyWithoutUserInput
}

"""An edge in a connection."""
type UserEdge {
  """The item at the end of the edge."""
  node: User!

  """A cursor for use in pagination."""
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  name_ASC
  name_DESC
  connectedWithGithub_ASC
  connectedWithGithub_DESC
  githubProviderId_ASC
  githubProviderId_DESC
  resetToken_ASC
  resetToken_DESC
  resetTokenExpiry_ASC
  resetTokenExpiry_DESC
  emailConfirmed_ASC
  emailConfirmed_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  password: String!
  name: String
  connectedWithGithub: Boolean!
  githubProviderId: String
  resetToken: String
  resetTokenExpiry: String
  permissions: [PERMISSION!]
  emailConfirmed: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [UserSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateDataInput {
  email: String
  password: String
  name: String
  connectedWithGithub: Boolean
  githubProviderId: String
  resetToken: String
  resetTokenExpiry: String
  emailConfirmed: Boolean
  permissions: UserUpdatepermissionsInput
  githubProfile: GithubProfileUpdateOneInput
  posts: PostUpdateManyWithoutAuthorInput
  sentMessages: MessageUpdateManyWithoutFromInput
  receivedMessages: MessageUpdateManyWithoutToInput
  notifications: NotificationUpdateManyWithoutUserInput
}

input UserUpdateInput {
  email: String
  password: String
  name: String
  connectedWithGithub: Boolean
  githubProviderId: String
  resetToken: String
  resetTokenExpiry: String
  emailConfirmed: Boolean
  permissions: UserUpdatepermissionsInput
  githubProfile: GithubProfileUpdateOneInput
  posts: PostUpdateManyWithoutAuthorInput
  sentMessages: MessageUpdateManyWithoutFromInput
  receivedMessages: MessageUpdateManyWithoutToInput
  notifications: NotificationUpdateManyWithoutUserInput
}

input UserUpdateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
}

input UserUpdateOneWithoutNotificationsInput {
  create: UserCreateWithoutNotificationsInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutNotificationsDataInput
  upsert: UserUpsertWithoutNotificationsInput
}

input UserUpdateOneWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutPostsDataInput
  upsert: UserUpsertWithoutPostsInput
}

input UserUpdateOneWithoutReceivedMessagesInput {
  create: UserCreateWithoutReceivedMessagesInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutReceivedMessagesDataInput
  upsert: UserUpsertWithoutReceivedMessagesInput
}

input UserUpdateOneWithoutSentMessagesInput {
  create: UserCreateWithoutSentMessagesInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutSentMessagesDataInput
  upsert: UserUpsertWithoutSentMessagesInput
}

input UserUpdatepermissionsInput {
  set: [PERMISSION!]
}

input UserUpdateWithoutNotificationsDataInput {
  email: String
  password: String
  name: String
  connectedWithGithub: Boolean
  githubProviderId: String
  resetToken: String
  resetTokenExpiry: String
  emailConfirmed: Boolean
  permissions: UserUpdatepermissionsInput
  githubProfile: GithubProfileUpdateOneInput
  posts: PostUpdateManyWithoutAuthorInput
  sentMessages: MessageUpdateManyWithoutFromInput
  receivedMessages: MessageUpdateManyWithoutToInput
}

input UserUpdateWithoutPostsDataInput {
  email: String
  password: String
  name: String
  connectedWithGithub: Boolean
  githubProviderId: String
  resetToken: String
  resetTokenExpiry: String
  emailConfirmed: Boolean
  permissions: UserUpdatepermissionsInput
  githubProfile: GithubProfileUpdateOneInput
  sentMessages: MessageUpdateManyWithoutFromInput
  receivedMessages: MessageUpdateManyWithoutToInput
  notifications: NotificationUpdateManyWithoutUserInput
}

input UserUpdateWithoutReceivedMessagesDataInput {
  email: String
  password: String
  name: String
  connectedWithGithub: Boolean
  githubProviderId: String
  resetToken: String
  resetTokenExpiry: String
  emailConfirmed: Boolean
  permissions: UserUpdatepermissionsInput
  githubProfile: GithubProfileUpdateOneInput
  posts: PostUpdateManyWithoutAuthorInput
  sentMessages: MessageUpdateManyWithoutFromInput
  notifications: NotificationUpdateManyWithoutUserInput
}

input UserUpdateWithoutSentMessagesDataInput {
  email: String
  password: String
  name: String
  connectedWithGithub: Boolean
  githubProviderId: String
  resetToken: String
  resetTokenExpiry: String
  emailConfirmed: Boolean
  permissions: UserUpdatepermissionsInput
  githubProfile: GithubProfileUpdateOneInput
  posts: PostUpdateManyWithoutAuthorInput
  receivedMessages: MessageUpdateManyWithoutToInput
  notifications: NotificationUpdateManyWithoutUserInput
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutNotificationsInput {
  update: UserUpdateWithoutNotificationsDataInput!
  create: UserCreateWithoutNotificationsInput!
}

input UserUpsertWithoutPostsInput {
  update: UserUpdateWithoutPostsDataInput!
  create: UserCreateWithoutPostsInput!
}

input UserUpsertWithoutReceivedMessagesInput {
  update: UserUpdateWithoutReceivedMessagesDataInput!
  create: UserCreateWithoutReceivedMessagesInput!
}

input UserUpsertWithoutSentMessagesInput {
  update: UserUpdateWithoutSentMessagesDataInput!
  create: UserCreateWithoutSentMessagesInput!
}

input UserWhereInput {
  """Logical AND on all given filters."""
  AND: [UserWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  email: String

  """All values that are not equal to given value."""
  email_not: String

  """All values that are contained in given list."""
  email_in: [String!]

  """All values that are not contained in given list."""
  email_not_in: [String!]

  """All values less than the given value."""
  email_lt: String

  """All values less than or equal the given value."""
  email_lte: String

  """All values greater than the given value."""
  email_gt: String

  """All values greater than or equal the given value."""
  email_gte: String

  """All values containing the given string."""
  email_contains: String

  """All values not containing the given string."""
  email_not_contains: String

  """All values starting with the given string."""
  email_starts_with: String

  """All values not starting with the given string."""
  email_not_starts_with: String

  """All values ending with the given string."""
  email_ends_with: String

  """All values not ending with the given string."""
  email_not_ends_with: String
  password: String

  """All values that are not equal to given value."""
  password_not: String

  """All values that are contained in given list."""
  password_in: [String!]

  """All values that are not contained in given list."""
  password_not_in: [String!]

  """All values less than the given value."""
  password_lt: String

  """All values less than or equal the given value."""
  password_lte: String

  """All values greater than the given value."""
  password_gt: String

  """All values greater than or equal the given value."""
  password_gte: String

  """All values containing the given string."""
  password_contains: String

  """All values not containing the given string."""
  password_not_contains: String

  """All values starting with the given string."""
  password_starts_with: String

  """All values not starting with the given string."""
  password_not_starts_with: String

  """All values ending with the given string."""
  password_ends_with: String

  """All values not ending with the given string."""
  password_not_ends_with: String
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  connectedWithGithub: Boolean

  """All values that are not equal to given value."""
  connectedWithGithub_not: Boolean
  githubProviderId: String

  """All values that are not equal to given value."""
  githubProviderId_not: String

  """All values that are contained in given list."""
  githubProviderId_in: [String!]

  """All values that are not contained in given list."""
  githubProviderId_not_in: [String!]

  """All values less than the given value."""
  githubProviderId_lt: String

  """All values less than or equal the given value."""
  githubProviderId_lte: String

  """All values greater than the given value."""
  githubProviderId_gt: String

  """All values greater than or equal the given value."""
  githubProviderId_gte: String

  """All values containing the given string."""
  githubProviderId_contains: String

  """All values not containing the given string."""
  githubProviderId_not_contains: String

  """All values starting with the given string."""
  githubProviderId_starts_with: String

  """All values not starting with the given string."""
  githubProviderId_not_starts_with: String

  """All values ending with the given string."""
  githubProviderId_ends_with: String

  """All values not ending with the given string."""
  githubProviderId_not_ends_with: String
  resetToken: String

  """All values that are not equal to given value."""
  resetToken_not: String

  """All values that are contained in given list."""
  resetToken_in: [String!]

  """All values that are not contained in given list."""
  resetToken_not_in: [String!]

  """All values less than the given value."""
  resetToken_lt: String

  """All values less than or equal the given value."""
  resetToken_lte: String

  """All values greater than the given value."""
  resetToken_gt: String

  """All values greater than or equal the given value."""
  resetToken_gte: String

  """All values containing the given string."""
  resetToken_contains: String

  """All values not containing the given string."""
  resetToken_not_contains: String

  """All values starting with the given string."""
  resetToken_starts_with: String

  """All values not starting with the given string."""
  resetToken_not_starts_with: String

  """All values ending with the given string."""
  resetToken_ends_with: String

  """All values not ending with the given string."""
  resetToken_not_ends_with: String
  resetTokenExpiry: String

  """All values that are not equal to given value."""
  resetTokenExpiry_not: String

  """All values that are contained in given list."""
  resetTokenExpiry_in: [String!]

  """All values that are not contained in given list."""
  resetTokenExpiry_not_in: [String!]

  """All values less than the given value."""
  resetTokenExpiry_lt: String

  """All values less than or equal the given value."""
  resetTokenExpiry_lte: String

  """All values greater than the given value."""
  resetTokenExpiry_gt: String

  """All values greater than or equal the given value."""
  resetTokenExpiry_gte: String

  """All values containing the given string."""
  resetTokenExpiry_contains: String

  """All values not containing the given string."""
  resetTokenExpiry_not_contains: String

  """All values starting with the given string."""
  resetTokenExpiry_starts_with: String

  """All values not starting with the given string."""
  resetTokenExpiry_not_starts_with: String

  """All values ending with the given string."""
  resetTokenExpiry_ends_with: String

  """All values not ending with the given string."""
  resetTokenExpiry_not_ends_with: String
  emailConfirmed: Boolean

  """All values that are not equal to given value."""
  emailConfirmed_not: Boolean
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  githubProfile: GithubProfileWhereInput
  posts_every: PostWhereInput
  posts_some: PostWhereInput
  posts_none: PostWhereInput
  sentMessages_every: MessageWhereInput
  sentMessages_some: MessageWhereInput
  sentMessages_none: MessageWhereInput
  receivedMessages_every: MessageWhereInput
  receivedMessages_some: MessageWhereInput
  receivedMessages_none: MessageWhereInput
  notifications_every: NotificationWhereInput
  notifications_some: NotificationWhereInput
  notifications_none: NotificationWhereInput
}

input UserWhereUniqueInput {
  id: ID
  email: String
}

enum VISIBILITY {
  PRIVATE
  PUBLIC
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({
  typeDefs
})

/**
 * Types
 */

export type VISIBILITY = 'PRIVATE' | 'PUBLIC'

export type NOTIFICATION_TYPE = 'NEW_MESSAGE' | 'NEW_COMMENT'

export type TagOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'text_ASC'
  | 'text_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'

export type DirectoryOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'isOpen_ASC'
  | 'isOpen_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'

export type FILE_TYPE =
  | 'JAVASCRIPT'
  | 'TYPESCRIPT'
  | 'HTML'
  | 'CSS'
  | 'C'
  | 'CPP'
  | 'RUST'
  | 'WAT'
  | 'WASM'
  | 'DIRECTORY'
  | 'LOG'
  | 'X86'
  | 'MARKDOWN'
  | 'JSON'
  | 'DOT'
  | 'TOML'
  | 'UNKNOWN'

export type PERMISSION =
  | 'ADMIN'
  | 'USER'
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'CHANGE_PERMISSIONS'

export type UserOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'email_ASC'
  | 'email_DESC'
  | 'password_ASC'
  | 'password_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'connectedWithGithub_ASC'
  | 'connectedWithGithub_DESC'
  | 'githubProviderId_ASC'
  | 'githubProviderId_DESC'
  | 'resetToken_ASC'
  | 'resetToken_DESC'
  | 'resetTokenExpiry_ASC'
  | 'resetTokenExpiry_DESC'
  | 'emailConfirmed_ASC'
  | 'emailConfirmed_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'

export type AccessTokenOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'token_ASC'
  | 'token_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'

export type PostOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'visibility_ASC'
  | 'visibility_DESC'
  | 'views_ASC'
  | 'views_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'

export type FileOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'type_ASC'
  | 'type_DESC'
  | 'data_ASC'
  | 'data_DESC'
  | 'isDirty_ASC'
  | 'isDirty_DESC'
  | 'isTransient_ASC'
  | 'isTransient_DESC'
  | 'bufferType_ASC'
  | 'bufferType_DESC'
  | 'description_ASC'
  | 'description_DESC'
  | 'uuid_ASC'
  | 'uuid_DESC'
  | 'contentType_ASC'
  | 'contentType_DESC'
  | 's3Url_ASC'
  | 's3Url_DESC'
  | 'size_ASC'
  | 'size_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'

export type NotificationOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'type_ASC'
  | 'type_DESC'
  | 'link_ASC'
  | 'link_DESC'
  | 'readDate_ASC'
  | 'readDate_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'

export type GithubProfileOrderByInput =
  | 'githubUserId_ASC'
  | 'githubUserId_DESC'
  | 'username_ASC'
  | 'username_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'bio_ASC'
  | 'bio_DESC'
  | 'website_ASC'
  | 'website_DESC'
  | 'email_ASC'
  | 'email_DESC'
  | 'profilePhoto_ASC'
  | 'profilePhoto_DESC'
  | 'id_ASC'
  | 'id_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'

export type MutationType = 'CREATED' | 'UPDATED' | 'DELETED'

export type CommentOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'content_ASC'
  | 'content_DESC'

export type MessageOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'deliveredAt_ASC'
  | 'deliveredAt_DESC'
  | 'readAt_ASC'
  | 'readAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'

export interface PostCreateOneWithoutCommentsInput {
  create?: PostCreateWithoutCommentsInput
  connect?: PostWhereUniqueInput
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  NOT?: UserWhereInput[] | UserWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  email?: String
  email_not?: String
  email_in?: String[] | String
  email_not_in?: String[] | String
  email_lt?: String
  email_lte?: String
  email_gt?: String
  email_gte?: String
  email_contains?: String
  email_not_contains?: String
  email_starts_with?: String
  email_not_starts_with?: String
  email_ends_with?: String
  email_not_ends_with?: String
  password?: String
  password_not?: String
  password_in?: String[] | String
  password_not_in?: String[] | String
  password_lt?: String
  password_lte?: String
  password_gt?: String
  password_gte?: String
  password_contains?: String
  password_not_contains?: String
  password_starts_with?: String
  password_not_starts_with?: String
  password_ends_with?: String
  password_not_ends_with?: String
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  connectedWithGithub?: Boolean
  connectedWithGithub_not?: Boolean
  githubProviderId?: String
  githubProviderId_not?: String
  githubProviderId_in?: String[] | String
  githubProviderId_not_in?: String[] | String
  githubProviderId_lt?: String
  githubProviderId_lte?: String
  githubProviderId_gt?: String
  githubProviderId_gte?: String
  githubProviderId_contains?: String
  githubProviderId_not_contains?: String
  githubProviderId_starts_with?: String
  githubProviderId_not_starts_with?: String
  githubProviderId_ends_with?: String
  githubProviderId_not_ends_with?: String
  resetToken?: String
  resetToken_not?: String
  resetToken_in?: String[] | String
  resetToken_not_in?: String[] | String
  resetToken_lt?: String
  resetToken_lte?: String
  resetToken_gt?: String
  resetToken_gte?: String
  resetToken_contains?: String
  resetToken_not_contains?: String
  resetToken_starts_with?: String
  resetToken_not_starts_with?: String
  resetToken_ends_with?: String
  resetToken_not_ends_with?: String
  resetTokenExpiry?: String
  resetTokenExpiry_not?: String
  resetTokenExpiry_in?: String[] | String
  resetTokenExpiry_not_in?: String[] | String
  resetTokenExpiry_lt?: String
  resetTokenExpiry_lte?: String
  resetTokenExpiry_gt?: String
  resetTokenExpiry_gte?: String
  resetTokenExpiry_contains?: String
  resetTokenExpiry_not_contains?: String
  resetTokenExpiry_starts_with?: String
  resetTokenExpiry_not_starts_with?: String
  resetTokenExpiry_ends_with?: String
  resetTokenExpiry_not_ends_with?: String
  emailConfirmed?: Boolean
  emailConfirmed_not?: Boolean
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  githubProfile?: GithubProfileWhereInput
  posts_every?: PostWhereInput
  posts_some?: PostWhereInput
  posts_none?: PostWhereInput
  sentMessages_every?: MessageWhereInput
  sentMessages_some?: MessageWhereInput
  sentMessages_none?: MessageWhereInput
  receivedMessages_every?: MessageWhereInput
  receivedMessages_some?: MessageWhereInput
  receivedMessages_none?: MessageWhereInput
  notifications_every?: NotificationWhereInput
  notifications_some?: NotificationWhereInput
  notifications_none?: NotificationWhereInput
}

export interface UserCreateWithoutNotificationsInput {
  email: String
  password: String
  name?: String
  connectedWithGithub?: Boolean
  githubProviderId?: String
  resetToken?: String
  resetTokenExpiry?: String
  emailConfirmed?: Boolean
  permissions?: UserCreatepermissionsInput
  githubProfile?: GithubProfileCreateOneInput
  posts?: PostCreateManyWithoutAuthorInput
  sentMessages?: MessageCreateManyWithoutFromInput
  receivedMessages?: MessageCreateManyWithoutToInput
}

export interface NotificationWhereInput {
  AND?: NotificationWhereInput[] | NotificationWhereInput
  OR?: NotificationWhereInput[] | NotificationWhereInput
  NOT?: NotificationWhereInput[] | NotificationWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  type?: NOTIFICATION_TYPE
  type_not?: NOTIFICATION_TYPE
  type_in?: NOTIFICATION_TYPE[] | NOTIFICATION_TYPE
  type_not_in?: NOTIFICATION_TYPE[] | NOTIFICATION_TYPE
  link?: String
  link_not?: String
  link_in?: String[] | String
  link_not_in?: String[] | String
  link_lt?: String
  link_lte?: String
  link_gt?: String
  link_gte?: String
  link_contains?: String
  link_not_contains?: String
  link_starts_with?: String
  link_not_starts_with?: String
  link_ends_with?: String
  link_not_ends_with?: String
  readDate?: DateTime
  readDate_not?: DateTime
  readDate_in?: DateTime[] | DateTime
  readDate_not_in?: DateTime[] | DateTime
  readDate_lt?: DateTime
  readDate_lte?: DateTime
  readDate_gt?: DateTime
  readDate_gte?: DateTime
  user?: UserWhereInput
}

export interface PostCreateWithoutAuthorInput {
  visibility?: VISIBILITY
  views?: Int
  content: FileCreateOneInput
  tags?: TagCreateManyInput
  comments?: CommentCreateManyWithoutPostInput
}

export interface NotificationUpsertWithWhereUniqueWithoutUserInput {
  where: NotificationWhereUniqueInput
  update: NotificationUpdateWithoutUserDataInput
  create: NotificationCreateWithoutUserInput
}

export interface FileCreateOneInput {
  create?: FileCreateInput
  connect?: FileWhereUniqueInput
}

export interface UserUpdateInput {
  email?: String
  password?: String
  name?: String
  connectedWithGithub?: Boolean
  githubProviderId?: String
  resetToken?: String
  resetTokenExpiry?: String
  emailConfirmed?: Boolean
  permissions?: UserUpdatepermissionsInput
  githubProfile?: GithubProfileUpdateOneInput
  posts?: PostUpdateManyWithoutAuthorInput
  sentMessages?: MessageUpdateManyWithoutFromInput
  receivedMessages?: MessageUpdateManyWithoutToInput
  notifications?: NotificationUpdateManyWithoutUserInput
}

export interface FileCreateInput {
  name: String
  type?: FILE_TYPE
  data?: String
  isDirty?: Boolean
  isTransient?: Boolean
  bufferType?: FILE_TYPE
  description?: String
  uuid?: String
  contentType?: String
  s3Url?: String
  size?: Int
  parent?: DirectoryCreateOneWithoutChildrenInput
}

export interface CommentWhereInput {
  AND?: CommentWhereInput[] | CommentWhereInput
  OR?: CommentWhereInput[] | CommentWhereInput
  NOT?: CommentWhereInput[] | CommentWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  content?: String
  content_not?: String
  content_in?: String[] | String
  content_not_in?: String[] | String
  content_lt?: String
  content_lte?: String
  content_gt?: String
  content_gte?: String
  content_contains?: String
  content_not_contains?: String
  content_starts_with?: String
  content_not_starts_with?: String
  content_ends_with?: String
  content_not_ends_with?: String
  author?: UserWhereInput
  post?: PostWhereInput
}

export interface DirectoryCreateOneWithoutChildrenInput {
  create?: DirectoryCreateWithoutChildrenInput
  connect?: DirectoryWhereUniqueInput
}

export interface TagWhereInput {
  AND?: TagWhereInput[] | TagWhereInput
  OR?: TagWhereInput[] | TagWhereInput
  NOT?: TagWhereInput[] | TagWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  text?: String
  text_not?: String
  text_in?: String[] | String
  text_not_in?: String[] | String
  text_lt?: String
  text_lte?: String
  text_gt?: String
  text_gte?: String
  text_contains?: String
  text_not_contains?: String
  text_starts_with?: String
  text_not_starts_with?: String
  text_ends_with?: String
  text_not_ends_with?: String
}

export interface DirectoryCreateWithoutChildrenInput {
  name?: String
  isOpen?: Boolean
}

export interface FileSubscriptionWhereInput {
  AND?: FileSubscriptionWhereInput[] | FileSubscriptionWhereInput
  OR?: FileSubscriptionWhereInput[] | FileSubscriptionWhereInput
  NOT?: FileSubscriptionWhereInput[] | FileSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: FileWhereInput
}

export interface TagCreateManyInput {
  create?: TagCreateInput[] | TagCreateInput
  connect?: TagWhereUniqueInput[] | TagWhereUniqueInput
}

export interface DirectoryWhereInput {
  AND?: DirectoryWhereInput[] | DirectoryWhereInput
  OR?: DirectoryWhereInput[] | DirectoryWhereInput
  NOT?: DirectoryWhereInput[] | DirectoryWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  isOpen?: Boolean
  isOpen_not?: Boolean
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  children_every?: FileWhereInput
  children_some?: FileWhereInput
  children_none?: FileWhereInput
}

export interface TagCreateInput {
  text: String
}

export interface TagSubscriptionWhereInput {
  AND?: TagSubscriptionWhereInput[] | TagSubscriptionWhereInput
  OR?: TagSubscriptionWhereInput[] | TagSubscriptionWhereInput
  NOT?: TagSubscriptionWhereInput[] | TagSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: TagWhereInput
}

export interface CommentCreateManyWithoutPostInput {
  create?: CommentCreateWithoutPostInput[] | CommentCreateWithoutPostInput
  connect?: CommentWhereUniqueInput[] | CommentWhereUniqueInput
}

export interface PostSubscriptionWhereInput {
  AND?: PostSubscriptionWhereInput[] | PostSubscriptionWhereInput
  OR?: PostSubscriptionWhereInput[] | PostSubscriptionWhereInput
  NOT?: PostSubscriptionWhereInput[] | PostSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: PostWhereInput
}

export interface CommentCreateWithoutPostInput {
  content?: String
  author: UserCreateOneInput
}

export interface AccessTokenSubscriptionWhereInput {
  AND?: AccessTokenSubscriptionWhereInput[] | AccessTokenSubscriptionWhereInput
  OR?: AccessTokenSubscriptionWhereInput[] | AccessTokenSubscriptionWhereInput
  NOT?: AccessTokenSubscriptionWhereInput[] | AccessTokenSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: AccessTokenWhereInput
}

export interface UserCreateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface MessageCreateManyWithoutFromInput {
  create?: MessageCreateWithoutFromInput[] | MessageCreateWithoutFromInput
  connect?: MessageWhereUniqueInput[] | MessageWhereUniqueInput
}

export interface UserUpsertWithoutNotificationsInput {
  update: UserUpdateWithoutNotificationsDataInput
  create: UserCreateWithoutNotificationsInput
}

export interface MessageCreateWithoutFromInput {
  deliveredAt: DateTime
  readAt?: DateTime
  to: UserCreateOneWithoutReceivedMessagesInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  email?: String
}

export interface UserCreateOneWithoutReceivedMessagesInput {
  create?: UserCreateWithoutReceivedMessagesInput
  connect?: UserWhereUniqueInput
}

export interface AccessTokenWhereUniqueInput {
  id?: ID_Input
}

export interface UserCreateWithoutReceivedMessagesInput {
  email: String
  password: String
  name?: String
  connectedWithGithub?: Boolean
  githubProviderId?: String
  resetToken?: String
  resetTokenExpiry?: String
  emailConfirmed?: Boolean
  permissions?: UserCreatepermissionsInput
  githubProfile?: GithubProfileCreateOneInput
  posts?: PostCreateManyWithoutAuthorInput
  sentMessages?: MessageCreateManyWithoutFromInput
  notifications?: NotificationCreateManyWithoutUserInput
}

export interface TagWhereUniqueInput {
  id?: ID_Input
}

export interface NotificationCreateManyWithoutUserInput {
  create?:
    | NotificationCreateWithoutUserInput[]
    | NotificationCreateWithoutUserInput
  connect?: NotificationWhereUniqueInput[] | NotificationWhereUniqueInput
}

export interface FileWhereUniqueInput {
  id?: ID_Input
  uuid?: String
  s3Url?: String
}

export interface NotificationCreateWithoutUserInput {
  type?: NOTIFICATION_TYPE
  link: String
  readDate?: DateTime
}

export interface MessageWhereUniqueInput {
  id?: ID_Input
}

export interface MessageCreateManyWithoutToInput {
  create?: MessageCreateWithoutToInput[] | MessageCreateWithoutToInput
  connect?: MessageWhereUniqueInput[] | MessageWhereUniqueInput
}

export interface UserUpdateOneWithoutNotificationsInput {
  create?: UserCreateWithoutNotificationsInput
  connect?: UserWhereUniqueInput
  delete?: Boolean
  update?: UserUpdateWithoutNotificationsDataInput
  upsert?: UserUpsertWithoutNotificationsInput
}

export interface MessageCreateWithoutToInput {
  deliveredAt: DateTime
  readAt?: DateTime
  from: UserCreateOneWithoutSentMessagesInput
}

export interface MessageUpdateInput {
  deliveredAt?: DateTime
  readAt?: DateTime
  from?: UserUpdateOneWithoutSentMessagesInput
  to?: UserUpdateOneWithoutReceivedMessagesInput
}

export interface UserCreateOneWithoutSentMessagesInput {
  create?: UserCreateWithoutSentMessagesInput
  connect?: UserWhereUniqueInput
}

export interface FileUpdateWithoutParentDataInput {
  name?: String
  type?: FILE_TYPE
  data?: String
  isDirty?: Boolean
  isTransient?: Boolean
  bufferType?: FILE_TYPE
  description?: String
  uuid?: String
  contentType?: String
  s3Url?: String
  size?: Int
}

export interface UserCreateWithoutSentMessagesInput {
  email: String
  password: String
  name?: String
  connectedWithGithub?: Boolean
  githubProviderId?: String
  resetToken?: String
  resetTokenExpiry?: String
  emailConfirmed?: Boolean
  permissions?: UserCreatepermissionsInput
  githubProfile?: GithubProfileCreateOneInput
  posts?: PostCreateManyWithoutAuthorInput
  receivedMessages?: MessageCreateManyWithoutToInput
  notifications?: NotificationCreateManyWithoutUserInput
}

export interface FileUpdateManyWithoutParentInput {
  create?: FileCreateWithoutParentInput[] | FileCreateWithoutParentInput
  connect?: FileWhereUniqueInput[] | FileWhereUniqueInput
  disconnect?: FileWhereUniqueInput[] | FileWhereUniqueInput
  delete?: FileWhereUniqueInput[] | FileWhereUniqueInput
  update?:
    | FileUpdateWithWhereUniqueWithoutParentInput[]
    | FileUpdateWithWhereUniqueWithoutParentInput
  upsert?:
    | FileUpsertWithWhereUniqueWithoutParentInput[]
    | FileUpsertWithWhereUniqueWithoutParentInput
}

export interface PostCreateInput {
  visibility?: VISIBILITY
  views?: Int
  author: UserCreateOneWithoutPostsInput
  content: FileCreateOneInput
  tags?: TagCreateManyInput
  comments?: CommentCreateManyWithoutPostInput
}

export interface FileUpdateInput {
  name?: String
  type?: FILE_TYPE
  data?: String
  isDirty?: Boolean
  isTransient?: Boolean
  bufferType?: FILE_TYPE
  description?: String
  uuid?: String
  contentType?: String
  s3Url?: String
  size?: Int
  parent?: DirectoryUpdateOneWithoutChildrenInput
}

export interface UserCreateOneWithoutPostsInput {
  create?: UserCreateWithoutPostsInput
  connect?: UserWhereUniqueInput
}

export interface PostUpdateWithoutCommentsDataInput {
  visibility?: VISIBILITY
  views?: Int
  author?: UserUpdateOneWithoutPostsInput
  content?: FileUpdateOneInput
  tags?: TagUpdateManyInput
}

export interface UserCreateWithoutPostsInput {
  email: String
  password: String
  name?: String
  connectedWithGithub?: Boolean
  githubProviderId?: String
  resetToken?: String
  resetTokenExpiry?: String
  emailConfirmed?: Boolean
  permissions?: UserCreatepermissionsInput
  githubProfile?: GithubProfileCreateOneInput
  sentMessages?: MessageCreateManyWithoutFromInput
  receivedMessages?: MessageCreateManyWithoutToInput
  notifications?: NotificationCreateManyWithoutUserInput
}

export interface CommentUpdateInput {
  content?: String
  author?: UserUpdateOneInput
  post?: PostUpdateOneWithoutCommentsInput
}

export interface CommentCreateInput {
  content?: String
  author: UserCreateOneInput
  post: PostCreateOneWithoutCommentsInput
}

export interface UserUpsertWithoutPostsInput {
  update: UserUpdateWithoutPostsDataInput
  create: UserCreateWithoutPostsInput
}

export interface UserUpsertWithoutReceivedMessagesInput {
  update: UserUpdateWithoutReceivedMessagesDataInput
  create: UserCreateWithoutReceivedMessagesInput
}

export interface UserUpdateOneWithoutPostsInput {
  create?: UserCreateWithoutPostsInput
  connect?: UserWhereUniqueInput
  delete?: Boolean
  update?: UserUpdateWithoutPostsDataInput
  upsert?: UserUpsertWithoutPostsInput
}

export interface PostCreateWithoutCommentsInput {
  visibility?: VISIBILITY
  views?: Int
  author: UserCreateOneWithoutPostsInput
  content: FileCreateOneInput
  tags?: TagCreateManyInput
}

export interface AccessTokenUpdateInput {
  token?: String
  scopes?: AccessTokenUpdatescopesInput
}

export interface DirectoryCreateInput {
  name?: String
  isOpen?: Boolean
  children?: FileCreateManyWithoutParentInput
}

export interface PostUpsertWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput
  update: PostUpdateWithoutAuthorDataInput
  create: PostCreateWithoutAuthorInput
}

export interface FileCreateManyWithoutParentInput {
  create?: FileCreateWithoutParentInput[] | FileCreateWithoutParentInput
  connect?: FileWhereUniqueInput[] | FileWhereUniqueInput
}

export interface UserUpsertNestedInput {
  update: UserUpdateDataInput
  create: UserCreateInput
}

export interface FileCreateWithoutParentInput {
  name: String
  type?: FILE_TYPE
  data?: String
  isDirty?: Boolean
  isTransient?: Boolean
  bufferType?: FILE_TYPE
  description?: String
  uuid?: String
  contentType?: String
  s3Url?: String
  size?: Int
}

export interface UserUpsertWithoutSentMessagesInput {
  update: UserUpdateWithoutSentMessagesDataInput
  create: UserCreateWithoutSentMessagesInput
}

export interface MessageCreateInput {
  deliveredAt: DateTime
  readAt?: DateTime
  from: UserCreateOneWithoutSentMessagesInput
  to: UserCreateOneWithoutReceivedMessagesInput
}

export interface UserUpdateOneWithoutSentMessagesInput {
  create?: UserCreateWithoutSentMessagesInput
  connect?: UserWhereUniqueInput
  delete?: Boolean
  update?: UserUpdateWithoutSentMessagesDataInput
  upsert?: UserUpsertWithoutSentMessagesInput
}

export interface NotificationCreateInput {
  type?: NOTIFICATION_TYPE
  link: String
  readDate?: DateTime
  user: UserCreateOneWithoutNotificationsInput
}

export interface MessageUpdateWithWhereUniqueWithoutToInput {
  where: MessageWhereUniqueInput
  data: MessageUpdateWithoutToDataInput
}

export interface UserCreateOneWithoutNotificationsInput {
  create?: UserCreateWithoutNotificationsInput
  connect?: UserWhereUniqueInput
}

export interface MessageUpsertWithWhereUniqueWithoutFromInput {
  where: MessageWhereUniqueInput
  update: MessageUpdateWithoutFromDataInput
  create: MessageCreateWithoutFromInput
}

export interface MessageWhereInput {
  AND?: MessageWhereInput[] | MessageWhereInput
  OR?: MessageWhereInput[] | MessageWhereInput
  NOT?: MessageWhereInput[] | MessageWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  deliveredAt?: DateTime
  deliveredAt_not?: DateTime
  deliveredAt_in?: DateTime[] | DateTime
  deliveredAt_not_in?: DateTime[] | DateTime
  deliveredAt_lt?: DateTime
  deliveredAt_lte?: DateTime
  deliveredAt_gt?: DateTime
  deliveredAt_gte?: DateTime
  readAt?: DateTime
  readAt_not?: DateTime
  readAt_in?: DateTime[] | DateTime
  readAt_not_in?: DateTime[] | DateTime
  readAt_lt?: DateTime
  readAt_lte?: DateTime
  readAt_gt?: DateTime
  readAt_gte?: DateTime
  from?: UserWhereInput
  to?: UserWhereInput
}

export interface UserCreatepermissionsInput {
  set?: PERMISSION[] | PERMISSION
}

export interface GithubProfileCreateInput {
  githubUserId: Int
  username: String
  name?: String
  bio?: String
  website?: String
  email?: String
  profilePhoto?: String
  accessTokens?: AccessTokenCreateManyInput
}

export interface AccessTokenCreateInput {
  token: String
  scopes?: AccessTokenCreatescopesInput
}

export interface UserUpdatepermissionsInput {
  set?: PERMISSION[] | PERMISSION
}

export interface PostCreateManyWithoutAuthorInput {
  create?: PostCreateWithoutAuthorInput[] | PostCreateWithoutAuthorInput
  connect?: PostWhereUniqueInput[] | PostWhereUniqueInput
}

export interface GithubProfileUpdateOneInput {
  create?: GithubProfileCreateInput
  connect?: GithubProfileWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: GithubProfileUpdateDataInput
  upsert?: GithubProfileUpsertNestedInput
}

export interface MessageSubscriptionWhereInput {
  AND?: MessageSubscriptionWhereInput[] | MessageSubscriptionWhereInput
  OR?: MessageSubscriptionWhereInput[] | MessageSubscriptionWhereInput
  NOT?: MessageSubscriptionWhereInput[] | MessageSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: MessageWhereInput
}

export interface GithubProfileUpdateDataInput {
  githubUserId?: Int
  username?: String
  name?: String
  bio?: String
  website?: String
  email?: String
  profilePhoto?: String
  accessTokens?: AccessTokenUpdateManyInput
}

export interface CommentSubscriptionWhereInput {
  AND?: CommentSubscriptionWhereInput[] | CommentSubscriptionWhereInput
  OR?: CommentSubscriptionWhereInput[] | CommentSubscriptionWhereInput
  NOT?: CommentSubscriptionWhereInput[] | CommentSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: CommentWhereInput
}

export interface AccessTokenUpdateManyInput {
  create?: AccessTokenCreateInput[] | AccessTokenCreateInput
  connect?: AccessTokenWhereUniqueInput[] | AccessTokenWhereUniqueInput
  disconnect?: AccessTokenWhereUniqueInput[] | AccessTokenWhereUniqueInput
  delete?: AccessTokenWhereUniqueInput[] | AccessTokenWhereUniqueInput
  update?:
    | AccessTokenUpdateWithWhereUniqueNestedInput[]
    | AccessTokenUpdateWithWhereUniqueNestedInput
  upsert?:
    | AccessTokenUpsertWithWhereUniqueNestedInput[]
    | AccessTokenUpsertWithWhereUniqueNestedInput
}

export interface PostWhereInput {
  AND?: PostWhereInput[] | PostWhereInput
  OR?: PostWhereInput[] | PostWhereInput
  NOT?: PostWhereInput[] | PostWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  visibility?: VISIBILITY
  visibility_not?: VISIBILITY
  visibility_in?: VISIBILITY[] | VISIBILITY
  visibility_not_in?: VISIBILITY[] | VISIBILITY
  views?: Int
  views_not?: Int
  views_in?: Int[] | Int
  views_not_in?: Int[] | Int
  views_lt?: Int
  views_lte?: Int
  views_gt?: Int
  views_gte?: Int
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  author?: UserWhereInput
  content?: FileWhereInput
  tags_every?: TagWhereInput
  tags_some?: TagWhereInput
  tags_none?: TagWhereInput
  comments_every?: CommentWhereInput
  comments_some?: CommentWhereInput
  comments_none?: CommentWhereInput
}

export interface AccessTokenUpdateWithWhereUniqueNestedInput {
  where: AccessTokenWhereUniqueInput
  data: AccessTokenUpdateDataInput
}

export interface GithubProfileSubscriptionWhereInput {
  AND?:
    | GithubProfileSubscriptionWhereInput[]
    | GithubProfileSubscriptionWhereInput
  OR?:
    | GithubProfileSubscriptionWhereInput[]
    | GithubProfileSubscriptionWhereInput
  NOT?:
    | GithubProfileSubscriptionWhereInput[]
    | GithubProfileSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: GithubProfileWhereInput
}

export interface AccessTokenUpdateDataInput {
  token?: String
  scopes?: AccessTokenUpdatescopesInput
}

export interface UserUpdateWithoutNotificationsDataInput {
  email?: String
  password?: String
  name?: String
  connectedWithGithub?: Boolean
  githubProviderId?: String
  resetToken?: String
  resetTokenExpiry?: String
  emailConfirmed?: Boolean
  permissions?: UserUpdatepermissionsInput
  githubProfile?: GithubProfileUpdateOneInput
  posts?: PostUpdateManyWithoutAuthorInput
  sentMessages?: MessageUpdateManyWithoutFromInput
  receivedMessages?: MessageUpdateManyWithoutToInput
}

export interface AccessTokenUpdatescopesInput {
  set?: String[] | String
}

export interface PostWhereUniqueInput {
  id?: ID_Input
}

export interface AccessTokenUpsertWithWhereUniqueNestedInput {
  where: AccessTokenWhereUniqueInput
  update: AccessTokenUpdateDataInput
  create: AccessTokenCreateInput
}

export interface DirectoryWhereUniqueInput {
  id?: ID_Input
}

export interface GithubProfileUpsertNestedInput {
  update: GithubProfileUpdateDataInput
  create: GithubProfileCreateInput
}

export interface NotificationUpdateInput {
  type?: NOTIFICATION_TYPE
  link?: String
  readDate?: DateTime
  user?: UserUpdateOneWithoutNotificationsInput
}

export interface PostUpdateManyWithoutAuthorInput {
  create?: PostCreateWithoutAuthorInput[] | PostCreateWithoutAuthorInput
  connect?: PostWhereUniqueInput[] | PostWhereUniqueInput
  disconnect?: PostWhereUniqueInput[] | PostWhereUniqueInput
  delete?: PostWhereUniqueInput[] | PostWhereUniqueInput
  update?:
    | PostUpdateWithWhereUniqueWithoutAuthorInput[]
    | PostUpdateWithWhereUniqueWithoutAuthorInput
  upsert?:
    | PostUpsertWithWhereUniqueWithoutAuthorInput[]
    | PostUpsertWithWhereUniqueWithoutAuthorInput
}

export interface FileUpdateWithWhereUniqueWithoutParentInput {
  where: FileWhereUniqueInput
  data: FileUpdateWithoutParentDataInput
}

export interface PostUpdateWithWhereUniqueWithoutAuthorInput {
  where: PostWhereUniqueInput
  data: PostUpdateWithoutAuthorDataInput
}

export interface PostUpsertWithoutCommentsInput {
  update: PostUpdateWithoutCommentsDataInput
  create: PostCreateWithoutCommentsInput
}

export interface PostUpdateWithoutAuthorDataInput {
  visibility?: VISIBILITY
  views?: Int
  content?: FileUpdateOneInput
  tags?: TagUpdateManyInput
  comments?: CommentUpdateManyWithoutPostInput
}

export interface TagUpdateInput {
  text?: String
}

export interface FileUpdateOneInput {
  create?: FileCreateInput
  connect?: FileWhereUniqueInput
  delete?: Boolean
  update?: FileUpdateDataInput
  upsert?: FileUpsertNestedInput
}

export interface PostUpdateInput {
  visibility?: VISIBILITY
  views?: Int
  author?: UserUpdateOneWithoutPostsInput
  content?: FileUpdateOneInput
  tags?: TagUpdateManyInput
  comments?: CommentUpdateManyWithoutPostInput
}

export interface FileUpdateDataInput {
  name?: String
  type?: FILE_TYPE
  data?: String
  isDirty?: Boolean
  isTransient?: Boolean
  bufferType?: FILE_TYPE
  description?: String
  uuid?: String
  contentType?: String
  s3Url?: String
  size?: Int
  parent?: DirectoryUpdateOneWithoutChildrenInput
}

export interface CommentUpsertWithWhereUniqueWithoutPostInput {
  where: CommentWhereUniqueInput
  update: CommentUpdateWithoutPostDataInput
  create: CommentCreateWithoutPostInput
}

export interface DirectoryUpdateOneWithoutChildrenInput {
  create?: DirectoryCreateWithoutChildrenInput
  connect?: DirectoryWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: DirectoryUpdateWithoutChildrenDataInput
  upsert?: DirectoryUpsertWithoutChildrenInput
}

export interface UserUpdateWithoutSentMessagesDataInput {
  email?: String
  password?: String
  name?: String
  connectedWithGithub?: Boolean
  githubProviderId?: String
  resetToken?: String
  resetTokenExpiry?: String
  emailConfirmed?: Boolean
  permissions?: UserUpdatepermissionsInput
  githubProfile?: GithubProfileUpdateOneInput
  posts?: PostUpdateManyWithoutAuthorInput
  receivedMessages?: MessageUpdateManyWithoutToInput
  notifications?: NotificationUpdateManyWithoutUserInput
}

export interface DirectoryUpdateWithoutChildrenDataInput {
  name?: String
  isOpen?: Boolean
}

export interface MessageUpdateManyWithoutToInput {
  create?: MessageCreateWithoutToInput[] | MessageCreateWithoutToInput
  connect?: MessageWhereUniqueInput[] | MessageWhereUniqueInput
  disconnect?: MessageWhereUniqueInput[] | MessageWhereUniqueInput
  delete?: MessageWhereUniqueInput[] | MessageWhereUniqueInput
  update?:
    | MessageUpdateWithWhereUniqueWithoutToInput[]
    | MessageUpdateWithWhereUniqueWithoutToInput
  upsert?:
    | MessageUpsertWithWhereUniqueWithoutToInput[]
    | MessageUpsertWithWhereUniqueWithoutToInput
}

export interface DirectoryUpsertWithoutChildrenInput {
  update: DirectoryUpdateWithoutChildrenDataInput
  create: DirectoryCreateWithoutChildrenInput
}

export interface GithubProfileCreateOneInput {
  create?: GithubProfileCreateInput
  connect?: GithubProfileWhereUniqueInput
}

export interface FileUpsertNestedInput {
  update: FileUpdateDataInput
  create: FileCreateInput
}

export interface AccessTokenCreatescopesInput {
  set?: String[] | String
}

export interface TagUpdateManyInput {
  create?: TagCreateInput[] | TagCreateInput
  connect?: TagWhereUniqueInput[] | TagWhereUniqueInput
  disconnect?: TagWhereUniqueInput[] | TagWhereUniqueInput
  delete?: TagWhereUniqueInput[] | TagWhereUniqueInput
  update?:
    | TagUpdateWithWhereUniqueNestedInput[]
    | TagUpdateWithWhereUniqueNestedInput
  upsert?:
    | TagUpsertWithWhereUniqueNestedInput[]
    | TagUpsertWithWhereUniqueNestedInput
}

export interface DirectorySubscriptionWhereInput {
  AND?: DirectorySubscriptionWhereInput[] | DirectorySubscriptionWhereInput
  OR?: DirectorySubscriptionWhereInput[] | DirectorySubscriptionWhereInput
  NOT?: DirectorySubscriptionWhereInput[] | DirectorySubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: DirectoryWhereInput
}

export interface TagUpdateWithWhereUniqueNestedInput {
  where: TagWhereUniqueInput
  data: TagUpdateDataInput
}

export interface AccessTokenWhereInput {
  AND?: AccessTokenWhereInput[] | AccessTokenWhereInput
  OR?: AccessTokenWhereInput[] | AccessTokenWhereInput
  NOT?: AccessTokenWhereInput[] | AccessTokenWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  token?: String
  token_not?: String
  token_in?: String[] | String
  token_not_in?: String[] | String
  token_lt?: String
  token_lte?: String
  token_gt?: String
  token_gte?: String
  token_contains?: String
  token_not_contains?: String
  token_starts_with?: String
  token_not_starts_with?: String
  token_ends_with?: String
  token_not_ends_with?: String
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
}

export interface TagUpdateDataInput {
  text?: String
}

export interface GithubProfileWhereUniqueInput {
  githubUserId?: Int
  username?: String
}

export interface TagUpsertWithWhereUniqueNestedInput {
  where: TagWhereUniqueInput
  update: TagUpdateDataInput
  create: TagCreateInput
}

export interface NotificationWhereUniqueInput {
  id?: ID_Input
}

export interface CommentUpdateManyWithoutPostInput {
  create?: CommentCreateWithoutPostInput[] | CommentCreateWithoutPostInput
  connect?: CommentWhereUniqueInput[] | CommentWhereUniqueInput
  disconnect?: CommentWhereUniqueInput[] | CommentWhereUniqueInput
  delete?: CommentWhereUniqueInput[] | CommentWhereUniqueInput
  update?:
    | CommentUpdateWithWhereUniqueWithoutPostInput[]
    | CommentUpdateWithWhereUniqueWithoutPostInput
  upsert?:
    | CommentUpsertWithWhereUniqueWithoutPostInput[]
    | CommentUpsertWithWhereUniqueWithoutPostInput
}

export interface DirectoryUpdateInput {
  name?: String
  isOpen?: Boolean
  children?: FileUpdateManyWithoutParentInput
}

export interface CommentUpdateWithWhereUniqueWithoutPostInput {
  where: CommentWhereUniqueInput
  data: CommentUpdateWithoutPostDataInput
}

export interface UserUpdateWithoutPostsDataInput {
  email?: String
  password?: String
  name?: String
  connectedWithGithub?: Boolean
  githubProviderId?: String
  resetToken?: String
  resetTokenExpiry?: String
  emailConfirmed?: Boolean
  permissions?: UserUpdatepermissionsInput
  githubProfile?: GithubProfileUpdateOneInput
  sentMessages?: MessageUpdateManyWithoutFromInput
  receivedMessages?: MessageUpdateManyWithoutToInput
  notifications?: NotificationUpdateManyWithoutUserInput
}

export interface CommentUpdateWithoutPostDataInput {
  content?: String
  author?: UserUpdateOneInput
}

export interface MessageUpsertWithWhereUniqueWithoutToInput {
  where: MessageWhereUniqueInput
  update: MessageUpdateWithoutToDataInput
  create: MessageCreateWithoutToInput
}

export interface UserUpdateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
  delete?: Boolean
  update?: UserUpdateDataInput
  upsert?: UserUpsertNestedInput
}

export interface UserCreateInput {
  email: String
  password: String
  name?: String
  connectedWithGithub?: Boolean
  githubProviderId?: String
  resetToken?: String
  resetTokenExpiry?: String
  emailConfirmed?: Boolean
  permissions?: UserCreatepermissionsInput
  githubProfile?: GithubProfileCreateOneInput
  posts?: PostCreateManyWithoutAuthorInput
  sentMessages?: MessageCreateManyWithoutFromInput
  receivedMessages?: MessageCreateManyWithoutToInput
  notifications?: NotificationCreateManyWithoutUserInput
}

export interface UserUpdateDataInput {
  email?: String
  password?: String
  name?: String
  connectedWithGithub?: Boolean
  githubProviderId?: String
  resetToken?: String
  resetTokenExpiry?: String
  emailConfirmed?: Boolean
  permissions?: UserUpdatepermissionsInput
  githubProfile?: GithubProfileUpdateOneInput
  posts?: PostUpdateManyWithoutAuthorInput
  sentMessages?: MessageUpdateManyWithoutFromInput
  receivedMessages?: MessageUpdateManyWithoutToInput
  notifications?: NotificationUpdateManyWithoutUserInput
}

export interface NotificationSubscriptionWhereInput {
  AND?:
    | NotificationSubscriptionWhereInput[]
    | NotificationSubscriptionWhereInput
  OR?: NotificationSubscriptionWhereInput[] | NotificationSubscriptionWhereInput
  NOT?:
    | NotificationSubscriptionWhereInput[]
    | NotificationSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: NotificationWhereInput
}

export interface MessageUpdateManyWithoutFromInput {
  create?: MessageCreateWithoutFromInput[] | MessageCreateWithoutFromInput
  connect?: MessageWhereUniqueInput[] | MessageWhereUniqueInput
  disconnect?: MessageWhereUniqueInput[] | MessageWhereUniqueInput
  delete?: MessageWhereUniqueInput[] | MessageWhereUniqueInput
  update?:
    | MessageUpdateWithWhereUniqueWithoutFromInput[]
    | MessageUpdateWithWhereUniqueWithoutFromInput
  upsert?:
    | MessageUpsertWithWhereUniqueWithoutFromInput[]
    | MessageUpsertWithWhereUniqueWithoutFromInput
}

export interface GithubProfileWhereInput {
  AND?: GithubProfileWhereInput[] | GithubProfileWhereInput
  OR?: GithubProfileWhereInput[] | GithubProfileWhereInput
  NOT?: GithubProfileWhereInput[] | GithubProfileWhereInput
  githubUserId?: Int
  githubUserId_not?: Int
  githubUserId_in?: Int[] | Int
  githubUserId_not_in?: Int[] | Int
  githubUserId_lt?: Int
  githubUserId_lte?: Int
  githubUserId_gt?: Int
  githubUserId_gte?: Int
  username?: String
  username_not?: String
  username_in?: String[] | String
  username_not_in?: String[] | String
  username_lt?: String
  username_lte?: String
  username_gt?: String
  username_gte?: String
  username_contains?: String
  username_not_contains?: String
  username_starts_with?: String
  username_not_starts_with?: String
  username_ends_with?: String
  username_not_ends_with?: String
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  bio?: String
  bio_not?: String
  bio_in?: String[] | String
  bio_not_in?: String[] | String
  bio_lt?: String
  bio_lte?: String
  bio_gt?: String
  bio_gte?: String
  bio_contains?: String
  bio_not_contains?: String
  bio_starts_with?: String
  bio_not_starts_with?: String
  bio_ends_with?: String
  bio_not_ends_with?: String
  website?: String
  website_not?: String
  website_in?: String[] | String
  website_not_in?: String[] | String
  website_lt?: String
  website_lte?: String
  website_gt?: String
  website_gte?: String
  website_contains?: String
  website_not_contains?: String
  website_starts_with?: String
  website_not_starts_with?: String
  website_ends_with?: String
  website_not_ends_with?: String
  email?: String
  email_not?: String
  email_in?: String[] | String
  email_not_in?: String[] | String
  email_lt?: String
  email_lte?: String
  email_gt?: String
  email_gte?: String
  email_contains?: String
  email_not_contains?: String
  email_starts_with?: String
  email_not_starts_with?: String
  email_ends_with?: String
  email_not_ends_with?: String
  profilePhoto?: String
  profilePhoto_not?: String
  profilePhoto_in?: String[] | String
  profilePhoto_not_in?: String[] | String
  profilePhoto_lt?: String
  profilePhoto_lte?: String
  profilePhoto_gt?: String
  profilePhoto_gte?: String
  profilePhoto_contains?: String
  profilePhoto_not_contains?: String
  profilePhoto_starts_with?: String
  profilePhoto_not_starts_with?: String
  profilePhoto_ends_with?: String
  profilePhoto_not_ends_with?: String
  accessTokens_every?: AccessTokenWhereInput
  accessTokens_some?: AccessTokenWhereInput
  accessTokens_none?: AccessTokenWhereInput
}

export interface MessageUpdateWithWhereUniqueWithoutFromInput {
  where: MessageWhereUniqueInput
  data: MessageUpdateWithoutFromDataInput
}

export interface FileUpsertWithWhereUniqueWithoutParentInput {
  where: FileWhereUniqueInput
  update: FileUpdateWithoutParentDataInput
  create: FileCreateWithoutParentInput
}

export interface MessageUpdateWithoutFromDataInput {
  deliveredAt?: DateTime
  readAt?: DateTime
  to?: UserUpdateOneWithoutReceivedMessagesInput
}

export interface GithubProfileUpdateInput {
  githubUserId?: Int
  username?: String
  name?: String
  bio?: String
  website?: String
  email?: String
  profilePhoto?: String
  accessTokens?: AccessTokenUpdateManyInput
}

export interface UserUpdateOneWithoutReceivedMessagesInput {
  create?: UserCreateWithoutReceivedMessagesInput
  connect?: UserWhereUniqueInput
  delete?: Boolean
  update?: UserUpdateWithoutReceivedMessagesDataInput
  upsert?: UserUpsertWithoutReceivedMessagesInput
}

export interface AccessTokenCreateManyInput {
  create?: AccessTokenCreateInput[] | AccessTokenCreateInput
  connect?: AccessTokenWhereUniqueInput[] | AccessTokenWhereUniqueInput
}

export interface NotificationUpdateWithoutUserDataInput {
  type?: NOTIFICATION_TYPE
  link?: String
  readDate?: DateTime
}

export interface NotificationUpdateWithWhereUniqueWithoutUserInput {
  where: NotificationWhereUniqueInput
  data: NotificationUpdateWithoutUserDataInput
}

export interface NotificationUpdateManyWithoutUserInput {
  create?:
    | NotificationCreateWithoutUserInput[]
    | NotificationCreateWithoutUserInput
  connect?: NotificationWhereUniqueInput[] | NotificationWhereUniqueInput
  disconnect?: NotificationWhereUniqueInput[] | NotificationWhereUniqueInput
  delete?: NotificationWhereUniqueInput[] | NotificationWhereUniqueInput
  update?:
    | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    | NotificationUpdateWithWhereUniqueWithoutUserInput
  upsert?:
    | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    | NotificationUpsertWithWhereUniqueWithoutUserInput
}

export interface UserUpdateWithoutReceivedMessagesDataInput {
  email?: String
  password?: String
  name?: String
  connectedWithGithub?: Boolean
  githubProviderId?: String
  resetToken?: String
  resetTokenExpiry?: String
  emailConfirmed?: Boolean
  permissions?: UserUpdatepermissionsInput
  githubProfile?: GithubProfileUpdateOneInput
  posts?: PostUpdateManyWithoutAuthorInput
  sentMessages?: MessageUpdateManyWithoutFromInput
  notifications?: NotificationUpdateManyWithoutUserInput
}

export interface FileWhereInput {
  AND?: FileWhereInput[] | FileWhereInput
  OR?: FileWhereInput[] | FileWhereInput
  NOT?: FileWhereInput[] | FileWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  type?: FILE_TYPE
  type_not?: FILE_TYPE
  type_in?: FILE_TYPE[] | FILE_TYPE
  type_not_in?: FILE_TYPE[] | FILE_TYPE
  data?: String
  data_not?: String
  data_in?: String[] | String
  data_not_in?: String[] | String
  data_lt?: String
  data_lte?: String
  data_gt?: String
  data_gte?: String
  data_contains?: String
  data_not_contains?: String
  data_starts_with?: String
  data_not_starts_with?: String
  data_ends_with?: String
  data_not_ends_with?: String
  isDirty?: Boolean
  isDirty_not?: Boolean
  isTransient?: Boolean
  isTransient_not?: Boolean
  bufferType?: FILE_TYPE
  bufferType_not?: FILE_TYPE
  bufferType_in?: FILE_TYPE[] | FILE_TYPE
  bufferType_not_in?: FILE_TYPE[] | FILE_TYPE
  description?: String
  description_not?: String
  description_in?: String[] | String
  description_not_in?: String[] | String
  description_lt?: String
  description_lte?: String
  description_gt?: String
  description_gte?: String
  description_contains?: String
  description_not_contains?: String
  description_starts_with?: String
  description_not_starts_with?: String
  description_ends_with?: String
  description_not_ends_with?: String
  uuid?: String
  uuid_not?: String
  uuid_in?: String[] | String
  uuid_not_in?: String[] | String
  uuid_lt?: String
  uuid_lte?: String
  uuid_gt?: String
  uuid_gte?: String
  uuid_contains?: String
  uuid_not_contains?: String
  uuid_starts_with?: String
  uuid_not_starts_with?: String
  uuid_ends_with?: String
  uuid_not_ends_with?: String
  contentType?: String
  contentType_not?: String
  contentType_in?: String[] | String
  contentType_not_in?: String[] | String
  contentType_lt?: String
  contentType_lte?: String
  contentType_gt?: String
  contentType_gte?: String
  contentType_contains?: String
  contentType_not_contains?: String
  contentType_starts_with?: String
  contentType_not_starts_with?: String
  contentType_ends_with?: String
  contentType_not_ends_with?: String
  s3Url?: String
  s3Url_not?: String
  s3Url_in?: String[] | String
  s3Url_not_in?: String[] | String
  s3Url_lt?: String
  s3Url_lte?: String
  s3Url_gt?: String
  s3Url_gte?: String
  s3Url_contains?: String
  s3Url_not_contains?: String
  s3Url_starts_with?: String
  s3Url_not_starts_with?: String
  s3Url_ends_with?: String
  s3Url_not_ends_with?: String
  size?: Int
  size_not?: Int
  size_in?: Int[] | Int
  size_not_in?: Int[] | Int
  size_lt?: Int
  size_lte?: Int
  size_gt?: Int
  size_gte?: Int
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  parent?: DirectoryWhereInput
}

export interface MessageUpdateWithoutToDataInput {
  deliveredAt?: DateTime
  readAt?: DateTime
  from?: UserUpdateOneWithoutSentMessagesInput
}

export interface PostUpdateOneWithoutCommentsInput {
  create?: PostCreateWithoutCommentsInput
  connect?: PostWhereUniqueInput
  delete?: Boolean
  update?: PostUpdateWithoutCommentsDataInput
  upsert?: PostUpsertWithoutCommentsInput
}

export interface CommentWhereUniqueInput {
  id?: ID_Input
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface NotificationPreviousValues {
  id: ID_Output
  createdAt: DateTime
  type?: NOTIFICATION_TYPE
  link: String
  readDate?: DateTime
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

export interface AccessToken extends Node {
  id: ID_Output
  scopes?: String[]
  token: String
  createdAt: DateTime
  updatedAt: DateTime
}

export interface NotificationSubscriptionPayload {
  mutation: MutationType
  node?: Notification
  updatedFields?: String[]
  previousValues?: NotificationPreviousValues
}

export interface User extends Node {
  id: ID_Output
  email: String
  password: String
  name?: String
  connectedWithGithub: Boolean
  githubProfile?: GithubProfile
  githubProviderId?: String
  posts?: Post[]
  sentMessages?: Message[]
  receivedMessages?: Message[]
  notifications?: Notification[]
  resetToken?: String
  resetTokenExpiry?: String
  permissions?: PERMISSION[]
  emailConfirmed: Boolean
  createdAt: DateTime
  updatedAt: DateTime
}

export interface AggregateNotification {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface NotificationConnection {
  pageInfo: PageInfo
  edges: NotificationEdge[]
  aggregate: AggregateNotification
}

export interface BatchPayload {
  count: Long
}

/*
 * An edge in a connection.

 */
export interface MessageEdge {
  node: Message
  cursor: String
}

export interface GithubProfile {
  githubUserId: Int
  username: String
  name?: String
  bio?: String
  website?: String
  email?: String
  profilePhoto?: String
  accessTokens?: AccessToken[]
}

export interface AggregateDirectory {
  count: Int
}

export interface Notification extends Node {
  id: ID_Output
  createdAt: DateTime
  type?: NOTIFICATION_TYPE
  user: User
  link: String
  readDate?: DateTime
}

/*
 * A connection to a list of items.

 */
export interface DirectoryConnection {
  pageInfo: PageInfo
  edges: DirectoryEdge[]
  aggregate: AggregateDirectory
}

export interface MessagePreviousValues {
  id: ID_Output
  createdAt: DateTime
  deliveredAt: DateTime
  readAt?: DateTime
}

/*
 * An edge in a connection.

 */
export interface FileEdge {
  node: File
  cursor: String
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

export interface AggregateComment {
  count: Int
}

export interface UserPreviousValues {
  id: ID_Output
  email: String
  password: String
  name?: String
  connectedWithGithub: Boolean
  githubProviderId?: String
  resetToken?: String
  resetTokenExpiry?: String
  permissions?: PERMISSION[]
  emailConfirmed: Boolean
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * A connection to a list of items.

 */
export interface CommentConnection {
  pageInfo: PageInfo
  edges: CommentEdge[]
  aggregate: AggregateComment
}

export interface MessageSubscriptionPayload {
  mutation: MutationType
  node?: Message
  updatedFields?: String[]
  previousValues?: MessagePreviousValues
}

/*
 * An edge in a connection.

 */
export interface TagEdge {
  node: Tag
  cursor: String
}

export interface GithubProfileSubscriptionPayload {
  mutation: MutationType
  node?: GithubProfile
  updatedFields?: String[]
  previousValues?: GithubProfilePreviousValues
}

export interface AggregatePost {
  count: Int
}

export interface GithubProfilePreviousValues {
  githubUserId: Int
  username: String
  name?: String
  bio?: String
  website?: String
  email?: String
  profilePhoto?: String
}

/*
 * A connection to a list of items.

 */
export interface PostConnection {
  pageInfo: PageInfo
  edges: PostEdge[]
  aggregate: AggregatePost
}

export interface Message extends Node {
  id: ID_Output
  createdAt: DateTime
  from: User
  to: User
  deliveredAt: DateTime
  readAt?: DateTime
}

/*
 * An edge in a connection.

 */
export interface AccessTokenEdge {
  node: AccessToken
  cursor: String
}

export interface AccessTokenSubscriptionPayload {
  mutation: MutationType
  node?: AccessToken
  updatedFields?: String[]
  previousValues?: AccessTokenPreviousValues
}

export interface AggregateGithubProfile {
  count: Int
}

export interface AccessTokenPreviousValues {
  id: ID_Output
  scopes?: String[]
  token: String
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * A connection to a list of items.

 */
export interface GithubProfileConnection {
  pageInfo: PageInfo
  edges: GithubProfileEdge[]
  aggregate: AggregateGithubProfile
}

export interface Comment extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  author: User
  content?: String
  post: Post
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

export interface PostSubscriptionPayload {
  mutation: MutationType
  node?: Post
  updatedFields?: String[]
  previousValues?: PostPreviousValues
}

/*
 * An edge in a connection.

 */
export interface NotificationEdge {
  node: Notification
  cursor: String
}

export interface PostPreviousValues {
  id: ID_Output
  visibility?: VISIBILITY
  views?: Int
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * A connection to a list of items.

 */
export interface MessageConnection {
  pageInfo: PageInfo
  edges: MessageEdge[]
  aggregate: AggregateMessage
}

export interface Tag extends Node {
  id: ID_Output
  text: String
}

export interface AggregateFile {
  count: Int
}

export interface TagSubscriptionPayload {
  mutation: MutationType
  node?: Tag
  updatedFields?: String[]
  previousValues?: TagPreviousValues
}

/*
 * An edge in a connection.

 */
export interface CommentEdge {
  node: Comment
  cursor: String
}

export interface TagPreviousValues {
  id: ID_Output
  text: String
}

/*
 * A connection to a list of items.

 */
export interface TagConnection {
  pageInfo: PageInfo
  edges: TagEdge[]
  aggregate: AggregateTag
}

export interface Directory extends Node {
  id: ID_Output
  name?: String
  children?: File[]
  isOpen: Boolean
  createdAt: DateTime
  updatedAt: DateTime
}

export interface AggregateAccessToken {
  count: Int
}

export interface CommentSubscriptionPayload {
  mutation: MutationType
  node?: Comment
  updatedFields?: String[]
  previousValues?: CommentPreviousValues
}

/*
 * An edge in a connection.

 */
export interface GithubProfileEdge {
  node: GithubProfile
  cursor: String
}

export interface CommentPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  content?: String
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

export interface File extends Node {
  id: ID_Output
  name: String
  type: FILE_TYPE
  data: String
  parent?: Directory
  isDirty: Boolean
  isTransient: Boolean
  bufferType?: FILE_TYPE
  description?: String
  uuid?: String
  contentType?: String
  s3Url?: String
  size?: Int
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * An edge in a connection.

 */
export interface DirectoryEdge {
  node: Directory
  cursor: String
}

export interface FileSubscriptionPayload {
  mutation: MutationType
  node?: File
  updatedFields?: String[]
  previousValues?: FilePreviousValues
}

export interface AggregateTag {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface AccessTokenConnection {
  pageInfo: PageInfo
  edges: AccessTokenEdge[]
  aggregate: AggregateAccessToken
}

export interface DirectoryPreviousValues {
  id: ID_Output
  name?: String
  isOpen: Boolean
  createdAt: DateTime
  updatedAt: DateTime
}

export interface DirectorySubscriptionPayload {
  mutation: MutationType
  node?: Directory
  updatedFields?: String[]
  previousValues?: DirectoryPreviousValues
}

export interface Post extends Node {
  id: ID_Output
  author: User
  visibility?: VISIBILITY
  content: File
  tags?: Tag[]
  views?: Int
  comments?: Comment[]
  createdAt: DateTime
  updatedAt: DateTime
}

export interface FilePreviousValues {
  id: ID_Output
  name: String
  type: FILE_TYPE
  data: String
  isDirty: Boolean
  isTransient: Boolean
  bufferType?: FILE_TYPE
  description?: String
  uuid?: String
  contentType?: String
  s3Url?: String
  size?: Int
  createdAt: DateTime
  updatedAt: DateTime
}

export interface AggregateUser {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface PostEdge {
  node: Post
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface FileConnection {
  pageInfo: PageInfo
  edges: FileEdge[]
  aggregate: AggregateFile
}

export interface AggregateMessage {
  count: Int
}

export type DateTime = Date | string

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number
