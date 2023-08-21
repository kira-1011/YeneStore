/* eslint-disable prettier/prettier */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { string } from 'prop-types';
import { CURRENT_USER_QUERY } from './User';

export const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default function AddToCart({ id, user }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    !user ? alert('Please sign in to add to cart!') : await addToCart();
  }

  return (
    <button disabled={loading} type="button" onClick={handleSubmit}>
      Add{loading && 'ing'} To Cart
    </button>
  );
}

AddToCart.propTypes = {
  id: string,
};
