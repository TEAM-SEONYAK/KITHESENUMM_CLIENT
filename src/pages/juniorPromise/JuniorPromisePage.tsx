import styled from '@emotion/styled';
import TimeSelectionButton from './components/TimeSelectionButton';
import TimeSelectionTitleWrapper from './components/TimeSelectionTitleWrapper';

const JuniorPromisePage = () => {
  return (
    <TimeSelectionContainer>
      <TimeSelectionTitleWrapper />
      <TimeSelectionButton />
    </TimeSelectionContainer>
  );
};

export default JuniorPromisePage;

const TimeSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;
  padding: 0 2rem;
`;
