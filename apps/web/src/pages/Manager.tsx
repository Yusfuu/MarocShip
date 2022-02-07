/* eslint-disable no-unused-vars */
import { FC, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  Navigation,
  Pagination,
  CardUser,
  AddDeliveryManager,
  AddDriver,
} from 'components/index';
import { motion } from 'framer-motion';
import { NavLink, Route, Routes } from 'react-router-dom';

type IAppProps = {};

const navigation = [
  {
    to: '/manager',
    name: 'Dashboard',
  },
  {
    to: 'drivers',
    name: 'Drivers',
  },
  {
    to: 'deliverymanager',
    name: 'Delivery manager',
  },
];

export const Manager: FC<IAppProps> = () => {
  return (
    <>
      <Navigation>
        {navigation.map((item) => (
          <NavLink
            key={item.to}
            end
            to={item.to}
            className={({ isActive }) =>
              (isActive
                ? 'text-white bg-gray-900'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white') +
              ' rounded-md px-3 py-2 text-sm font-medium'
            }>
            {item.name}
          </NavLink>
        ))}
      </Navigation>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path='/deliverymanager' element={<Deliverymanager />} />
        <Route path='/drivers' element={<Drivers />} />
      </Routes>
    </>
  );
};

const Drivers = () => {
  return (
    <Pagination uri='/manager/drivers' keyName='drivers'>
      {({ data, isLoading }: any) => {
        if (isLoading) {
          return <h1>Loading</h1>;
        }

        return (
          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            initial='hidden'
            animate='show'
            className='bg-white py-6 sm:py-8 lg:py-12'>
            <div className='max-w-screen-xl px-4 md:px-8 mx-auto'>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8'>
                {data?.drivers?.map((item: any) => (
                  <CardUser key={item._id} {...item} role='driver' />
                ))}
              </div>
            </div>
          </motion.div>
        );
      }}
    </Pagination>
  );
};

const Deliverymanager = () => {
  return (
    <Pagination uri='/manager/deliverymanagers' keyName='drivers'>
      {({ data, isLoading }: any) => {
        if (isLoading) {
          return <h1>Loading</h1>;
        }

        return (
          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            initial='hidden'
            animate='show'
            className='bg-white py-6 sm:py-8 lg:py-12'>
            <div className='max-w-screen-xl px-4 md:px-8 mx-auto'>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8'>
                {data?.deliverymanagers?.map((item: any) => (
                  <CardUser key={item._id} {...item} role='delivery manager' />
                ))}
              </div>
            </div>
          </motion.div>
        );
      }}
    </Pagination>
  );
};

export const Dashboard = () => {
  const [isVisible, setVisibleTo] = useState<any>(null);
  return (
    <div className='flex items-stretch w-full gap-10 pb-10 mt-8 p-5  sm:mt-16'>
      <Toaster />

      <DashboardCard
        title='Create Delivery Manager'
        bg='bg-purple-500'
        onClick={() => setVisibleTo('delivery')}
      />
      <DashboardCard
        title='Create Driver'
        bg='bg-blue-500'
        onClick={() => setVisibleTo('driver')}
      />
      {isVisible === 'delivery' && (
        <AddDeliveryManager onClose={() => setVisibleTo(null)} />
      )}
      {isVisible === 'driver' && (
        <AddDriver onClose={() => setVisibleTo(null)} />
      )}
    </div>
  );
};

const DashboardCard = ({ title, onClick, bg }: any) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.99 }}
      className={`cursor-pointer min-h-full relative text-left select-none  shadow-lg rounded-xl ${bg}`}>
      <div className='py-8 text-white  border-t-0  border-yellow-200 px-7 rounded-xl'>
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
