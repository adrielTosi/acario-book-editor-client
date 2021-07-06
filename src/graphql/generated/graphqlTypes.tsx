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
  chapters: Array<Chapter>;
  notes?: Maybe<Array<Note>>;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type Chapter = {
  __typename?: "Chapter";
  id: Scalars["String"];
  title: Scalars["String"];
  text: Scalars["String"];
  chapterNumber: Scalars["Float"];
  authorId: Scalars["String"];
  bookId: Scalars["String"];
  notes?: Maybe<Array<Note>>;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type InputCreateChapter = {
  title: Scalars["String"];
  bookId: Scalars["String"];
  text: Scalars["String"];
};

/** Data for creating new user */
export type InputCreateUser = {
  name: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type InputNewBook = {
  title: Scalars["String"];
  description: Scalars["String"];
};

export type InputNoteData = {
  title: Scalars["String"];
  text: Scalars["String"];
  bookId: Scalars["String"];
  chapterId: Scalars["String"];
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
  deleteChapter: Scalars["Boolean"];
  createNote: Note;
  deleteNote: Scalars["Boolean"];
  updateNote: Note;
};

export type MutationCreateUserArgs = {
  userData: InputCreateUser;
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  email: Scalars["String"];
};

export type MutationCreateBookArgs = {
  bookData: InputNewBook;
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

export type MutationDeleteChapterArgs = {
  bookId: Scalars["String"];
  chapterId: Scalars["String"];
};

export type MutationCreateNoteArgs = {
  noteData: InputNoteData;
};

export type MutationDeleteNoteArgs = {
  noteId: Scalars["String"];
};

export type MutationUpdateNoteArgs = {
  text: Scalars["String"];
  title: Scalars["String"];
  noteId: Scalars["String"];
};

export type Note = {
  __typename?: "Note";
  id: Scalars["String"];
  title: Scalars["String"];
  text: Scalars["String"];
  authorId: Scalars["String"];
  bookId: Scalars["String"];
  chapterId: Scalars["String"];
  chapter?: Maybe<Chapter>;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  allUsers: Array<User>;
  currentUser: User;
  getBook: Book;
  getBooks: Array<Book>;
  getChapters: Array<Chapter>;
  getChapter: Chapter;
  getNote: Note;
  getNotes: Array<Note>;
};

export type QueryGetBookArgs = {
  bookId: Scalars["String"];
};

export type QueryGetChaptersArgs = {
  bookId: Scalars["String"];
};

export type QueryGetChapterArgs = {
  chapterId: Scalars["String"];
  bookId: Scalars["String"];
};

export type QueryGetNoteArgs = {
  noteId: Scalars["String"];
};

export type QueryGetNotesArgs = {
  chapterId?: Maybe<Scalars["String"]>;
  bookId: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
  createdAt: Scalars["String"];
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = { __typename?: "Query" } & {
  currentUser: { __typename?: "User" } & Pick<User, "id" | "name">;
};

export const CurrentUserDocument = gql`
  query currentUser {
    currentUser {
      id
      name
    }
  }
`;
export type CurrentUserQueryResult = Apollo.QueryResult<
  CurrentUserQuery,
  CurrentUserQueryVariables
>;
