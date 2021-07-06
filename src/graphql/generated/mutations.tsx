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

export type InputUpdateChapterNumber = {
  chapterId: Scalars["String"];
  newChapterNumber: Scalars["Int"];
};

export type Mutation = {
  __typename?: "Mutation";
  createUser: User;
  login: User;
  logout: Scalars["Boolean"];
  createBook: Book;
  deleteBook: Scalars["Boolean"];
  updateChapterNumber: Chapter;
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

export type MutationUpdateChapterNumberArgs = {
  updateData: InputUpdateChapterNumber;
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

export type LoginMutationVariables = Exact<{
  email: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "User" } & Pick<User, "email">;
};

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
