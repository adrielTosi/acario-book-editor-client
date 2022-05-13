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
  createTags: Array<Tag>;
  deleteTag: Scalars["Boolean"];
  followUser: Follow;
  unfollowUser: Follow;
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

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = { __typename?: "Query" } & {
  currentUser: { __typename?: "User" } & CurrentUserFragFragment;
};

export type GetChapterQueryVariables = Exact<{
  chapterId: Scalars["String"];
}>;

export type GetChapterQuery = { __typename?: "Query" } & {
  getChapter: { __typename?: "Chapter" } & ChapterFragment;
};

export type GetChaptersFromUserQueryVariables = Exact<{
  username: Scalars["String"];
}>;

export type GetChaptersFromUserQuery = { __typename?: "Query" } & {
  getChaptersFromUser: Array<{ __typename?: "Chapter" } & ChapterFragment>;
};

export type GetTimelineTalesQueryVariables = Exact<{
  cursor?: Maybe<Scalars["String"]>;
  take: Scalars["Float"];
}>;

export type GetTimelineTalesQuery = { __typename?: "Query" } & {
  getTimelineChapters: { __typename?: "PaginatedTimelineChapters" } & Pick<
    PaginatedTimelineChapters,
    "hasMore"
  > & { chapters: Array<{ __typename?: "Chapter" } & ChapterFragment> };
};

export type GetUserQueryVariables = Exact<{
  username: Scalars["String"];
}>;

export type GetUserQuery = { __typename?: "Query" } & {
  getUser: { __typename?: "User" } & Pick<
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
export const CurrentUserDocument = gql`
  query currentUser {
    currentUser {
      ...CurrentUserFrag
    }
  }
  ${CurrentUserFragFragmentDoc}
`;
export type CurrentUserQueryResult = Apollo.QueryResult<
  CurrentUserQuery,
  CurrentUserQueryVariables
>;
export const GetChapterDocument = gql`
  query GetChapter($chapterId: String!) {
    getChapter(chapterId: $chapterId) {
      ...Chapter
    }
  }
  ${ChapterFragmentDoc}
`;
export type GetChapterQueryResult = Apollo.QueryResult<
  GetChapterQuery,
  GetChapterQueryVariables
>;
export const GetChaptersFromUserDocument = gql`
  query getChaptersFromUser($username: String!) {
    getChaptersFromUser(username: $username) {
      ...Chapter
    }
  }
  ${ChapterFragmentDoc}
`;
export type GetChaptersFromUserQueryResult = Apollo.QueryResult<
  GetChaptersFromUserQuery,
  GetChaptersFromUserQueryVariables
>;
export const GetTimelineTalesDocument = gql`
  query GetTimelineTales($cursor: String, $take: Float!) {
    getTimelineChapters(cursor: $cursor, take: $take) {
      chapters {
        ...Chapter
      }
      hasMore
    }
  }
  ${ChapterFragmentDoc}
`;
export type GetTimelineTalesQueryResult = Apollo.QueryResult<
  GetTimelineTalesQuery,
  GetTimelineTalesQueryVariables
>;
export const GetUserDocument = gql`
  query GetUser($username: String!) {
    getUser(username: $username) {
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
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
