import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Book = {
  __typename?: "Book";
  id: Scalars["String"];
  title: Scalars["String"];
  description: Scalars["String"];
  authorId: Scalars["String"];
  author: User;
  likes: Scalars["Int"];
  dislikes: Scalars["Int"];
  chapters: Array<Chapter>;
  comments: Array<Comment>;
  reactions: Array<BookReaction>;
  tags?: Maybe<Array<Tag>>;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type BookReaction = {
  __typename?: "BookReaction";
  author: User;
  authorId: Scalars["String"];
  value: Scalars["Int"];
  book: Book;
  bookId: Scalars["String"];
};

export type BookReactionResponse = {
  __typename?: "BookReactionResponse";
  /** The book itself */
  book: Book;
  hasVoted: Scalars["Boolean"];
};

export type Chapter = {
  __typename?: "Chapter";
  id: Scalars["String"];
  title: Scalars["String"];
  text: Scalars["String"];
  description: Scalars["String"];
  chapterNumber: Scalars["Float"];
  likes: Scalars["Int"];
  dislikes: Scalars["Int"];
  authorId: Scalars["String"];
  author: User;
  bookId?: Maybe<Scalars["String"]>;
  book?: Maybe<Book>;
  comments?: Maybe<Array<Comment>>;
  reactions?: Maybe<Array<ChapterReaction>>;
  tags?: Maybe<Array<Tag>>;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type ChapterReaction = {
  __typename?: "ChapterReaction";
  author: User;
  authorId: Scalars["String"];
  value: Scalars["Int"];
  chapter: Chapter;
  chapterId: Scalars["String"];
};

export type ChapterReactionResponse = {
  __typename?: "ChapterReactionResponse";
  /** The chapter itself */
  chapter: Chapter;
  hasVoted: Scalars["Boolean"];
};

export type Comment = {
  __typename?: "Comment";
  id: Scalars["ID"];
  text: Scalars["String"];
  author: User;
  authorId: Scalars["String"];
  bookId?: Maybe<Scalars["String"]>;
  chapterId?: Maybe<Scalars["String"]>;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type Follow = {
  __typename?: "Follow";
  leaderId: Scalars["ID"];
  followId: Scalars["ID"];
};

export type InputCreateChapter = {
  title: Scalars["String"];
  bookId?: Maybe<Scalars["String"]>;
  text: Scalars["String"];
  description: Scalars["String"];
  tags?: Maybe<Array<InputTag>>;
};

export type InputCreateComment = {
  text: Scalars["String"];
  bookId?: Maybe<Scalars["String"]>;
  chapterId?: Maybe<Scalars["String"]>;
};

export type InputCreateTags = {
  tags: Array<InputTag>;
  bookId?: Maybe<Scalars["String"]>;
  chapterId?: Maybe<Scalars["String"]>;
};

/** Data for creating new user */
export type InputCreateUser = {
  name: Scalars["String"];
  email: Scalars["String"];
  username: Scalars["String"];
  password: Scalars["String"];
};

export type InputFollow = {
  followId: Scalars["String"];
};

export type InputNewBook = {
  title: Scalars["String"];
  description: Scalars["String"];
  tags?: Maybe<Array<InputTag>>;
};

export type InputTag = {
  label: Scalars["String"];
  value: Scalars["String"];
};

export type InputUpdateChapter = {
  bookId?: Maybe<Scalars["String"]>;
  chapterId: Scalars["String"];
  title?: Maybe<Scalars["String"]>;
  text?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createUser: User;
  login: User;
  logout: Scalars["Boolean"];
  createBook: Book;
  deleteBook: Scalars["Boolean"];
  createChapter: Chapter;
  updateChapter: Chapter;
  addChapterToBook: Chapter;
  deleteChapter: Chapter;
  createTags: Array<Tag>;
  deleteTag: Scalars["Boolean"];
  followUser: Follow;
  unfollowUser: Scalars["Boolean"];
  createComment: Comment;
  updateComment: Comment;
  deleteComment: Comment;
  reactToBook: BookReactionResponse;
  reactToChapter: ChapterReactionResponse;
};

export type MutationCreateUserArgs = {
  userData: InputCreateUser;
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  email: Scalars["String"];
};

export type MutationCreateBookArgs = {
  data: InputNewBook;
};

export type MutationDeleteBookArgs = {
  bookId: Scalars["String"];
};

export type MutationCreateChapterArgs = {
  chapterData: InputCreateChapter;
};

export type MutationUpdateChapterArgs = {
  chapterData: InputUpdateChapter;
};

export type MutationAddChapterToBookArgs = {
  bookId: Scalars["String"];
  chapterId: Scalars["String"];
};

export type MutationDeleteChapterArgs = {
  chapterId: Scalars["String"];
};

export type MutationCreateTagsArgs = {
  data: InputCreateTags;
};

export type MutationDeleteTagArgs = {
  id: Scalars["String"];
};

export type MutationFollowUserArgs = {
  data: InputFollow;
};

export type MutationUnfollowUserArgs = {
  data: InputFollow;
};

export type MutationCreateCommentArgs = {
  data: InputCreateComment;
};

export type MutationUpdateCommentArgs = {
  text: Scalars["String"];
  id: Scalars["String"];
};

export type MutationDeleteCommentArgs = {
  id: Scalars["String"];
};

export type MutationReactToBookArgs = {
  value: Scalars["Float"];
  id: Scalars["String"];
};

export type MutationReactToChapterArgs = {
  value: Scalars["Float"];
  id: Scalars["String"];
};

export type PaginatedTimelineBooks = {
  __typename?: "PaginatedTimelineBooks";
  books: Array<Book>;
  hasMore: Scalars["Boolean"];
};

export type PaginatedTimelineChapters = {
  __typename?: "PaginatedTimelineChapters";
  chapters: Array<Chapter>;
  hasMore: Scalars["Boolean"];
};

export type Query = {
  __typename?: "Query";
  allUsers: Array<User>;
  currentUser: User;
  getUser: User;
  getTimelineBooks: PaginatedTimelineBooks;
  getBook: Book;
  getBooks: Array<Book>;
  getTimelineChapters: PaginatedTimelineChapters;
  getChaptersFromBook: Array<Chapter>;
  getChapter: Chapter;
  getChaptersFromUser: Array<Chapter>;
};

export type QueryGetUserArgs = {
  username: Scalars["String"];
};

export type QueryGetTimelineBooksArgs = {
  cursor?: Maybe<Scalars["String"]>;
  take: Scalars["Float"];
};

export type QueryGetBookArgs = {
  bookId: Scalars["String"];
};

export type QueryGetBooksArgs = {
  userId?: Maybe<Scalars["String"]>;
};

export type QueryGetTimelineChaptersArgs = {
  cursor?: Maybe<Scalars["String"]>;
  take: Scalars["Float"];
};

export type QueryGetChaptersFromBookArgs = {
  bookId: Scalars["String"];
};

export type QueryGetChapterArgs = {
  chapterId: Scalars["String"];
};

export type QueryGetChaptersFromUserArgs = {
  username: Scalars["String"];
};

export type Tag = {
  __typename?: "Tag";
  id: Scalars["String"];
  label: Scalars["String"];
  value: Scalars["String"];
  bookId?: Maybe<Scalars["String"]>;
  chapterId?: Maybe<Scalars["String"]>;
  createdAt: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  email: Scalars["String"];
  username: Scalars["String"];
  password: Scalars["String"];
  avatarType: Scalars["String"];
  avatarSeed: Scalars["String"];
  bio: Scalars["String"];
  numberOfFollowing: Scalars["Float"];
  numberOfFollowers: Scalars["Float"];
  _count: _Count;
  books: Array<Book>;
  chapters: Array<Chapter>;
  tags: Array<Tag>;
  following: Array<Follow>;
  followers: Array<Follow>;
  comments?: Maybe<Array<Comment>>;
  bookReactions: Array<BookReaction>;
  chapterReactions: Array<ChapterReaction>;
  createdAt: Scalars["String"];
};

export type _Count = {
  __typename?: "_Count";
  chapters: Scalars["Float"];
};

export type ChapterFragment = { __typename: "Chapter" } & Pick<
  Chapter,
  | "id"
  | "authorId"
  | "title"
  | "text"
  | "description"
  | "likes"
  | "dislikes"
  | "createdAt"
> & {
    reactions?: Maybe<
      Array<
        { __typename?: "ChapterReaction" } & Pick<
          ChapterReaction,
          "authorId" | "value"
        >
      >
    >;
    comments?: Maybe<Array<{ __typename?: "Comment" } & CommentFragment>>;
  };

export type CommentFragment = { __typename: "Comment" } & Pick<
  Comment,
  "id" | "text" | "chapterId" | "createdAt" | "updatedAt"
> & {
    author: { __typename?: "User" } & Pick<
      User,
      "id" | "username" | "name" | "avatarType" | "avatarSeed"
    >;
  };

export type CurrentUserFragFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "username"
>;

export type CreateChapterMutationVariables = Exact<{
  chapterData: InputCreateChapter;
}>;

export type CreateChapterMutation = { __typename?: "Mutation" } & {
  createChapter: { __typename?: "Chapter" } & ChapterFragment;
};

export type CreateCommentMutationVariables = Exact<{
  data: InputCreateComment;
}>;

export type CreateCommentMutation = { __typename?: "Mutation" } & {
  createComment: { __typename?: "Comment" } & Pick<
    Comment,
    "id" | "text" | "chapterId" | "createdAt" | "updatedAt"
  > & {
      author: { __typename?: "User" } & Pick<
        User,
        "id" | "name" | "username" | "avatarType" | "avatarSeed"
      >;
    };
};

export type DeleteChapterMutationVariables = Exact<{
  chapterId: Scalars["String"];
}>;

export type DeleteChapterMutation = { __typename?: "Mutation" } & {
  deleteChapter: { __typename?: "Chapter" } & Pick<Chapter, "id">;
};

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type DeleteCommentMutation = { __typename?: "Mutation" } & {
  deleteComment: { __typename?: "Comment" } & CommentFragment;
};

export type EditCommentMutationVariables = Exact<{
  id: Scalars["String"];
  text: Scalars["String"];
}>;

export type EditCommentMutation = { __typename?: "Mutation" } & {
  updateComment: { __typename?: "Comment" } & CommentFragment;
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "User" } & Pick<User, "email">;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type ReactToChapterMutationVariables = Exact<{
  value: Scalars["Float"];
  id: Scalars["String"];
}>;

export type ReactToChapterMutation = { __typename?: "Mutation" } & {
  reactToChapter: { __typename?: "ChapterReactionResponse" } & Pick<
    ChapterReactionResponse,
    "hasVoted"
  > & { chapter: { __typename?: "Chapter" } & ChapterFragment };
};

export type RegisterMutationVariables = Exact<{
  name: Scalars["String"];
  email: Scalars["String"];
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  createUser: { __typename?: "User" } & CurrentUserFragFragment;
};

export type UpdateChapterMutationVariables = Exact<{
  chapterData: InputUpdateChapter;
}>;

export type UpdateChapterMutation = { __typename?: "Mutation" } & {
  updateChapter: { __typename?: "Chapter" } & ChapterFragment;
};

export const CommentFragmentDoc = gql`
  fragment Comment on Comment {
    __typename
    id
    text
    author {
      id
      username
      name
      avatarType
      avatarSeed
    }
    chapterId
    createdAt
    updatedAt
  }
`;
export const ChapterFragmentDoc = gql`
  fragment Chapter on Chapter {
    __typename
    id
    authorId
    title
    text
    description
    likes
    dislikes
    createdAt
    reactions {
      authorId
      value
    }
    comments {
      ...Comment
    }
  }
  ${CommentFragmentDoc}
`;
export const CurrentUserFragFragmentDoc = gql`
  fragment CurrentUserFrag on User {
    id
    username
  }
`;
export const CreateChapterDocument = gql`
  mutation CreateChapter($chapterData: InputCreateChapter!) {
    createChapter(chapterData: $chapterData) {
      ...Chapter
    }
  }
  ${ChapterFragmentDoc}
`;
export type CreateChapterMutationFn = Apollo.MutationFunction<
  CreateChapterMutation,
  CreateChapterMutationVariables
>;

/**
 * __useCreateChapterMutation__
 *
 * To run a mutation, you first call `useCreateChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChapterMutation, { data, loading, error }] = useCreateChapterMutation({
 *   variables: {
 *      chapterData: // value for 'chapterData'
 *   },
 * });
 */
export function useCreateChapterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateChapterMutation,
    CreateChapterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateChapterMutation,
    CreateChapterMutationVariables
  >(CreateChapterDocument, options);
}
export type CreateChapterMutationHookResult = ReturnType<
  typeof useCreateChapterMutation
>;
export type CreateChapterMutationResult =
  Apollo.MutationResult<CreateChapterMutation>;
export type CreateChapterMutationOptions = Apollo.BaseMutationOptions<
  CreateChapterMutation,
  CreateChapterMutationVariables
>;
export const CreateCommentDocument = gql`
  mutation CreateComment($data: InputCreateComment!) {
    createComment(data: $data) {
      id
      text
      author {
        id
        name
        username
        avatarType
        avatarSeed
      }
      chapterId
      createdAt
      updatedAt
    }
  }
`;
export type CreateCommentMutationFn = Apollo.MutationFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CreateCommentDocument, options);
}
export type CreateCommentMutationHookResult = ReturnType<
  typeof useCreateCommentMutation
>;
export type CreateCommentMutationResult =
  Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;
export const DeleteChapterDocument = gql`
  mutation DeleteChapter($chapterId: String!) {
    deleteChapter(chapterId: $chapterId) {
      id
    }
  }
`;
export type DeleteChapterMutationFn = Apollo.MutationFunction<
  DeleteChapterMutation,
  DeleteChapterMutationVariables
>;

/**
 * __useDeleteChapterMutation__
 *
 * To run a mutation, you first call `useDeleteChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChapterMutation, { data, loading, error }] = useDeleteChapterMutation({
 *   variables: {
 *      chapterId: // value for 'chapterId'
 *   },
 * });
 */
export function useDeleteChapterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteChapterMutation,
    DeleteChapterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteChapterMutation,
    DeleteChapterMutationVariables
  >(DeleteChapterDocument, options);
}
export type DeleteChapterMutationHookResult = ReturnType<
  typeof useDeleteChapterMutation
>;
export type DeleteChapterMutationResult =
  Apollo.MutationResult<DeleteChapterMutation>;
export type DeleteChapterMutationOptions = Apollo.BaseMutationOptions<
  DeleteChapterMutation,
  DeleteChapterMutationVariables
>;
export const DeleteCommentDocument = gql`
  mutation DeleteComment($id: String!) {
    deleteComment(id: $id) {
      ...Comment
    }
  }
  ${CommentFragmentDoc}
`;
export type DeleteCommentMutationFn = Apollo.MutationFunction<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >(DeleteCommentDocument, options);
}
export type DeleteCommentMutationHookResult = ReturnType<
  typeof useDeleteCommentMutation
>;
export type DeleteCommentMutationResult =
  Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>;
export const EditCommentDocument = gql`
  mutation EditComment($id: String!, $text: String!) {
    updateComment(id: $id, text: $text) {
      ...Comment
    }
  }
  ${CommentFragmentDoc}
`;
export type EditCommentMutationFn = Apollo.MutationFunction<
  EditCommentMutation,
  EditCommentMutationVariables
>;

/**
 * __useEditCommentMutation__
 *
 * To run a mutation, you first call `useEditCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCommentMutation, { data, loading, error }] = useEditCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useEditCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditCommentMutation,
    EditCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EditCommentMutation, EditCommentMutationVariables>(
    EditCommentDocument,
    options
  );
}
export type EditCommentMutationHookResult = ReturnType<
  typeof useEditCommentMutation
>;
export type EditCommentMutationResult =
  Apollo.MutationResult<EditCommentMutation>;
export type EditCommentMutationOptions = Apollo.BaseMutationOptions<
  EditCommentMutation,
  EditCommentMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(password: $password, email: $email) {
      email
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const ReactToChapterDocument = gql`
  mutation ReactToChapter($value: Float!, $id: String!) {
    reactToChapter(value: $value, id: $id) {
      chapter {
        ...Chapter
      }
      hasVoted
    }
  }
  ${ChapterFragmentDoc}
`;
export type ReactToChapterMutationFn = Apollo.MutationFunction<
  ReactToChapterMutation,
  ReactToChapterMutationVariables
>;

/**
 * __useReactToChapterMutation__
 *
 * To run a mutation, you first call `useReactToChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactToChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactToChapterMutation, { data, loading, error }] = useReactToChapterMutation({
 *   variables: {
 *      value: // value for 'value'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReactToChapterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ReactToChapterMutation,
    ReactToChapterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ReactToChapterMutation,
    ReactToChapterMutationVariables
  >(ReactToChapterDocument, options);
}
export type ReactToChapterMutationHookResult = ReturnType<
  typeof useReactToChapterMutation
>;
export type ReactToChapterMutationResult =
  Apollo.MutationResult<ReactToChapterMutation>;
export type ReactToChapterMutationOptions = Apollo.BaseMutationOptions<
  ReactToChapterMutation,
  ReactToChapterMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register(
    $name: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    createUser(
      userData: {
        name: $name
        email: $email
        username: $username
        password: $password
      }
    ) {
      ...CurrentUserFrag
    }
  }
  ${CurrentUserFragFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const UpdateChapterDocument = gql`
  mutation UpdateChapter($chapterData: InputUpdateChapter!) {
    updateChapter(chapterData: $chapterData) {
      ...Chapter
    }
  }
  ${ChapterFragmentDoc}
`;
export type UpdateChapterMutationFn = Apollo.MutationFunction<
  UpdateChapterMutation,
  UpdateChapterMutationVariables
>;

/**
 * __useUpdateChapterMutation__
 *
 * To run a mutation, you first call `useUpdateChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChapterMutation, { data, loading, error }] = useUpdateChapterMutation({
 *   variables: {
 *      chapterData: // value for 'chapterData'
 *   },
 * });
 */
export function useUpdateChapterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateChapterMutation,
    UpdateChapterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateChapterMutation,
    UpdateChapterMutationVariables
  >(UpdateChapterDocument, options);
}
export type UpdateChapterMutationHookResult = ReturnType<
  typeof useUpdateChapterMutation
>;
export type UpdateChapterMutationResult =
  Apollo.MutationResult<UpdateChapterMutation>;
export type UpdateChapterMutationOptions = Apollo.BaseMutationOptions<
  UpdateChapterMutation,
  UpdateChapterMutationVariables
>;
