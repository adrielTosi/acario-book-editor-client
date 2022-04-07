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
  type: Scalars["String"];
  bookId: Scalars["String"];
  chapterId: Scalars["String"];
  title?: Maybe<Scalars["String"]>;
  text?: Maybe<Scalars["String"]>;
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
  deleteChapter: Scalars["Boolean"];
  createTags: Array<Tag>;
  deleteTag: Scalars["Boolean"];
  followUser: Follow;
  unfollowUser: Scalars["Boolean"];
  createComment: Comment;
  updateComment: Comment;
  deleteComment: Scalars["Boolean"];
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
  bookId: Scalars["String"];
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
  bookId?: Maybe<Scalars["String"]>;
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
  numberOfFollowing: Scalars["Float"];
  numberOfFollowers: Scalars["Float"];
  _count: _Count;
  books: Array<Book>;
  chapters: Array<Chapter>;
  tags: Array<Tag>;
  following: Array<Follow>;
  followers: Array<Follow>;
  comments: Array<Comment>;
  bookReactions: Array<BookReaction>;
  chapterReactions: Array<ChapterReaction>;
  createdAt: Scalars["String"];
};

export type _Count = {
  __typename?: "_Count";
  chapters: Scalars["Float"];
};

export type CurrentUserFragFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "username"
>;

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = { __typename?: "Query" } & {
  currentUser: { __typename?: "User" } & CurrentUserFragFragment;
};

export type GetChapterQueryVariables = Exact<{
  chapterId: Scalars["String"];
}>;

export type GetChapterQuery = { __typename?: "Query" } & {
  getChapter: { __typename?: "Chapter" } & Pick<
    Chapter,
    "id" | "title" | "text" | "description"
  >;
};

export type GetChaptersFromUserQueryVariables = Exact<{
  username: Scalars["String"];
}>;

export type GetChaptersFromUserQuery = { __typename?: "Query" } & {
  getChaptersFromUser: Array<
    { __typename?: "Chapter" } & Pick<
      Chapter,
      "id" | "title" | "text" | "description" | "createdAt" | "updatedAt"
    >
  >;
};

export type GetUserQueryVariables = Exact<{
  username: Scalars["String"];
}>;

export type GetUserQuery = { __typename?: "Query" } & {
  getUser: { __typename?: "User" } & Pick<User, "id" | "name" | "username"> & {
      chapters: Array<
        { __typename?: "Chapter" } & Pick<
          Chapter,
          "id" | "title" | "likes" | "dislikes"
        > & {
            tags?: Maybe<
              Array<{ __typename?: "Tag" } & Pick<Tag, "label" | "value">>
            >;
          }
      >;
      books: Array<
        { __typename?: "Book" } & Pick<
          Book,
          "id" | "title" | "description" | "likes" | "dislikes"
        >
      >;
      following: Array<
        { __typename?: "Follow" } & Pick<Follow, "leaderId" | "followId">
      >;
      followers: Array<
        { __typename?: "Follow" } & Pick<Follow, "leaderId" | "followId">
      >;
    };
};

export const CurrentUserFragFragmentDoc = gql`
  fragment CurrentUserFrag on User {
    id
    username
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
      id
      title
      text
      description
    }
  }
`;
export type GetChapterQueryResult = Apollo.QueryResult<
  GetChapterQuery,
  GetChapterQueryVariables
>;
export const GetChaptersFromUserDocument = gql`
  query getChaptersFromUser($username: String!) {
    getChaptersFromUser(username: $username) {
      id
      title
      text
      description
      createdAt
      updatedAt
    }
  }
`;
export type GetChaptersFromUserQueryResult = Apollo.QueryResult<
  GetChaptersFromUserQuery,
  GetChaptersFromUserQueryVariables
>;
export const GetUserDocument = gql`
  query GetUser($username: String!) {
    getUser(username: $username) {
      id
      name
      username
      chapters {
        id
        title
        likes
        dislikes
        tags {
          label
          value
        }
      }
      books {
        id
        title
        description
        likes
        dislikes
      }
      following {
        leaderId
        followId
      }
      followers {
        leaderId
        followId
      }
    }
  }
`;
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
