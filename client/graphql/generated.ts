import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ConfirmAccountResponse = {
  __typename?: 'ConfirmAccountResponse';
  path?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Course = {
  __typename?: 'Course';
  id: Scalars['Int']['output'];
  lessons: Array<Lesson>;
  name: Scalars['String']['output'];
};

export type Lesson = {
  __typename?: 'Lesson';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  purchaseCourse?: Maybe<PurchaseCourseResponse>;
  signIn?: Maybe<SignInResponse>;
  signUp?: Maybe<SignUpResponse>;
};


export type MutationPurchaseCourseArgs = {
  courseId: Scalars['Int']['input'];
};


export type MutationSignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  path?: InputMaybe<Scalars['String']['input']>;
};

export type PurchaseCourseResponse = {
  __typename?: 'PurchaseCourseResponse';
  purchasedCourse: Course;
};

export type Query = {
  __typename?: 'Query';
  confirmAccount?: Maybe<ConfirmAccountResponse>;
  getCourseData?: Maybe<Course>;
  getLesson?: Maybe<Lesson>;
  getPurchasedCourses?: Maybe<Array<Course>>;
  me?: Maybe<User>;
};


export type QueryConfirmAccountArgs = {
  key: Scalars['String']['input'];
};


export type QueryGetCourseDataArgs = {
  courseId: Scalars['Int']['input'];
};


export type QueryGetLessonArgs = {
  id: Scalars['Int']['input'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  existingUser?: Maybe<User>;
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  message: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type CourseFragment = { __typename?: 'Course', id: number, name: string, lessons: Array<{ __typename?: 'Lesson', id: number, name: string }> };

export type UserFragment = { __typename?: 'User', id: number, name: string, email: string };

export type PurchaseCourseMutationVariables = Exact<{
  courseId: Scalars['Int']['input'];
}>;


export type PurchaseCourseMutation = { __typename?: 'Mutation', purchaseCourse?: { __typename?: 'PurchaseCourseResponse', purchasedCourse: { __typename?: 'Course', id: number, name: string, lessons: Array<{ __typename?: 'Lesson', id: number, name: string }> } } | null };

export type SignInMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn?: { __typename?: 'SignInResponse', existingUser?: { __typename?: 'User', id: number, name: string, email: string } | null } | null };

export type SignUpMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  path: Scalars['String']['input'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp?: { __typename?: 'SignUpResponse', message: string } | null };

export type ConfirmAccountQueryVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type ConfirmAccountQuery = { __typename?: 'Query', confirmAccount?: { __typename?: 'ConfirmAccountResponse', path?: string | null, user?: { __typename?: 'User', id: number, name: string, email: string } | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, name: string, email: string } | null };

export const CourseFragmentDoc = gql`
    fragment Course on Course {
  id
  name
  lessons {
    id
    name
  }
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  name
  email
}
    `;
export const PurchaseCourseDocument = gql`
    mutation PurchaseCourse($courseId: Int!) {
  purchaseCourse(courseId: $courseId) {
    purchasedCourse {
      ...Course
    }
  }
}
    ${CourseFragmentDoc}`;
export type PurchaseCourseMutationFn = Apollo.MutationFunction<PurchaseCourseMutation, PurchaseCourseMutationVariables>;

/**
 * __usePurchaseCourseMutation__
 *
 * To run a mutation, you first call `usePurchaseCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePurchaseCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [purchaseCourseMutation, { data, loading, error }] = usePurchaseCourseMutation({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function usePurchaseCourseMutation(baseOptions?: Apollo.MutationHookOptions<PurchaseCourseMutation, PurchaseCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PurchaseCourseMutation, PurchaseCourseMutationVariables>(PurchaseCourseDocument, options);
      }
export type PurchaseCourseMutationHookResult = ReturnType<typeof usePurchaseCourseMutation>;
export type PurchaseCourseMutationResult = Apollo.MutationResult<PurchaseCourseMutation>;
export type PurchaseCourseMutationOptions = Apollo.BaseMutationOptions<PurchaseCourseMutation, PurchaseCourseMutationVariables>;
export const SignInDocument = gql`
    mutation signIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    existingUser {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation signUp($name: String!, $email: String!, $password: String!, $path: String!) {
  signUp(name: $name, email: $email, password: $password, path: $path) {
    message
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      path: // value for 'path'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const ConfirmAccountDocument = gql`
    query confirmAccount($key: String!) {
  confirmAccount(key: $key) {
    user {
      ...User
    }
    path
  }
}
    ${UserFragmentDoc}`;

/**
 * __useConfirmAccountQuery__
 *
 * To run a query within a React component, call `useConfirmAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useConfirmAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConfirmAccountQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useConfirmAccountQuery(baseOptions: Apollo.QueryHookOptions<ConfirmAccountQuery, ConfirmAccountQueryVariables> & ({ variables: ConfirmAccountQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConfirmAccountQuery, ConfirmAccountQueryVariables>(ConfirmAccountDocument, options);
      }
export function useConfirmAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConfirmAccountQuery, ConfirmAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConfirmAccountQuery, ConfirmAccountQueryVariables>(ConfirmAccountDocument, options);
        }
export function useConfirmAccountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ConfirmAccountQuery, ConfirmAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ConfirmAccountQuery, ConfirmAccountQueryVariables>(ConfirmAccountDocument, options);
        }
export type ConfirmAccountQueryHookResult = ReturnType<typeof useConfirmAccountQuery>;
export type ConfirmAccountLazyQueryHookResult = ReturnType<typeof useConfirmAccountLazyQuery>;
export type ConfirmAccountSuspenseQueryHookResult = ReturnType<typeof useConfirmAccountSuspenseQuery>;
export type ConfirmAccountQueryResult = Apollo.QueryResult<ConfirmAccountQuery, ConfirmAccountQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;