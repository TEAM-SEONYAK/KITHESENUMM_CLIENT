// 유저가 후배일경우
import { ArrowLeftIc } from '@assets/svgs';
import { FullBtn } from '@components/commons/FullButton';
import { Header } from '@components/commons/Header';
import styled from '@emotion/styled';
import ProfileContainer from '@pages/promiseList/components/ProfileContainer';
import PromiseTimerBtn from '@pages/promiseList/components/PromiseTimerBtn';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetPromiseDetail } from './hooks/queries';
import useCountdown from '@hooks/useCountDown';
import { useState } from 'react';
import PreView from '@pages/seniorProfile/components/preView';

const PromiseDetailPageJunior = () => {
  // 라우터 이동할 때 location으로 약속id, 눌린 탭 상태값(pending, sheduled, ..) 받아와야함
  const navigate = useNavigate();
  const location = useLocation();
  const tap = location.state.tap;
  const myNickname = location.state.myNickname;
  const appointmentId = location.state.appointmentId;

  const [isDetailClicked, setIsDetailClicked] = useState(false);
  const [clickedSeniorId, setClickedSeniorId] = useState(0);

  const handleSetIsDetailClicked = (type: boolean, id: number) => {
    setIsDetailClicked(type);
    setClickedSeniorId(id);
  };
  console.log(clickedSeniorId);

  const { juniorInfo, seniorInfo, timeList1, topic, personalTopic, isSuccess, isLoading } =
    useGetPromiseDetail(appointmentId);

  const countdown = useCountdown(timeList1?.date, timeList1?.startTime);

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시
  }

  if (!isSuccess || !timeList1) {
    return <div>데이터 없음</div>; // 데이터가 없을 때 표시
  }

  const { diffText, diff } = countdown;

  const handleClickBackArrow = () => {
    setIsDetailClicked(false);
  };

  return (
    <>
      {isDetailClicked ? (
        <>
          <Header LeftSvg={ArrowLeftIc} title="내가 보낸 약속" onClickLeft={handleClickBackArrow} />
          <Divider />
          <PreView variant="secondary" seniorId={clickedSeniorId + ''} />
        </>
      ) : (
        <>
          <Header LeftSvg={ArrowLeftIc} title="자세히 보기" onClickLeft={() => navigate('/')} />
          <Wrapper>
            <Layout>
              <TitleContainer>
                <Title>{seniorInfo.nickname} 선배님의 프로필</Title>
                <PromiseDiv>
                  <ProfileContainer
                    myNickname={myNickname}
                    userRole="JUNIOR"
                    tap="default"
                    profileCardData={seniorInfo}
                    isarrow="false"
                    detail="detail"
                    handleSetIsDetailClicked={handleSetIsDetailClicked}
                  />
                </PromiseDiv>
              </TitleContainer>

              <TitleContainer>
                <Title>나의 정보</Title>
                <Content>
                  {juniorInfo.univName} {juniorInfo.field} {juniorInfo.department}
                </Content>
              </TitleContainer>

              <TitleContainer>
                <Title>{seniorInfo.nickname} 선배님과 상담하고 싶은 내용</Title>
                {topic[0] !== '' ? (
                  topic.map((el: string, idx: number) => <Content key={idx + el}>{el}</Content>)
                ) : (
                  <WrittenContent>{personalTopic}</WrittenContent>
                )}
              </TitleContainer>
            </Layout>
            <BtnWrapper>
              {tap === 'pending' ? (
                <FullBtn text="이미 신청한 선약은 취소할 수 없어요" isActive={false} />
              ) : (
                <PromiseTimerBtn isActive={diff <= 0} diff={diffText} page="detail" />
              )}

              <BtnBackground />
            </BtnWrapper>
          </Wrapper>
        </>
      )}
    </>
  );
};

export default PromiseDetailPageJunior;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 1.974rem 0 2.026rem;
  gap: 3rem;

  width: 100vw;
  height: 100%;
  margin-top: 4.4rem;

  background-color: ${({ theme }) => theme.colors.grayScaleWhite};
  border-top: 1px solid ${({ theme }) => theme.colors.grayScaleLG2};
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 3rem;
  margin-bottom: 11.6rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  ${({ theme }) => theme.fonts.Title1_SB_16};
  color: ${({ theme }) => theme.colors.grayScaleBG};
`;

const PromiseDiv = styled.div`
  width: 100%;
  border-radius: 8px;
  padding: 1rem 0 1rem 1.209rem;
  border: 1px solid ${({ theme }) => theme.colors.grayScaleLG1};
  background-color: ${({ theme }) => theme.colors.grayScaleWhite};
`;

const Content = styled.div`
  width: 100%;
  padding: 1.1rem 0 1.1rem 1.5rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.grayScaleLG1};
  color: ${({ theme }) => theme.colors.grayScaleBG};
  ${({ theme }) => theme.fonts.Body1_M_14}
`;

const WrittenContent = styled.div`
  padding: 1rem 1.5rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.grayScaleLG1};
  color: ${({ theme }) => theme.colors.grayScaleBG};
  ${({ theme }) => theme.fonts.Body1_M_14};
  white-space: pre-line;
`;

const BtnWrapper = styled.div`
  position: fixed;
  z-index: 3;
  bottom: 0;
  width: 100%;
  padding: 0 2.035rem 0 1.965rem;
  display: flex;
  gap: 1rem;
  margin-bottom: 3.977rem;
`;

const BtnBackground = styled.div`
  width: 100%;
  height: 6.1rem;
  background-color: ${({ theme }) => theme.colors.grayScaleWhite};
  z-index: 2;
  position: fixed;
  bottom: 0;
`;

const Divider = styled.hr`
  width: 100vw;
  margin-top: 5rem;
  height: 0.1rem;
  border: 1px solid ${({ theme }) => theme.colors.grayScaleLG2};
  margin-bottom: 3.2rem;
`;
