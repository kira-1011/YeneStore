import styled from 'styled-components';

const PaginationStyles = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  border: 1px solid var(--lightGray);
  border-radius: 10px;

  & > * {
    margin: 0;
    padding: 10px 20px;
    border-right: 1px solid var(--lightGray);
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }

  .total-items {
    display: none;
  }

  @media screen and (min-width: 668px) {
    .total-items {
      display: inline-grid;
    }
    & > * {
      padding: 15px 30px;
    }
  }
`;

export default PaginationStyles;
