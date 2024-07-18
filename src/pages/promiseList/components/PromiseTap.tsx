import styled from '@emotion/styled';
import { useState } from 'react';
import ProfileContainer from './ProfileContainer';
import { PROMISE_TAP } from '../constants/constants';
import { profileCardDataType } from '../types/type';
import { getEmptyMessage } from '../utils/getEmptyMessage';

interface PromiseTapPropType {
  userRole: string;
  myNickname: string;
  pending: profileCardDataType[];
  scheduled: profileCardDataType[];
  past: profileCardDataType[];
}

const PromiseTap = (props: PromiseTapPropType) => {
  const [tap, setTap] = useState('pending');
  const { userRole, pending, scheduled, past, myNickname } = props;
  console.log(pending);
  console.log(scheduled);
  console.log(past);

  const getTapContent = (tap: string) => {
    switch (tap) {
      case 'pending':
        return pending;
      case 'scheduled':
        return scheduled;
      case 'past':
        return past;
      default:
        return pending;
    }
  };

  return (
    <Wrapper>
      <TapContainer>
        {PROMISE_TAP.map((el, idx) => (
          <TapText
            key={el.tap + idx}
            onClick={() => {
              setTap(el.tap);
            }}
            $isActive={tap === el.tap}>
            {el.text}
          </TapText>
        ))}
      </TapContainer>
      {getTapContent(tap).length ? (
        <ProfileWrapper>
          {tap === 'past' &&
            getTapContent(tap).map((profileData) =>
              profileData.appointmentStatus === 'REJECTED' ? (
                <ProfileContainer
                  myNickname={myNickname}
                  userRole={userRole}
                  tap="rejected"
                  profileCardData={profileData}
                  isarrow="ture"
                />
              ) : (
                <ProfileContainer
                  myNickname={myNickname}
                  userRole={userRole}
                  tap="past"
                  profileCardData={profileData}
                  isarrow="true"
                />
              ),
            )}

          {tap !== 'past' &&
            getTapContent(tap).map((profileCardData, idx) => (
              <ProfileContainer
                myNickname={myNickname}
                key={profileCardData.appointmentId + idx}
                userRole={userRole}
                tap={tap}
                profileCardData={profileCardData}
                isarrow="true"
              />
            ))}
        </ProfileWrapper>
      ) : (
        <EmptyView>{getEmptyMessage(tap)}</EmptyView>
      )}
    </Wrapper>
  );
};

export default PromiseTap;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;

  background-color: ${({ theme }) => theme.colors.grayScaleWhite};
`;

const TapContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 1.5rem 4.7rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayScaleLG1};
`;

const TapText = styled.span<{ $isActive: boolean }>`
  ${({ theme }) => theme.fonts.Title1_SB_16};
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.grayScaleBG : theme.colors.grayScaleMG2)};
`;

const ProfileWrapper = styled.div`
  width: 100vw;
  padding: 0 2rem;
`;

const EmptyView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 18.9rem;

  ${({ theme }) => theme.fonts.Title2_M_16};
  color: ${({ theme }) => theme.colors.grayScaleLG2};
`;
