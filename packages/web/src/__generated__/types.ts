

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
  gistId: string;
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
  gistId: string;
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

//==============================================================
// END Enums and Input Objects
//==============================================================