/* eslint-disable no-unused-vars */
import { FC, memo, useEffect, useMemo, useState } from 'react';
import { useMutation } from 'hooks/useMutation';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { Navigation, Modal } from 'components/index';
import { AddMangerSchema } from 'lib/validation';
import { useQuery as Query, useQueryClient } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { Skeleton } from '@mui/material';

type IAppProps = {};

export const Admin: FC<IAppProps> = () => {
  const [isVisible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchProjects = (page = 0) =>
    fetch('http://localhost:3000/api/admin/show?page=' + page).then((res) =>
      res.json()
    );

  const { isLoading, isError, error, data, isFetching, isPreviousData } = Query(
    ['managers', currentPage],
    () => fetchProjects(currentPage),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  <Skeleton />;
  return (
    <>
      <Toaster />
      <Navigation />
      <main>
        <Button onClick={() => setVisible(true)} />
        <CardContainer>
          {data.managers.map(({ _id, email, name }: any) => (
            <MemoizedCardManager
              key={_id}
              email={email}
              name={name}
              role='manager'
            />
          ))}
        </CardContainer>
        <PaginationIndicator
          currentPage={currentPage}
          onClickPage={setCurrentPage}
          pageOptions={data?.pageOptions}
        />
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
      className='transition flex gap-3 items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-700 focus:ring-indigo-500'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M12 4v16m8-8H4'
        />
      </svg>
      <span>New Manager</span>
    </button>
  );
};

const Input = ({ label, type = 'text', name, value, onChange }: any) => {
  return (
    <div className='flex flex-col gap-2'>
      <label
        htmlFor={label}
        className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <input
        autoComplete='off'
        onChange={onChange}
        value={value}
        type={type}
        name={name}
        className='input-primary'></input>
    </div>
  );
};

const AddManager = ({ onClose }: any) => {
  const queryClient = useQueryClient();

  const mutation: any = useMutation('/admin/create', {
    onMutate: () => {
      toast.loading('Creating new manager...');
    },
    onError: ({ response }: any) => {
      toast.dismiss();
      const [error] = response.data.errors;
      toast.error(error.msg);
    },
    onSuccess: ({ data }: any) => {
      toast.dismiss();
      toast.success('New manager created!');
      formik.resetForm();

      // Invalidation from Mutations you can Updates from Mutation Responses
      queryClient.invalidateQueries(['managers', 1]);

      console.log(data.password);
    },
    onSettled: () => {
      formik.setSubmitting(false);
    },
  });

  const formik = useFormik({
    initialValues: { email: '', name: '' },
    validationSchema: AddMangerSchema,
    onSubmit: ({ email, name }) => {
      // on submit do send mutation
      mutation.mutate({ email, name });
    },
  });

  return (
    <Modal onClose={onClose}>
      <div className='flex items-center justify-center'>
        <span className='inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100'>
          <svg
            className='h-full w-full text-gray-300'
            fill='currentColor'
            viewBox='0 0 24 24'>
            <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
          </svg>
        </span>
      </div>

      <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
        <Input
          onChange={formik.handleChange}
          label='Email address'
          type='email'
          name='email'
          value={formik.values.email}
        />
        <Input
          onChange={formik.handleChange}
          label='Full name'
          type='text'
          name='name'
          value={formik.values.name}
        />

        <button
          disabled={!(formik.isValid && formik.dirty && !formik.isSubmitting)}
          type='submit'
          className='btn-primary'>
          {' '}
          Got it, thanks!
        </button>
      </form>
    </Modal>
  );
};

const PaginationIndicator = ({
  pageOptions,
  onClickPage,
  currentPage,
}: any) => {
  const pickPage = (page: number) => {
    onClickPage(page);
  };

  return (
    <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
      <div className='flex-1 flex justify-between sm:hidden'>
        <button className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
          Previous
        </button>
        <button className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
          Next
        </button>
      </div>
      <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing <span className='font-medium'>1</span> to{' '}
            <span className='font-medium'>{pageOptions.length}</span> of{' '}
            <span className='font-medium'>{pageOptions.collections}</span>{' '}
            results
          </p>
        </div>
        <div>
          <nav
            className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
            aria-label='Pagination'>
            <button
              disabled={pageOptions.page === 0}
              onClick={() => onClickPage((prev: any) => prev - 1)}
              className='button-pagination'>
              Previous
            </button>

            {Array(pageOptions.pages)
              .fill(0)
              .map((_, index) => (
                <button
                  onClick={() => pickPage(index + 1)}
                  className={`${
                    currentPage === index + 1
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-600 z-10'
                      : ''
                  } button-index-pagination`}
                  key={index}>
                  {index + 1}
                </button>
              ))}

            <button
              onClick={() => onClickPage((prev: any) => prev + 1)}
              disabled={!pageOptions.hasNext}
              className='button-pagination rounded-none rounded-r-md'>
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

const CardContainer = ({ children }: any) => {
  const parent = useMemo(
    () => ({ show: { transition: { staggerChildren: 0.1 } } }),
    []
  );

  return (
    <motion.div
      variants={parent}
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

const picturs = [
  'https://pbs.twimg.com/profile_images/1228449356426219521/jIN5Ci7H_400x400.jpg',
  'https://pbs.twimg.com/profile_images/1413609823359410183/lhlXgJoL_400x400.jpg',
  'https://pbs.twimg.com/profile_images/1194080814688079872/6qhYKGKC_400x400.jpg',
  'https://pbs.twimg.com/profile_images/1479609144441249806/zLD7dyHe_400x400.jpg',
  'https://pbs.twimg.com/profile_images/1444988463216922631/IDffhy4i_400x400.jpg',
  'https://pbs.twimg.com/profile_images/1336281436685541376/fRSl8uJP_400x400.jpg',
  'https://pbs.twimg.com/profile_images/1079350235221164032/q1PL7gWt_400x400.jpg',
  'https://pbs.twimg.com/profile_images/1344410501309030403/L2rNpO6h_400x400.jpg',
  'https://pbs.twimg.com/profile_images/1400161856329822208/GrSz46jH_400x400.jpg',
  'https://pbs.twimg.com/profile_images/1355765547913392129/lyMq-2mY_400x400.jpg',
  'https://pbs.twimg.com/profile_images/1404817306031562756/5cHmpCuL_400x400.jpg',
  'https://pbs.twimg.com/profile_images/1473479314834345990/rNrZqEdU_400x400.jpg',
];

const CardManager = ({ name, email, role }: any) => {
  const stat = useMemo(
    () => ({ hidden: { opacity: 0, y: -20 }, show: { opacity: 1, y: 0 } }),
    []
  );
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      variants={stat}
      className='ring-violet-pink-100 ring-violet-300 ring-offset-2 focus:ring flex flex-col outline-none items-center shadow-md rounded-md border p-4 lg:p-8'>
      <div className='w-24 md:w-32 h-24 md:h-32  rounded-full overflow-hidden  mb-2 md:mb-4'>
        <img
          src={picturs[Math.floor(Math.random() * picturs.length)]}
          loading='lazy'
          alt='Photo by Radu Florin'
          className='w-full h-full object-cover object-center'
        />
      </div>

      <div className='flex flex-col justify-center items-center gap-3'>
        <div className='truncate'>
          <div className='text-gray-900 md:text-lg font-semibold text-center'>
            {name}
          </div>
          <div className='text-gray-600  text-sm text-center min-w-min'>
            {email}
          </div>
        </div>
        <span className='capitalize px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
          {role}
        </span>
      </div>
    </motion.button>
  );
};

const MemoizedCardManager = memo(CardManager);
