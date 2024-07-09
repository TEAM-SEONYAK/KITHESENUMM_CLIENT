import styled from '@emotion/styled';
import SeniorCard from '../../components/commons/seniorCard/SeniorCard';
import { SENIOR_LIST } from '../../components/commons/seniorCard/seniorCardConstants';

const JuniorPromisePage = () => {
  const { seniorList } = SENIOR_LIST;
  return (
    <SeniorListWrapper>
      {seniorList.map((List) => (
        <SeniorCard
          key={List.seniorId}
          nickname={List.nickname}
          company={List.company}
          field={List.field}
          position={List.position}
          detailPosition={List.detailPosition}
          level={List.level}
        />
      ))}
    </SeniorListWrapper>
  );
};

export default JuniorPromisePage;

const SeniorListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
  align-items: center;

  width: 100vw;
  height: 100vh;
  padding: 0.8rem 2rem;
`;