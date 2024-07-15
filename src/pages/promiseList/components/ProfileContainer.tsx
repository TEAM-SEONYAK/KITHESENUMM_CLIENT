import { CardArrowRightGrayIc, ClockIc } from '@assets/svgs';
import { AutoCloseModal } from '@components/commons/modal/AutoCloseModal';
import styled from '@emotion/styled';
import { getLevelName } from '@utils/getLevelName';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileChip from './ProfileChip';
import { profileCardDataType } from '../types/type';
import { extractMonthAndDay } from '../utils/extractMonthAndDay';

interface ProfileContainerPropType {
  userRole: string;
  tap: string;
  profileCardData?: profileCardDataType;
  isarrow: string;
}

const ProfileContainer = (props: ProfileContainerPropType) => {
  const { userRole, profileCardData, tap, isarrow } = props;
  const navigate = useNavigate();

  const [isReviewClicked, setIsReviewClicked] = useState(false);
  const { month, day } = extractMonthAndDay(profileCardData?.date + '');

  const getTopicDescription = (chosenTopic: string[] | undefined) => {
    const topicLength = chosenTopic?.length;

    return topicLength ? `${chosenTopic[0]} 외 ${topicLength - 1}건` : '직접 작성했어요';
  };

  const ShowReviewClickedModal = (type: boolean) => {
    setIsReviewClicked(type);
  };

  const handleClickProfileContainer = (tap: string, userRole: string) => {
    if (userRole === 'SENIOR' && tap === 'pending') {
      navigate('/promiseDetail', {
        state: { tap: 'pending' },
      });
    }
    if (userRole === 'JUNIOR' && tap === 'pending') {
      navigate('./promiseDetailJunior', {
        state: { tap: 'pending' },
      });
    }
    if (userRole === 'SENIOR' && tap === 'scheduled') {
      navigate('./promiseDetail', {
        state: { tap: 'scheduled' },
      });
    }
    if (userRole === 'JUNIOR' && tap === 'scheduled') {
      navigate('./promiseDetailJunior', {
        state: { tap: 'scheduled' },
      });
    }
  };
  return (
    <ReviewWrapper $tap={tap}>
      <Wrapper $tap={tap} onClick={() => handleClickProfileContainer(tap, userRole)}>
        <TempImg />
        <InfoContainer>
          <NameContainer>
            <Name>
              {profileCardData?.nickname} {userRole === 'SENIOR' ? '후배' : '선배'}
            </Name>
            {tap === 'rejected' && <RejectedChip>거절</RejectedChip>}
          </NameContainer>
          {userRole === 'JUNIOR' && (
            <ChipContainer>
              <ProfileChip type="company" content={profileCardData?.company} />
              <ProfileChip type="field" content={profileCardData?.field} />
            </ChipContainer>
          )}
          {userRole === 'SENIOR' &&
            (tap === 'pending' || tap === 'scheduled' || tap === 'past' || tap === 'rejected') && (
              <>
                <ChipContainer>
                  <ProfileChip type="field" content={profileCardData?.field} />
                  <ProfileChip type="field" content={profileCardData?.department} />
                </ChipContainer>
                {tap === 'pending' && (
                  <Description $colorType="grayScaleDG">{getTopicDescription(profileCardData?.topic)}</Description>
                )}
              </>
            )}
          {userRole === 'SENIOR' && tap === 'default' && (
            <>
              <MajorDiv>
                <Major>{profileCardData?.field}</Major>
                <Divider />
                <Major>{profileCardData?.department}</Major>
              </MajorDiv>
              <Description $colorType="grayScaleDG">{getTopicDescription(profileCardData?.topic)}</Description>
            </>
          )}
          {userRole === 'JUNIOR' && (
            <>
              <MajorDiv>
                <Major>{profileCardData?.position}</Major>
                <Divider />
                <Major>{profileCardData?.detailPosition}</Major>
              </MajorDiv>
              <Description $colorType="grayScaleDG">
                {getLevelName(profileCardData?.level + '')} {profileCardData?.level}
              </Description>
            </>
          )}
          {(tap === 'scheduled' || tap === 'past') && (
            <TimeContainer>
              <ClockIc />
              <TimeSpan>
                {month}월 {day}일 {profileCardData?.startTime} - {profileCardData?.endTime}
              </TimeSpan>
            </TimeContainer>
          )}
          {userRole === 'SENIOR' && tap === 'rejected' && (
            <Description $colorType="grayScaleMG2">거절한 선약이에요</Description>
          )}
          {userRole === 'JUNIOR' && tap === 'rejected' && (
            <Description $colorType="grayScaleMG2">선배님이 거절한 선약이에요</Description>
          )}
        </InfoContainer>
        <CardArrowRightGrayIcon isarrow={isarrow} />
      </Wrapper>
      {userRole === 'JUNIOR' && tap === 'past' && (
        <ReviewBtn onClick={() => setIsReviewClicked(true)}>리뷰 작성하기</ReviewBtn>
      )}
      {userRole === 'SENIOR' && tap === 'past' && <ReviewBtn>작성된 리뷰 없음</ReviewBtn>}
      <AutoCloseModal
        text="아직 준비중인 기능이에요"
        showModal={isReviewClicked}
        handleShowModal={ShowReviewClickedModal}>
        <TestImg />
      </AutoCloseModal>
    </ReviewWrapper>
  );
};

export default ProfileContainer;

const ReviewWrapper = styled.div<{ $tap: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-bottom: ${({ $tap, theme }) => ($tap === 'default' ? 'none' : `1px solid ${theme.colors.grayScaleLG2}`)};

  &:last-child {
    margin-bottom: ${({ $tap }) => ($tap === 'default' ? 0 : '8.8rem')};
    border-bottom: none;
  }
`;

// 이미지카드
const Wrapper = styled.div<{ $tap: string }>`
  display: flex;
  gap: 1.4rem;
  position: relative;

  width: 100%;
  padding: ${({ $tap }) => ($tap === 'default' ? '0' : '2rem 0')};
  border-bottom: ${({ $tap, theme }) =>
    $tap === 'default' || $tap === 'past' ? 'none' : `1px solid ${theme.colors.grayScaleLG2}`};

  background-color: ${({ theme }) => theme.colors.grayScaleWhite};

  &:last-child {
    border-bottom: none;
  }
`;

const TempImg = styled.div`
  width: 8.6rem;
  height: 8.6rem;
  border-radius: 100px;

  background-color: ${({ theme }) => theme.colors.primaryBlue50};
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const NameContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  margin-bottom: 0.8rem;
`;

const Name = styled.span`
  ${({ theme }) => theme.fonts.Title1_SB_16};
  color: ${({ theme }) => theme.colors.grayScaleBG};
`;

const MajorDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Major = styled.span`
  ${({ theme }) => theme.fonts.Body1_M_14};
  color: ${({ theme }) => theme.colors.grayScaleDG};
`;

const Divider = styled.div`
  width: 0.15rem;
  height: 1.4rem;
  margin: 0 0.6rem;

  background-color: ${({ theme }) => theme.colors.grayScaleLG2};
`;

const Description = styled.div<{ $colorType: string }>`
  width: 19rem;
  height: 2.2rem;
  color: ${({ theme, $colorType }) =>
    $colorType === 'grayScaleDG' ? theme.colors.grayScaleDG : theme.colors.grayScaleMG2};
  ${({ theme }) => theme.fonts.Body1_M_14};
`;

const CardArrowRightGrayIcon = styled(CardArrowRightGrayIc)<{ isarrow: string }>`
  display: ${({ isarrow }) => (isarrow === 'true' ? 'block' : 'none')};
  position: absolute;
  top: 50%;
  right: 0;
`;

const ChipContainer = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;

  margin-bottom: 0.6rem;
`;

const TimeContainer = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
`;

const TimeSpan = styled.span`
  color: ${({ theme }) => theme.colors.grayScaleMG2};
  ${({ theme }) => theme.fonts.Body1_M_14};
`;

const ReviewBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-bottom: 2rem;
  padding: 0.8rem 0;
  border: 1px solid ${({ theme }) => theme.colors.grayScaleLG2};
  border-radius: 8px;

  color: ${({ theme }) => theme.colors.grayScaleMG2};

  ${({ theme }) => theme.fonts.Body3_SB_14};
  cursor: pointer;
`;

const RejectedChip = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2.9rem;
  height: 2.1rem;
  border-radius: 4px;

  background-color: ${({ theme }) => theme.colors.Red};

  color: ${({ theme }) => theme.colors.grayScaleWhite};
  ${({ theme }) => theme.fonts.Caption2_SB_12};
`;

const TestImg = styled.div`
  width: 27rem;
  height: 17.2rem;
  background-color: ${({ theme }) => theme.colors.grayScaleMG2};
`;