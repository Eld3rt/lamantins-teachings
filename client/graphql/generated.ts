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

export type ConfirmEmailResponse = {
  __typename?: 'ConfirmEmailResponse';
  message: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type ConfirmPasswordResponse = {
  __typename?: 'ConfirmPasswordResponse';
  message: Scalars['String']['output'];
};

export type Course = {
  __typename?: 'Course';
  id: Scalars['Int']['output'];
  lessons?: Maybe<Array<Lesson>>;
  name: Scalars['String']['output'];
  slug?: Maybe<Scalars['String']['output']>;
};

export type Lesson = {
  __typename?: 'Lesson';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmPassword?: Maybe<ConfirmPasswordResponse>;
  purchaseCourse?: Maybe<PurchaseCourseResponse>;
  resetPassword?: Maybe<ResetPasswordResponse>;
  signIn?: Maybe<SignInResponse>;
  signOut?: Maybe<SignOutResponse>;
  signUp?: Maybe<SignUpResponse>;
  updateEmail?: Maybe<UpdateEmailResponse>;
  updatePassword?: Maybe<UpdatePasswordResponse>;
  updateUserName?: Maybe<UpdateUserNameResponse>;
};


export type MutationConfirmPasswordArgs = {
  key: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationPurchaseCourseArgs = {
  courseId: Scalars['Int']['input'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String']['input'];
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


export type MutationUpdateEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdatePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationUpdateUserNameArgs = {
  newName: Scalars['String']['input'];
};

export type PurchaseCourseResponse = {
  __typename?: 'PurchaseCourseResponse';
  purchasedCourse: Course;
};

export type Query = {
  __typename?: 'Query';
  confirmAccount?: Maybe<ConfirmAccountResponse>;
  confirmEmail?: Maybe<ConfirmEmailResponse>;
  getCourseData?: Maybe<Course>;
  getCourses: Array<Course>;
  getLesson?: Maybe<Lesson>;
  getPurchasedCourses?: Maybe<Array<Course>>;
  me?: Maybe<User>;
};


export type QueryConfirmAccountArgs = {
  key: Scalars['String']['input'];
};


export type QueryConfirmEmailArgs = {
  key: Scalars['String']['input'];
};


export type QueryGetCourseDataArgs = {
  slug: Scalars['String']['input'];
};


export type QueryGetLessonArgs = {
  id: Scalars['Int']['input'];
};

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  message: Scalars['String']['output'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  existingUser?: Maybe<User>;
};

export type SignOutResponse = {
  __typename?: 'SignOutResponse';
  message: Scalars['String']['output'];
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  message: Scalars['String']['output'];
};

export type UpdateEmailResponse = {
  __typename?: 'UpdateEmailResponse';
  message: Scalars['String']['output'];
};

export type UpdatePasswordResponse = {
  __typename?: 'UpdatePasswordResponse';
  message: Scalars['String']['output'];
};

export type UpdateUserNameResponse = {
  __typename?: 'UpdateUserNameResponse';
  message: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type CourseFragment = { __typename?: 'Course', id: number, name: string, slug?: string | null, lessons?: Array<{ __typename?: 'Lesson', id: number, name: string }> | null };

export type CourseInfoFragment = { __typename?: 'Course', id: number, name: string, slug?: string | null };

export type UserFragment = { __typename?: 'User', id: number, name?: string | null, email: string };

export type ConfirmPasswordMutationVariables = Exact<{
  key: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type ConfirmPasswordMutation = { __typename?: 'Mutation', confirmPassword?: { __typename?: 'ConfirmPasswordResponse', message: string } | null };

export type PurchaseCourseMutationVariables = Exact<{
  courseId: Scalars['Int']['input'];
}>;


export type PurchaseCourseMutation = { __typename?: 'Mutation', purchaseCourse?: { __typename?: 'PurchaseCourseResponse', purchasedCourse: { __typename?: 'Course', id: number, name: string, slug?: string | null } } | null };

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword?: { __typename?: 'ResetPasswordResponse', message: string } | null };

export type SignInMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn?: { __typename?: 'SignInResponse', existingUser?: { __typename?: 'User', email: string } | null } | null };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut?: { __typename?: 'SignOutResponse', message: string } | null };

export type SignUpMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  path?: InputMaybe<Scalars['String']['input']>;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp?: { __typename?: 'SignUpResponse', message: string } | null };

export type UpdateEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type UpdateEmailMutation = { __typename?: 'Mutation', updateEmail?: { __typename?: 'UpdateEmailResponse', message: string } | null };

export type UpdatePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword?: { __typename?: 'UpdatePasswordResponse', message: string } | null };

export type UpdateUserNameMutationVariables = Exact<{
  newName: Scalars['String']['input'];
}>;


export type UpdateUserNameMutation = { __typename?: 'Mutation', updateUserName?: { __typename?: 'UpdateUserNameResponse', message: string } | null };

export type ConfirmAccountQueryVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type ConfirmAccountQuery = { __typename?: 'Query', confirmAccount?: { __typename?: 'ConfirmAccountResponse', path?: string | null, user?: { __typename?: 'User', email: string } | null } | null };

export type ConfirmEmailQueryVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type ConfirmEmailQuery = { __typename?: 'Query', confirmEmail?: { __typename?: 'ConfirmEmailResponse', message: string, user?: { __typename?: 'User', email: string } | null } | null };

export type GetCourseDataQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetCourseDataQuery = { __typename?: 'Query', getCourseData?: { __typename?: 'Course', id: number, name: string, slug?: string | null, lessons?: Array<{ __typename?: 'Lesson', id: number, name: string }> | null } | null };

export type GetCourseInfoQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetCourseInfoQuery = { __typename?: 'Query', getCourseData?: { __typename?: 'Course', id: number, name: string, slug?: string | null } | null };

export type GetCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCoursesQuery = { __typename?: 'Query', getCourses: Array<{ __typename?: 'Course', id: number, name: string, slug?: string | null }> };

export type GetPurchasedCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPurchasedCoursesQuery = { __typename?: 'Query', getPurchasedCourses?: Array<{ __typename?: 'Course', id: number, name: string, slug?: string | null }> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, name?: string | null, email: string } | null };

export const CourseFragmentDoc = gql`
    fragment Course on Course {
  id
  name
  slug
  lessons {
    id
    name
  }
}
    `;
export const CourseInfoFragmentDoc = gql`
    fragment CourseInfo on Course {
  id
  name
  slug
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  name
  email
}
    `;
export const ConfirmPasswordDocument = gql`
    mutation ConfirmPassword($key: String!, $password: String!) {
  confirmPassword(key: $key, password: $password) {
    message
  }
}
    `;
export type ConfirmPasswordMutationFn = Apollo.MutationFunction<ConfirmPasswordMutation, ConfirmPasswordMutationVariables>;

/**
 * __useConfirmPasswordMutation__
 *
 * To run a mutation, you first call `useConfirmPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmPasswordMutation, { data, loading, error }] = useConfirmPasswordMutation({
 *   variables: {
 *      key: // value for 'key'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useConfirmPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmPasswordMutation, ConfirmPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmPasswordMutation, ConfirmPasswordMutationVariables>(ConfirmPasswordDocument, options);
      }
export type ConfirmPasswordMutationHookResult = ReturnType<typeof useConfirmPasswordMutation>;
export type ConfirmPasswordMutationResult = Apollo.MutationResult<ConfirmPasswordMutation>;
export type ConfirmPasswordMutationOptions = Apollo.BaseMutationOptions<ConfirmPasswordMutation, ConfirmPasswordMutationVariables>;
export const PurchaseCourseDocument = gql`
    mutation PurchaseCourse($courseId: Int!) {
  purchaseCourse(courseId: $courseId) {
    purchasedCourse {
      ...CourseInfo
    }
  }
}
    ${CourseInfoFragmentDoc}`;
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
export const ResetPasswordDocument = gql`
    mutation ResetPassword($email: String!) {
  resetPassword(email: $email) {
    message
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    existingUser {
      email
    }
  }
}
    `;
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
export const SignOutDocument = gql`
    mutation SignOut {
  signOut {
    message
  }
}
    `;
export type SignOutMutationFn = Apollo.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: Apollo.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, options);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const SignUpDocument = gql`
    mutation signUp($name: String!, $email: String!, $password: String!, $path: String) {
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
export const UpdateEmailDocument = gql`
    mutation UpdateEmail($email: String!) {
  updateEmail(email: $email) {
    message
  }
}
    `;
export type UpdateEmailMutationFn = Apollo.MutationFunction<UpdateEmailMutation, UpdateEmailMutationVariables>;

/**
 * __useUpdateEmailMutation__
 *
 * To run a mutation, you first call `useUpdateEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmailMutation, { data, loading, error }] = useUpdateEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUpdateEmailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEmailMutation, UpdateEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEmailMutation, UpdateEmailMutationVariables>(UpdateEmailDocument, options);
      }
export type UpdateEmailMutationHookResult = ReturnType<typeof useUpdateEmailMutation>;
export type UpdateEmailMutationResult = Apollo.MutationResult<UpdateEmailMutation>;
export type UpdateEmailMutationOptions = Apollo.BaseMutationOptions<UpdateEmailMutation, UpdateEmailMutationVariables>;
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($oldPassword: String!, $newPassword: String!) {
  updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
    message
  }
}
    `;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      oldPassword: // value for 'oldPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const UpdateUserNameDocument = gql`
    mutation UpdateUserName($newName: String!) {
  updateUserName(newName: $newName) {
    message
  }
}
    `;
export type UpdateUserNameMutationFn = Apollo.MutationFunction<UpdateUserNameMutation, UpdateUserNameMutationVariables>;

/**
 * __useUpdateUserNameMutation__
 *
 * To run a mutation, you first call `useUpdateUserNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserNameMutation, { data, loading, error }] = useUpdateUserNameMutation({
 *   variables: {
 *      newName: // value for 'newName'
 *   },
 * });
 */
export function useUpdateUserNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserNameMutation, UpdateUserNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserNameMutation, UpdateUserNameMutationVariables>(UpdateUserNameDocument, options);
      }
export type UpdateUserNameMutationHookResult = ReturnType<typeof useUpdateUserNameMutation>;
export type UpdateUserNameMutationResult = Apollo.MutationResult<UpdateUserNameMutation>;
export type UpdateUserNameMutationOptions = Apollo.BaseMutationOptions<UpdateUserNameMutation, UpdateUserNameMutationVariables>;
export const ConfirmAccountDocument = gql`
    query ConfirmAccount($key: String!) {
  confirmAccount(key: $key) {
    user {
      email
    }
    path
  }
}
    `;

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
export const ConfirmEmailDocument = gql`
    query ConfirmEmail($key: String!) {
  confirmEmail(key: $key) {
    user {
      email
    }
    message
  }
}
    `;

/**
 * __useConfirmEmailQuery__
 *
 * To run a query within a React component, call `useConfirmEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useConfirmEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConfirmEmailQuery({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useConfirmEmailQuery(baseOptions: Apollo.QueryHookOptions<ConfirmEmailQuery, ConfirmEmailQueryVariables> & ({ variables: ConfirmEmailQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConfirmEmailQuery, ConfirmEmailQueryVariables>(ConfirmEmailDocument, options);
      }
export function useConfirmEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConfirmEmailQuery, ConfirmEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConfirmEmailQuery, ConfirmEmailQueryVariables>(ConfirmEmailDocument, options);
        }
export function useConfirmEmailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ConfirmEmailQuery, ConfirmEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ConfirmEmailQuery, ConfirmEmailQueryVariables>(ConfirmEmailDocument, options);
        }
export type ConfirmEmailQueryHookResult = ReturnType<typeof useConfirmEmailQuery>;
export type ConfirmEmailLazyQueryHookResult = ReturnType<typeof useConfirmEmailLazyQuery>;
export type ConfirmEmailSuspenseQueryHookResult = ReturnType<typeof useConfirmEmailSuspenseQuery>;
export type ConfirmEmailQueryResult = Apollo.QueryResult<ConfirmEmailQuery, ConfirmEmailQueryVariables>;
export const GetCourseDataDocument = gql`
    query GetCourseData($slug: String!) {
  getCourseData(slug: $slug) {
    ...Course
  }
}
    ${CourseFragmentDoc}`;

/**
 * __useGetCourseDataQuery__
 *
 * To run a query within a React component, call `useGetCourseDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseDataQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetCourseDataQuery(baseOptions: Apollo.QueryHookOptions<GetCourseDataQuery, GetCourseDataQueryVariables> & ({ variables: GetCourseDataQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCourseDataQuery, GetCourseDataQueryVariables>(GetCourseDataDocument, options);
      }
export function useGetCourseDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCourseDataQuery, GetCourseDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCourseDataQuery, GetCourseDataQueryVariables>(GetCourseDataDocument, options);
        }
export function useGetCourseDataSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCourseDataQuery, GetCourseDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCourseDataQuery, GetCourseDataQueryVariables>(GetCourseDataDocument, options);
        }
export type GetCourseDataQueryHookResult = ReturnType<typeof useGetCourseDataQuery>;
export type GetCourseDataLazyQueryHookResult = ReturnType<typeof useGetCourseDataLazyQuery>;
export type GetCourseDataSuspenseQueryHookResult = ReturnType<typeof useGetCourseDataSuspenseQuery>;
export type GetCourseDataQueryResult = Apollo.QueryResult<GetCourseDataQuery, GetCourseDataQueryVariables>;
export const GetCourseInfoDocument = gql`
    query GetCourseInfo($slug: String!) {
  getCourseData(slug: $slug) {
    ...CourseInfo
  }
}
    ${CourseInfoFragmentDoc}`;

/**
 * __useGetCourseInfoQuery__
 *
 * To run a query within a React component, call `useGetCourseInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseInfoQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetCourseInfoQuery(baseOptions: Apollo.QueryHookOptions<GetCourseInfoQuery, GetCourseInfoQueryVariables> & ({ variables: GetCourseInfoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCourseInfoQuery, GetCourseInfoQueryVariables>(GetCourseInfoDocument, options);
      }
export function useGetCourseInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCourseInfoQuery, GetCourseInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCourseInfoQuery, GetCourseInfoQueryVariables>(GetCourseInfoDocument, options);
        }
export function useGetCourseInfoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCourseInfoQuery, GetCourseInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCourseInfoQuery, GetCourseInfoQueryVariables>(GetCourseInfoDocument, options);
        }
export type GetCourseInfoQueryHookResult = ReturnType<typeof useGetCourseInfoQuery>;
export type GetCourseInfoLazyQueryHookResult = ReturnType<typeof useGetCourseInfoLazyQuery>;
export type GetCourseInfoSuspenseQueryHookResult = ReturnType<typeof useGetCourseInfoSuspenseQuery>;
export type GetCourseInfoQueryResult = Apollo.QueryResult<GetCourseInfoQuery, GetCourseInfoQueryVariables>;
export const GetCoursesDocument = gql`
    query GetCourses {
  getCourses {
    ...CourseInfo
  }
}
    ${CourseInfoFragmentDoc}`;

/**
 * __useGetCoursesQuery__
 *
 * To run a query within a React component, call `useGetCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCoursesQuery(baseOptions?: Apollo.QueryHookOptions<GetCoursesQuery, GetCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, options);
      }
export function useGetCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCoursesQuery, GetCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, options);
        }
export function useGetCoursesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCoursesQuery, GetCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, options);
        }
export type GetCoursesQueryHookResult = ReturnType<typeof useGetCoursesQuery>;
export type GetCoursesLazyQueryHookResult = ReturnType<typeof useGetCoursesLazyQuery>;
export type GetCoursesSuspenseQueryHookResult = ReturnType<typeof useGetCoursesSuspenseQuery>;
export type GetCoursesQueryResult = Apollo.QueryResult<GetCoursesQuery, GetCoursesQueryVariables>;
export const GetPurchasedCoursesDocument = gql`
    query GetPurchasedCourses {
  getPurchasedCourses {
    ...CourseInfo
  }
}
    ${CourseInfoFragmentDoc}`;

/**
 * __useGetPurchasedCoursesQuery__
 *
 * To run a query within a React component, call `useGetPurchasedCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchasedCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchasedCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPurchasedCoursesQuery(baseOptions?: Apollo.QueryHookOptions<GetPurchasedCoursesQuery, GetPurchasedCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPurchasedCoursesQuery, GetPurchasedCoursesQueryVariables>(GetPurchasedCoursesDocument, options);
      }
export function useGetPurchasedCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPurchasedCoursesQuery, GetPurchasedCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPurchasedCoursesQuery, GetPurchasedCoursesQueryVariables>(GetPurchasedCoursesDocument, options);
        }
export function useGetPurchasedCoursesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPurchasedCoursesQuery, GetPurchasedCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPurchasedCoursesQuery, GetPurchasedCoursesQueryVariables>(GetPurchasedCoursesDocument, options);
        }
export type GetPurchasedCoursesQueryHookResult = ReturnType<typeof useGetPurchasedCoursesQuery>;
export type GetPurchasedCoursesLazyQueryHookResult = ReturnType<typeof useGetPurchasedCoursesLazyQuery>;
export type GetPurchasedCoursesSuspenseQueryHookResult = ReturnType<typeof useGetPurchasedCoursesSuspenseQuery>;
export type GetPurchasedCoursesQueryResult = Apollo.QueryResult<GetPurchasedCoursesQuery, GetPurchasedCoursesQueryVariables>;
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