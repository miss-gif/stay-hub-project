import { Button } from '@/components/ui/button';
import useGoogleSignin from '@/hooks/use-GoogleSignin';

const SigninPage = () => {
  const { signin, signout } = useGoogleSignin();

  return (
    <div>
      <Button onClick={signin}>구글 로그인</Button>
      <Button onClick={signout}>구글 로그아웃</Button>
    </div>
  );
};

export default SigninPage;
