import { FullBtn } from '@components/commons/FullButton';
import Toaster from '@components/commons/Toaster';
import WarnDescription from '@components/commons/WarnDescription';
import styled from '@emotion/styled';
import TimeWeekdays from '@pages/seniorProfile/components/TimeSelect/TimeWeekdays';
import { TOASTER_TEXT } from '@pages/seniorProfile/constants';
import { funnelComponentPropType } from '@pages/seniorProfile/types';
import { isDropdownActive } from '@pages/seniorProfile/utils/isDropdownActive';
import { isTimeValid } from '@pages/seniorProfile/utils/isTimeValid';
import { useEffect, useState } from 'react';
import TimeAlldays from './TimeAlldays';
import ToggleButton from '../../../../components/commons/ToggleButton';

const TimeSelect = ({ profile, setProfile, setStep }: funnelComponentPropType) => {
  const [leftToggleText, rightToggleText] = ['주중/주말 선택', '모든 요일 선택'];
  const [selectToggle, setSelectToggle] = useState<string>(profile.isDayOfWeek ? rightToggleText : leftToggleText);
  const timeType = selectToggle === '주중/주말 선택' ? 'weekend' : 'dayOfWeek';
  const [isBtnActive, setIsBtnActive] = useState(true);
  const [isToaster, setIsToaster] = useState(false);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (isTimeValid(profile.preferredTimeList[timeType])) {
      setIsBtnActive(true);
      setIsWarning(false);
    } else {
      setIsBtnActive(false);
      setIsToaster(false);
    }
  }, [profile.preferredTimeList]);

  const handleToggleBtn = (selectedToggle: string) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      isDayOfWeek: selectedToggle === rightToggleText,
    }));
    setIsWarning(false);
    setIsToaster(false);
    setSelectToggle(selectedToggle);
  };

  const handleActiveBtnClick = () => {
    if (isToaster) {
      setStep && setStep((prev) => prev + 1);
      return;
    }

    isDropdownActive(profile.preferredTimeList[timeType]) ? setStep && setStep((prev) => prev + 1) : setIsToaster(true);
  };

  const handleInactiveBtnClick = () => {
    setIsWarning(true);
  };

  return (
    <>
      <Wrapper>
        <ToggleButton
          left={leftToggleText}
          right={rightToggleText}
          activeButton={selectToggle}
          onSetActiveButtonHandler={handleToggleBtn}
        />
        <WarnWrapper>
          <WarnDescription isShown={isWarning} warnText="시간 입력에 오류가 있어요! 다시 한번 확인해 주세요" />
        </WarnWrapper>
        {selectToggle === leftToggleText ? (
          <TimeWeekdays profile={profile} setProfile={setProfile} isWarning={isWarning} />
        ) : (
          <TimeAlldays profile={profile} setProfile={setProfile} isWarning={isWarning} />
        )}
      </Wrapper>
      {isToaster && <Toaster text={TOASTER_TEXT} />}
      <FullBtn
        text="다음으로"
        onClick={handleActiveBtnClick}
        isActive={isBtnActive}
        onInactiveClick={handleInactiveBtnClick}
      />
    </>
  );
};

export default TimeSelect;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;

  padding: 3.2rem 2rem 0;
`;

const WarnWrapper = styled.div`
  align-self: flex-start;

  padding: 1rem 0 0.6rem;
`;
