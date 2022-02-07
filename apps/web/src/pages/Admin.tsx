/* eslint-disable no-unused-vars */
import { FC, memo, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigation, CardUser, AddManager } from 'components/index';
import { AnimatePresence, motion } from 'framer-motion';
import { Pagination } from 'components/Pagination';

type IAppProps = {};

const MemoizedCardManager = memo(CardUser);

export const Admin: FC<IAppProps> = () => {
  const [isVisible, setVisible] = useState(false);

  return (
    <>
      <Toaster />
      <Navigation />
      <main>
        <Button onClick={() => setVisible(true)} />
        <Pagination uri='/admin/show' keyName='managers'>
          {({ data, isLoading, isFetching }: any) => {
            if (isLoading || isFetching) {
              return <div>Loading...</div>;
            }

            return (
              <CardContainer>
                {data?.managers?.map(({ _id, email, name }: any) => (
                  <MemoizedCardManager
                    key={_id}
                    email={email}
                    name={name}
                    role='manager'
                  />
                ))}
              </CardContainer>
            );
          }}
        </Pagination>

        {isVisible && (
          <AnimatePresence>
            <AddManager onClose={() => setVisible(false)} />
          </AnimatePresence>
        )}
      </main>
    </>
  );
};

const Button = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className='m-auto my-3 transition flex gap-3 items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-700 focus:ring-indigo-500'>
      <span>New Manager</span>
    </button>
  );
};

const CardContainer = ({ children }: any) => {
  return (
    <motion.div
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      initial='hidden'
      animate='show'
      className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='max-w-screen-xl px-4 md:px-8 mx-auto'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8'>
          {children}
        </div>
      </div>
    </motion.div>
  );
};
