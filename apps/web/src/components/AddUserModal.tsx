import { useMutation } from 'hooks/useMutation';
import { useFormik } from 'formik';
import { AddMangerSchema } from 'lib/validation';
import { Modal, Input } from 'components/index';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

export const AddDeliveryManager = ({ onClose }: any) => {
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

export const AddDriver = ({ onClose }: any) => {
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
      setVehicle(null);
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
                  ? 'bg-blue-500 shadow-md ring-2 text-white'
                  : 'text-gray-800 shadow-sm'
              } focus:ring-2 outline-none ring-offset-2 border ring-offset-blue-100 ring-blue-500 flex justify-center items-center cursor-pointer w-24 capitalize h-12 rounded-md`}>
              <span className='text-center text-sm p-2 font-semibold'>
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

export const AddManager = ({ onClose }: any) => {
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

export const TitleDialog = () => {
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
