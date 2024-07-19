import { GoogleLogoIc, OnboardingBackgroundHBIc, OnboardingBackgroundSBIc } from '@assets/svgs';
import styled from '@emotion/styled';
import theme from '@styles/theme';
import useGoogleLoginHook from './hooks/useLoginQuery';
import { DemoNextBtn } from '@pages/join/JoinPage';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const role = localStorage.getItem('role');
  const { login } = useGoogleLoginHook({});
  const navigate = useNavigate();

  const handleNextBtn = () => {
    role === 'SENIOR' ? navigate('/seniorOnboarding') : role === 'JUNIOR' && navigate('/juniorOnboarding');
  };
  return (
    <>
      {role === 'SENIOR' ? <OnboardingBackgroundSBIcon /> : <OnboardingBackgroundHBIcon />}
      <BtnContainer onClick={() => login()}>
        <GoogleLogoIcon />
        <Text>구글로 시작하기</Text>
      </BtnContainer>
      <DemoNextBtn onClick={handleNextBtn} />
    </>
  );
};

export default SignupPage;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 50%;

  width: 33.5rem;
  height: 5.6rem;
  border-radius: 5px;

  background-color: ${({ theme }) => theme.colors.grayScaleBG};
  transform: translate(-50%, -50%);
`;

const Text = styled.p`
  display: flex;

  padding-left: 6.85rem;

  ${theme.fonts.Head2_SB_18};
  color: ${({ theme }) => theme.colors.grayScaleWhite};
  text-align: center;
`;

const GoogleLogoIcon = styled(GoogleLogoIc)`
  width: 33px;
  height: 33px;
  margin: 10px;
`;

const OnboardingBackgroundSBIcon = styled(OnboardingBackgroundSBIc)`
  width: 100vw;
  height: 100dvh;
`;

const OnboardingBackgroundHBIcon = styled(OnboardingBackgroundHBIc)`
  width: 100vw;
  height: 100dvh;
`;
