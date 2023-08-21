import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import { CURRENT_USER_QUERY } from './User';

/* eslint-disable prettier/prettier */
const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut() {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await signout().catch(console.error);
    Router.push({
      pathname: `/products`,
    });
  }

  return (
    <button type="button" onClick={handleSubmit}>
      Sign Out
    </button>
  );
}
