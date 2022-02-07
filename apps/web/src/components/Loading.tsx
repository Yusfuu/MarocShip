import { FC } from 'react';
import Lottie from 'react-lottie';
import loading from '../lottie/loading-bloob.json';

type IAppProps = {};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loading,
};

export const Loading: FC<IAppProps> = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Lottie options={defaultOptions} width='70%' height='70%' />
    </div>
  );
};
