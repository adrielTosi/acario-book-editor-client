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
  status: Scalars["String"];
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

/** The status of the Tale */
export enum ChapterStatus {
  Published = "Published",
  Draft = "Draft",
}

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
  status: Scalars["String"];
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

export type InputUpdateProfile = {
  name: Scalars["String"];
  avatarSeed: Scalars["String"];
  avatarType: Scalars["String"];
  bio: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createUser: User;
  login: User;
  logout: Scalars["Boolean"];
  updateProfile: User;
  createBook: Book;
  deleteBook: Scalars["Boolean"];
  createChapter: Chapter;
  updateChapter: Chapter;
  addChapterToBook: Chapter;
  deleteChapter: Chapter;
  changeStatus: Chapter;
  createTags: Array<Tag>;
  deleteTag: Scalars["Boolean"];
  followUser: Follow;
  unfollowUser: Follow;
  createComment: Comment;
  updateComment: Comment;
  deleteComment: Comment;
  reactToBook: BookReactionResponse;
  reactToChapter: ChapterReactionResponse;
  saveChapterToReadLater: ReadLater;
};

export type MutationCreateUserArgs = {
  userData: InputCreateUser;
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  email: Scalars["String"];
};

export type MutationUpdateProfileArgs = {
  data: InputUpdateProfile;
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

export type MutationChangeStatusArgs = {
  id: Scalars["String"];
  newStatus: ChapterStatus;
};

export type MutationCreateTagsArgs = {
  data: InputCreateTags;
};

export type MutationDeleteTagArgs = {
  id: Scalars["String"];
};

export type MutationFollowUserArgs = {
  id: Scalars["String"];
};

export type MutationUnfollowUserArgs = {
  id: Scalars["String"];
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

export type MutationSaveChapterToReadLaterArgs = {
  id: Scalars["String"];
};

export type PaginatedChaptersFromUser = {
  __typename?: "PaginatedChaptersFromUser";
  chapters: Array<Chapter>;
  hasMore: Scalars["Boolean"];
};

export type PaginatedDrafts = {
  __typename?: "PaginatedDrafts";
  drafts: Array<Chapter>;
  hasMore: Scalars["Boolean"];
};

export type PaginatedReadLater = {
  __typename?: "PaginatedReadLater";
  readLater: Array<ReadLater>;
  hasMore: Scalars["Boolean"];
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
  getChaptersFromUser: PaginatedChaptersFromUser;
  getDrafts: PaginatedDrafts;
  getAllSavedChapter: PaginatedReadLater;
  removeFromReadLater: ReadLater;
};

export type QueryGetUserArgs = {
  findFromUserId?: Maybe<Scalars["Boolean"]>;
  username?: Maybe<Scalars["String"]>;
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
  offset: Scalars["Float"];
  take: Scalars["Float"];
  username: Scalars["String"];
};

export type QueryGetDraftsArgs = {
  offset: Scalars["Float"];
  take: Scalars["Float"];
};

export type QueryGetAllSavedChapterArgs = {
  offset: Scalars["Float"];
  take: Scalars["Float"];
};

export type QueryRemoveFromReadLaterArgs = {
  id: Scalars["String"];
};

export type ReadLater = {
  __typename?: "ReadLater";
  author: User;
  authorId: Scalars["String"];
  chapter: Chapter;
  chapterId: Scalars["String"];
  createdAt: Scalars["String"];
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
  followers: Scalars["Float"];
  following: Scalars["Float"];
};

export type ChapterFragment = { __typename: "Chapter" } & Pick<
  Chapter,
  | "id"
  | "authorId"
  | "title"
  | "text"
  | "description"
  | "likes"
  | "status"
  | "dislikes"
  | "createdAt"
> & {
    author: { __typename?: "User" } & Pick<
      User,
      "id" | "name" | "username" | "avatarType" | "avatarSeed"
    >;
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
  "id" | "name" | "username" | "avatarType" | "avatarSeed"
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

export type FollowUserMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type FollowUserMutation = { __typename?: "Mutation" } & {
  followUser: { __typename?: "Follow" } & Pick<Follow, "leaderId" | "followId">;
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "User" } & CurrentUserFragFragment;
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

export type SaveToReadLaterMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type SaveToReadLaterMutation = { __typename?: "Mutation" } & {
  saveChapterToReadLater: { __typename?: "ReadLater" } & Pick<
    ReadLater,
    "createdAt"
  > & { chapter: { __typename?: "Chapter" } & ChapterFragment };
};

export type UnfollowUserMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type UnfollowUserMutation = { __typename?: "Mutation" } & {
  unfollowUser: { __typename?: "Follow" } & Pick<
    Follow,
    "leaderId" | "followId"
  >;
};

export type UpdateChapterMutationVariables = Exact<{
  chapterData: InputUpdateChapter;
}>;

export type UpdateChapterMutation = { __typename?: "Mutation" } & {
  updateChapter: { __typename?: "Chapter" } & ChapterFragment;
};

export type UpdateProfileMutationVariables = Exact<{
  data: InputUpdateProfile;
}>;

export type UpdateProfileMutation = { __typename?: "Mutation" } & {
  updateProfile: { __typename?: "User" } & Pick<
    User,
    "id" | "name" | "username" | "avatarType" | "avatarSeed" | "bio"
  > & {
      followers: Array<
        { __typename?: "Follow" } & Pick<Follow, "leaderId" | "followId">
      >;
      _count: { __typename?: "_Count" } & Pick<
        _Count,
        "chapters" | "followers" | "following"
      >;
      chapters: Array<{ __typename?: "Chapter" } & ChapterFragment>;
    };
};

export type UpdateStatusMutationVariables = Exact<{
  id: Scalars["String"];
  newStatus: ChapterStatus;
}>;

export type UpdateStatusMutation = { __typename?: "Mutation" } & {
  changeStatus: { __typename?: "Chapter" } & ChapterFragment;
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
    status
    dislikes
    createdAt
    author {
      id
      name
      username
      avatarType
      avatarSeed
    }
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
    name
    username
    avatarType
    avatarSeed
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
export const FollowUserDocument = gql`
  mutation FollowUser($id: String!) {
    followUser(id: $id) {
      leaderId
      followId
    }
  }
`;
export type FollowUserMutationFn = Apollo.MutationFunction<
  FollowUserMutation,
  FollowUserMutationVariables
>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFollowUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    FollowUserMutation,
    FollowUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(
    FollowUserDocument,
    options
  );
}
export type FollowUserMutationHookResult = ReturnType<
  typeof useFollowUserMutation
>;
export type FollowUserMutationResult =
  Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<
  FollowUserMutation,
  FollowUserMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(password: $password, email: $email) {
      ...CurrentUserFrag
    }
  }
  ${CurrentUserFragFragmentDoc}
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
export const SaveToReadLaterDocument = gql`
  mutation SaveToReadLater($id: String!) {
    saveChapterToReadLater(id: $id) {
      createdAt
      chapter {
        ...Chapter
      }
    }
  }
  ${ChapterFragmentDoc}
`;
export type SaveToReadLaterMutationFn = Apollo.MutationFunction<
  SaveToReadLaterMutation,
  SaveToReadLaterMutationVariables
>;

/**
 * __useSaveToReadLaterMutation__
 *
 * To run a mutation, you first call `useSaveToReadLaterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveToReadLaterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveToReadLaterMutation, { data, loading, error }] = useSaveToReadLaterMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSaveToReadLaterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SaveToReadLaterMutation,
    SaveToReadLaterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SaveToReadLaterMutation,
    SaveToReadLaterMutationVariables
  >(SaveToReadLaterDocument, options);
}
export type SaveToReadLaterMutationHookResult = ReturnType<
  typeof useSaveToReadLaterMutation
>;
export type SaveToReadLaterMutationResult =
  Apollo.MutationResult<SaveToReadLaterMutation>;
export type SaveToReadLaterMutationOptions = Apollo.BaseMutationOptions<
  SaveToReadLaterMutation,
  SaveToReadLaterMutationVariables
>;
export const UnfollowUserDocument = gql`
  mutation UnfollowUser($id: String!) {
    unfollowUser(id: $id) {
      leaderId
      followId
    }
  }
`;
export type UnfollowUserMutationFn = Apollo.MutationFunction<
  UnfollowUserMutation,
  UnfollowUserMutationVariables
>;

/**
 * __useUnfollowUserMutation__
 *
 * To run a mutation, you first call `useUnfollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowUserMutation, { data, loading, error }] = useUnfollowUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnfollowUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UnfollowUserMutation,
    UnfollowUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UnfollowUserMutation,
    UnfollowUserMutationVariables
  >(UnfollowUserDocument, options);
}
export type UnfollowUserMutationHookResult = ReturnType<
  typeof useUnfollowUserMutation
>;
export type UnfollowUserMutationResult =
  Apollo.MutationResult<UnfollowUserMutation>;
export type UnfollowUserMutationOptions = Apollo.BaseMutationOptions<
  UnfollowUserMutation,
  UnfollowUserMutationVariables
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
export const UpdateProfileDocument = gql`
  mutation UpdateProfile($data: InputUpdateProfile!) {
    updateProfile(data: $data) {
      id
      name
      username
      avatarType
      avatarSeed
      bio
      followers {
        leaderId
        followId
      }
      _count {
        chapters
        followers
        following
      }
      chapters {
        ...Chapter
      }
    }
  }
  ${ChapterFragmentDoc}
`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >(UpdateProfileDocument, options);
}
export type UpdateProfileMutationHookResult = ReturnType<
  typeof useUpdateProfileMutation
>;
export type UpdateProfileMutationResult =
  Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;
export const UpdateStatusDocument = gql`
  mutation UpdateStatus($id: String!, $newStatus: ChapterStatus!) {
    changeStatus(id: $id, newStatus: $newStatus) {
      ...Chapter
    }
  }
  ${ChapterFragmentDoc}
`;
export type UpdateStatusMutationFn = Apollo.MutationFunction<
  UpdateStatusMutation,
  UpdateStatusMutationVariables
>;

/**
 * __useUpdateStatusMutation__
 *
 * To run a mutation, you first call `useUpdateStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStatusMutation, { data, loading, error }] = useUpdateStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      newStatus: // value for 'newStatus'
 *   },
 * });
 */
export function useUpdateStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateStatusMutation,
    UpdateStatusMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateStatusMutation,
    UpdateStatusMutationVariables
  >(UpdateStatusDocument, options);
}
export type UpdateStatusMutationHookResult = ReturnType<
  typeof useUpdateStatusMutation
>;
export type UpdateStatusMutationResult =
  Apollo.MutationResult<UpdateStatusMutation>;
export type UpdateStatusMutationOptions = Apollo.BaseMutationOptions<
  UpdateStatusMutation,
  UpdateStatusMutationVariables
>;
