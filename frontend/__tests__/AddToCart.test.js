import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import wait from 'waait';
import AddToCart from '../components/AddToCart';
import { ADD_TO_CART_MUTATION } from '../components/AddToCart';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeCartItem, fakeItem, fakeUser } from '../lib/testUtils';

const product = fakeItem();
const me = fakeUser();
const cartItem = fakeCartItem();

const mocks = [
  {
    request: {
      query: ADD_TO_CART_MUTATION,
      variables: { id: product.id },
    },
    result: {
      data: {
        addToCart: cartItem,
      },
    },
  },
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        authenticatedItem: me,
      },
    },
  },
];

describe('<AddToCart />', () => {
  it('renders and matched snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <AddToCart id={'abc123'} user={me} />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('disables add to cart button and updates text while loading', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <AddToCart id="abc123" user={me} />
      </MockedProvider>
    );
    await userEvent.click(screen.getByText(/Add To Cart/i));
    const disabled = screen.getByText(/Adding To Cart/i);
    expect(disabled).toBeInTheDocument();
    expect(screen.getByText(/Adding To Cart/i)).toHaveAttribute('disabled');
  });

  it('returns to not being disabled after mutation', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <AddToCart id="abc123" user={me} />
      </MockedProvider>
    );
    await userEvent.click(screen.getByText(/Add To Cart/i));
    await waitFor(() => wait(400));
    expect(screen.getByText(/Add To Cart/i)).toBeInTheDocument();
  });
});
