

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Signup
// ====================================================

export interface Signup_signup {
  __typename: "MutationResult";
  success: boolean | null;
}

export interface Signup {
  signup: Signup_signup;
}

export interface SignupVariables {
  name?: string | null;
  email: string;
  password: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_user {
  __typename: "User";
  id: string;
}

export interface Login_login {
  __typename: "AuthPayload";
  user: Login_login_user;
  token: string;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  email: string;
  password: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResendConfirmationEmail
// ====================================================

export interface ResendConfirmationEmail_resendConfirmationEmail {
  __typename: "MutationResult";
  success: boolean | null;
}

export interface ResendConfirmationEmail {
  resendConfirmationEmail: ResendConfirmationEmail_resendConfirmationEmail;
}

export interface ResendConfirmationEmailVariables {
  email: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Logout
// ====================================================

export interface Logout_logout {
  __typename: "MutationResult";
  success: boolean | null;
}

export interface Logout {
  logout: Logout_logout;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LogoutOfAllSessions
// ====================================================

export interface LogoutOfAllSessions_logoutOfAllSessions {
  __typename: "MutationResult";
  success: boolean | null;
}

export interface LogoutOfAllSessions {
  logoutOfAllSessions: LogoutOfAllSessions_logoutOfAllSessions;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_viewer_me_githubProfile {
  __typename: "GithubProfile";
  login: string;
  githubUserId: number;
  name: string | null;
}

export interface Me_viewer_me {
  __typename: "User";
  id: string;
  name: string | null;
  emailConfirmed: boolean;
  email: string;
  githubProfile: Me_viewer_me_githubProfile | null;
}

export interface Me_viewer {
  __typename: "Viewer";
  me: Me_viewer_me | null;
}

export interface Me {
  viewer: Me_viewer | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ViewerGists
// ====================================================

export interface ViewerGists_viewer_gists_files {
  __typename: "GistFile";
  filename: string | null;
  type: string | null;
  language: string | null;
  raw_url: string | null;
  size: number | null;
  truncated: boolean | null;
  content: string | null;
}

export interface ViewerGists_viewer_gists {
  __typename: "Gist";
  gistId: string;
  files: ViewerGists_viewer_gists_files[];
  description: string;
  isPublic: boolean;
  url: string | null;
  forks_url: string | null;
  commits_url: string | null;
  git_pull_url: string | null;
  git_push_url: string | null;
  html_url: string | null;
  created_at: string | null;
  updated_at: string | null;
  comments: number | null;
  history: (string | null)[] | null;
}

export interface ViewerGists_viewer {
  __typename: "Viewer";
  gists: ViewerGists_viewer_gists[];
}

export interface ViewerGists {
  viewer: ViewerGists_viewer | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetGistById
// ====================================================

export interface GetGistById_getGistById_files {
  __typename: "GistFile";
  filename: string | null;
  type: string | null;
  language: string | null;
  raw_url: string | null;
  size: number | null;
  truncated: boolean | null;
  content: string | null;
}

export interface GetGistById_getGistById {
  __typename: "Gist";
  gistId: string;
  description: string;
  files: GetGistById_getGistById_files[];
  isPublic: boolean;
}

export interface GetGistById {
  getGistById: GetGistById_getGistById | null;
}

export interface GetGistByIdVariables {
  gistId: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateGist
// ====================================================

export interface CreateGist_createGist_files {
  __typename: "GistFile";
  filename: string | null;
  type: string | null;
  language: string | null;
  raw_url: string | null;
  size: number | null;
  truncated: boolean | null;
  content: string | null;
}

export interface CreateGist_createGist {
  __typename: "Gist";
  description: string;
  isPublic: boolean;
  files: CreateGist_createGist_files[];
  created_at: string | null;
}

export interface CreateGist {
  createGist: CreateGist_createGist | null;
}

export interface CreateGistVariables {
  data?: GistCreateInput | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateGist
// ====================================================

export interface UpdateGist_updateGist_files {
  __typename: "GistFile";
  filename: string | null;
  type: string | null;
  language: string | null;
  raw_url: string | null;
  size: number | null;
  truncated: boolean | null;
  content: string | null;
}

export interface UpdateGist_updateGist {
  __typename: "Gist";
  description: string;
  isPublic: boolean;
  files: UpdateGist_updateGist_files[];
  created_at: string | null;
  updated_at: string | null;
}

export interface UpdateGist {
  updateGist: UpdateGist_updateGist | null;
}

export interface UpdateGistVariables {
  data?: GistUpdateInput | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteGist
// ====================================================

export interface DeleteGist_deleteGist {
  __typename: "MutationResult";
  success: boolean | null;
}

export interface DeleteGist {
  deleteGist: DeleteGist_deleteGist;
}

export interface DeleteGistVariables {
  gistId: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePost
// ====================================================

export interface CreatePost_createPost_files {
  __typename: "File";
  name: string;
  type: FILE_TYPE;
  content: string;
}

export interface CreatePost_createPost {
  __typename: "Post";
  id: string;
  visibility: VISIBILITY | null;
  files: CreatePost_createPost_files[] | null;
}

export interface CreatePost {
  createPost: CreatePost_createPost;
}

export interface CreatePostVariables {
  data?: PostCreateInput | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: Counter
// ====================================================

export interface Counter_counter {
  __typename: "Counter";
  count: number;
}

export interface Counter {
  counter: Counter_counter;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum VISIBILITY {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
}

export enum PERMISSION {
  ADMIN = "ADMIN",
  CHANGE_PERMISSIONS = "CHANGE_PERMISSIONS",
  CREATE = "CREATE",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
  USER = "USER",
}

export enum FILE_TYPE {
  C = "C",
  CPP = "CPP",
  CSS = "CSS",
  DIRECTORY = "DIRECTORY",
  DOT = "DOT",
  HTML = "HTML",
  JAVASCRIPT = "JAVASCRIPT",
  JSON = "JSON",
  LOG = "LOG",
  MARKDOWN = "MARKDOWN",
  RUST = "RUST",
  TOML = "TOML",
  TYPESCRIPT = "TYPESCRIPT",
  UNKNOWN = "UNKNOWN",
  WASM = "WASM",
  WAT = "WAT",
  X86 = "X86",
}

export enum NOTIFICATION_TYPE {
  NEW_COMMENT = "NEW_COMMENT",
  NEW_MESSAGE = "NEW_MESSAGE",
}

// 
export interface GistCreateInput {
  files: GistCreateFileObjectInput[];
  description: string;
  isPublic: boolean;
}

// 
export interface GistCreateFileObjectInput {
  filename?: string | null;
  content?: string | null;
}

// 
export interface GistUpdateInput {
  gistId: string;
  files?: (GistCreateFileObjectInput | null)[] | null;
  description?: string | null;
}

// 
export interface PostCreateInput {
  visibility?: VISIBILITY | null;
  views?: number | null;
  author: UserCreateOneWithoutPostsInput;
  files?: FileCreateManyInput | null;
  tags?: TagCreateManyInput | null;
  comments?: CommentCreateManyWithoutPostInput | null;
}

// 
export interface UserCreateOneWithoutPostsInput {
  create?: UserCreateWithoutPostsInput | null;
  connect?: UserWhereUniqueInput | null;
}

// 
export interface UserCreateWithoutPostsInput {
  email: string;
  password: string;
  name?: string | null;
  resetToken?: string | null;
  resetTokenExpiry?: string | null;
  emailConfirmed?: boolean | null;
  permissions?: UserCreatepermissionsInput | null;
  githubProfile?: GithubProfileCreateOneWithoutProfileOwnerInput | null;
  sentMessages?: MessageCreateManyWithoutFromInput | null;
  receivedMessages?: MessageCreateManyWithoutToInput | null;
  notifications?: NotificationCreateManyWithoutUserInput | null;
}

// 
export interface UserCreatepermissionsInput {
  set?: PERMISSION[] | null;
}

// 
export interface GithubProfileCreateOneWithoutProfileOwnerInput {
  create?: GithubProfileCreateWithoutProfileOwnerInput | null;
  connect?: GithubProfileWhereUniqueInput | null;
}

// 
export interface GithubProfileCreateWithoutProfileOwnerInput {
  login: string;
  githubUserId: number;
  node_id: string;
  name?: string | null;
  bio?: string | null;
  website?: string | null;
  githubEmail: string;
  profilePhoto?: string | null;
  accessTokens?: AccessTokenCreateManyInput | null;
}

// 
export interface AccessTokenCreateManyInput {
  create?: AccessTokenCreateInput[] | null;
  connect?: AccessTokenWhereUniqueInput[] | null;
}

// 
export interface AccessTokenCreateInput {
  token: string;
  scopes?: AccessTokenCreatescopesInput | null;
}

// 
export interface AccessTokenCreatescopesInput {
  set?: string[] | null;
}

// 
export interface AccessTokenWhereUniqueInput {
  id?: string | null;
}

// 
export interface GithubProfileWhereUniqueInput {
  login?: string | null;
  githubUserId?: number | null;
  githubEmail?: string | null;
}

// 
export interface MessageCreateManyWithoutFromInput {
  create?: MessageCreateWithoutFromInput[] | null;
  connect?: MessageWhereUniqueInput[] | null;
}

// 
export interface MessageCreateWithoutFromInput {
  deliveredAt: any;
  readAt?: any | null;
  to: UserCreateOneWithoutReceivedMessagesInput;
}

// 
export interface UserCreateOneWithoutReceivedMessagesInput {
  create?: UserCreateWithoutReceivedMessagesInput | null;
  connect?: UserWhereUniqueInput | null;
}

// 
export interface UserCreateWithoutReceivedMessagesInput {
  email: string;
  password: string;
  name?: string | null;
  resetToken?: string | null;
  resetTokenExpiry?: string | null;
  emailConfirmed?: boolean | null;
  permissions?: UserCreatepermissionsInput | null;
  githubProfile?: GithubProfileCreateOneWithoutProfileOwnerInput | null;
  posts?: PostCreateManyWithoutAuthorInput | null;
  sentMessages?: MessageCreateManyWithoutFromInput | null;
  notifications?: NotificationCreateManyWithoutUserInput | null;
}

// 
export interface PostCreateManyWithoutAuthorInput {
  create?: PostCreateWithoutAuthorInput[] | null;
  connect?: PostWhereUniqueInput[] | null;
}

// 
export interface PostCreateWithoutAuthorInput {
  visibility?: VISIBILITY | null;
  views?: number | null;
  files?: FileCreateManyInput | null;
  tags?: TagCreateManyInput | null;
  comments?: CommentCreateManyWithoutPostInput | null;
}

// 
export interface FileCreateManyInput {
  create?: FileCreateInput[] | null;
  connect?: FileWhereUniqueInput[] | null;
}

// 
export interface FileCreateInput {
  name: string;
  type?: FILE_TYPE | null;
  content?: string | null;
  isDirty?: boolean | null;
  isTransient?: boolean | null;
  bufferType?: FILE_TYPE | null;
  description?: string | null;
  uuid?: string | null;
  contentType?: string | null;
  s3Url?: string | null;
  size?: number | null;
  parent?: DirectoryCreateOneWithoutChildrenInput | null;
}

// 
export interface DirectoryCreateOneWithoutChildrenInput {
  create?: DirectoryCreateWithoutChildrenInput | null;
  connect?: DirectoryWhereUniqueInput | null;
}

// 
export interface DirectoryCreateWithoutChildrenInput {
  name?: string | null;
  isOpen?: boolean | null;
}

// 
export interface DirectoryWhereUniqueInput {
  id?: string | null;
}

// 
export interface FileWhereUniqueInput {
  id?: string | null;
  uuid?: string | null;
  s3Url?: string | null;
}

// 
export interface TagCreateManyInput {
  create?: TagCreateInput[] | null;
  connect?: TagWhereUniqueInput[] | null;
}

// 
export interface TagCreateInput {
  text: string;
}

// 
export interface TagWhereUniqueInput {
  id?: string | null;
}

// 
export interface CommentCreateManyWithoutPostInput {
  create?: CommentCreateWithoutPostInput[] | null;
  connect?: CommentWhereUniqueInput[] | null;
}

// 
export interface CommentCreateWithoutPostInput {
  content?: string | null;
  author: UserCreateOneInput;
}

// 
export interface UserCreateOneInput {
  create?: UserCreateInput | null;
  connect?: UserWhereUniqueInput | null;
}

// 
export interface UserCreateInput {
  email: string;
  password: string;
  name?: string | null;
  resetToken?: string | null;
  resetTokenExpiry?: string | null;
  emailConfirmed?: boolean | null;
  permissions?: UserCreatepermissionsInput | null;
  githubProfile?: GithubProfileCreateOneWithoutProfileOwnerInput | null;
  posts?: PostCreateManyWithoutAuthorInput | null;
  sentMessages?: MessageCreateManyWithoutFromInput | null;
  receivedMessages?: MessageCreateManyWithoutToInput | null;
  notifications?: NotificationCreateManyWithoutUserInput | null;
}

// 
export interface MessageCreateManyWithoutToInput {
  create?: MessageCreateWithoutToInput[] | null;
  connect?: MessageWhereUniqueInput[] | null;
}

// 
export interface MessageCreateWithoutToInput {
  deliveredAt: any;
  readAt?: any | null;
  from: UserCreateOneWithoutSentMessagesInput;
}

// 
export interface UserCreateOneWithoutSentMessagesInput {
  create?: UserCreateWithoutSentMessagesInput | null;
  connect?: UserWhereUniqueInput | null;
}

// 
export interface UserCreateWithoutSentMessagesInput {
  email: string;
  password: string;
  name?: string | null;
  resetToken?: string | null;
  resetTokenExpiry?: string | null;
  emailConfirmed?: boolean | null;
  permissions?: UserCreatepermissionsInput | null;
  githubProfile?: GithubProfileCreateOneWithoutProfileOwnerInput | null;
  posts?: PostCreateManyWithoutAuthorInput | null;
  receivedMessages?: MessageCreateManyWithoutToInput | null;
  notifications?: NotificationCreateManyWithoutUserInput | null;
}

// 
export interface NotificationCreateManyWithoutUserInput {
  create?: NotificationCreateWithoutUserInput[] | null;
  connect?: NotificationWhereUniqueInput[] | null;
}

// 
export interface NotificationCreateWithoutUserInput {
  type?: NOTIFICATION_TYPE | null;
  link: string;
  readDate?: any | null;
}

// 
export interface NotificationWhereUniqueInput {
  id?: string | null;
}

// 
export interface UserWhereUniqueInput {
  id?: string | null;
  email?: string | null;
}

// 
export interface MessageWhereUniqueInput {
  id?: string | null;
}

// 
export interface CommentWhereUniqueInput {
  id?: string | null;
}

// 
export interface PostWhereUniqueInput {
  id?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================