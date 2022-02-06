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

export const Manager: FC<IAppProps> = () => {
  const [isVisible, setVisibleTo] = useState<any>(null);

  return (
    <div>
      <Toaster />
      <Navigation></Navigation>
      <section className='w-full px-8 py-16 bg-gray-100 xl:px-8'>
        <div className='flex items-stretch w-full gap-10 pb-10 mt-8 sm:mt-16'>
          <Card
            title='Create Delivery Manager'
            bg=''
            onClick={() => setVisibleTo('delivery')}
          />
          <Card
            title='Create Driver'
            bg=''
            onClick={() => setVisibleTo('driver')}
          />
        </div>
        {isVisible === 'delivery' && (
          <AddDeliveryManager onClose={() => setVisibleTo(null)} />
        )}
        {isVisible === 'driver' && (
          <AddDriver onClose={() => setVisibleTo(null)} />
        )}
      </section>
    </div>
  );
};

const Card = ({ title, onClick }: any) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.99 }}
      className='cursor-pointer min-h-full relative text-left select-none bg-purple-500 shadow-lg rounded-xl'>
      <div className='py-8 text-white  border-t-0 bg-purple-500 border-yellow-200 px-7 rounded-xl'>
        <span className='text-xs font-semibold absolute top-0 -mt-3.5 rounded-full px-4 py-2 uppercase text-purple-500 bg-gray-800'>
          Resources
        </span>
        <h2 className='mb-5 text-5xl font-bold'>
          <span>{title}</span>
        </h2>
        <p className='mb-2 text-lg font-normal text-purple-100 opacity-100'>
          Quench satisfying designs to help you stir up emotion and tell a
          story.
        </p>
      </div>
    </motion.button>
  );
};

const AddDeliveryManager = ({ onClose }: any) => {
  const mutation: any = useMutation('/manager/create/deliverymanager', {
    onMutate: () => {
      toast.loading('Creating new delivery manager...');
    },
    onError: ({ response }: any) => {
      toast.dismiss();
      const [error] = response.data.errors;
      toast.error(error.msg);
    },
    onSuccess: ({ data }: any) => {
      toast.dismiss();
      toast.success('New delivery manager created!');
      formik.resetForm();
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
      <TitleDialog />
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

const AddDriver = ({ onClose }: any) => {
  const [vehicle, setVehicle] = useState<any>(null);
  const mutation: any = useMutation('/manager/create/driver', {
    onMutate: () => {
      toast.loading('Creating new Driver...');
    },
    onError: ({ response }: any) => {
      toast.dismiss();
      const [error] = response.data.errors;
      toast.error(error.msg);
    },
    onSuccess: ({ data }: any) => {
      toast.dismiss();
      toast.success('New driver created!');
      formik.resetForm();
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
      mutation.mutate({ email, name, vehicle });
    },
  });

  return (
    <Modal onClose={onClose}>
      <TitleDialog />

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

        <div className='flex gap-8 justify-center mt-5'>
          {['car', 'small truck', 'big truck', 'planes'].map((type: any) => (
            <motion.button
              key={type}
              type='button'
              onClick={() => setVehicle(type)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.99 }}
              className={` ${
                vehicle === type
                  ? 'bg-sky-600 shadow-md ring-2'
                  : 'bg-sky-400 shadow-sm'
              } focus:ring-2 ring-offset-2 ring-offset-blue-100 ring-blue-500 flex justify-center items-center cursor-pointer w-24 capitalize h-12 rounded-md`}>
              <span className='text-center text-sm p-2 font-semibold text-white'>
                {type}
              </span>
            </motion.button>
          ))}
        </div>

        <button
          disabled={
            !(
              formik.isValid &&
              formik.dirty &&
              !formik.isSubmitting &&
              !!vehicle
            )
          }
          type='submit'
          className='btn-primary'>
          {' '}
          Got it, thanks!
        </button>
      </form>
    </Modal>
  );
};

const TitleDialog = () => {
  return (
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
