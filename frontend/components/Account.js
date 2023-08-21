import { useUser } from './User';
import styled from 'styled-components';

export default function Account() {
  const user = useUser();

  const AccountStyles = styled.div`
    margin: 0 auto;
    margin-top: 3rem;
    border: 1px solid var(--black);
    border-radius: 5px;
    padding: 2rem;
    padding-left: 4rem;
    line-height: 0.5;
    box-shadow: var(--bs);
    max-width: 800px;

    .name {
      margin-bottom: 4rem;
    }

    .fields {
      color: var(--dark-orange);
      font-size: 2rem;
    }
  `;

  return (
    <AccountStyles>
      <div className="name">
        <p className="fields">Name:</p>
        <p>{user?.name}</p>
      </div>
      <div>
        <p className="fields">Email:</p>
        <p>{user?.email}</p>
      </div>
    </AccountStyles>
  );
}
