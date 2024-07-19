import styled from '@emotion/styled';
import React from 'react';
import CalendarBottomBar from './CalendarBottomBar';
import CustomCalendar from './CustomCalendar';
import TimeList from './TimeList';
import { useSeniorTimeQuery } from '../hooks/queries';
import { getDayOfWeek } from '../utils/getDay';

interface BottomSheetPropType {
  selectedTime: { id: number; selectedTime: string; clickedDay: string }[];
  setSelectedTime: React.Dispatch<React.SetStateAction<{ id: number; selectedTime: string; clickedDay: string }[]>>;
  isCalendarOpen: boolean;
  setIsCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  btnId: number;
  handleCheckAllSelected: () => void;
}

const CalendarBottomSheet: React.FC<BottomSheetPropType> = ({
  isCalendarOpen,
  setIsCalendarOpen,
  selectedTime,
  setSelectedTime,
  btnId,
  handleCheckAllSelected,
}) => {
  // 선배 아이디로 연결 필요
  const { data: preferredTimeList, isLoading, isError } = useSeniorTimeQuery(33);

  // 로딩 중 또는 에러 발생 시 처리
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !preferredTimeList) {
    return <div>Error loading data</div>;
  }

  console.log(preferredTimeList);

  return (
    <>
      <Background
        $isCalendarOpen={isCalendarOpen}
        onClick={() => {
          setIsCalendarOpen(false);
        }}
      />
      <BottomSheetWrapper $isCalendarOpen={isCalendarOpen}>
        <Scroll>
          <CustomCalendar
            btnId={btnId}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            preferredTimeList={preferredTimeList && preferredTimeList}
          />
          <GrayLine />
          <TimeList
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            btnId={btnId}
            // 해당 요일의 가능 시간대 가져오기
            timeList={preferredTimeList && preferredTimeList[getDayOfWeek(selectedTime[btnId].clickedDay)]}
          />
        </Scroll>
        <CalendarBottomBar
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          setIsCalendarOpen={setIsCalendarOpen}
          btnId={btnId}
          handleCheckAllSelected={handleCheckAllSelected}
        />
      </BottomSheetWrapper>
    </>
  );
};

export default CalendarBottomSheet;

const Scroll = styled.div`
  overflow-y: scroll;
  margin-bottom: 3rem;
`;

const Background = styled.div<{ $isCalendarOpen: boolean }>`
  display: ${({ $isCalendarOpen }) => ($isCalendarOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;

  width: 100%;
  height: 100dvh;

  background: ${({ theme }) => theme.colors.transparentBlack_65};
`;

const BottomSheetWrapper = styled.div<{ $isCalendarOpen: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 5rem;
  bottom: 0;
  left: 0;
  z-index: 4;

  height: 100vh;
  border-radius: 16px 16px 0 0;

  background: ${({ theme }) => theme.colors.grayScaleWhite};

  opacity: ${({ $isCalendarOpen }) => ($isCalendarOpen ? 1 : 0)};
  transition:
    transform 250ms ease-out,
    opacity 250ms ease-out;
  transform: translateY(${({ $isCalendarOpen }) => ($isCalendarOpen ? '0' : '100%')});
`;

const GrayLine = styled.div`
  z-index: 7;

  width: 100%;
  height: 1rem;

  background-color: ${({ theme }) => theme.colors.grayScaleWG};
`;
