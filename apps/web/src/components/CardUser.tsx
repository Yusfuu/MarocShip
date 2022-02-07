import { motion } from 'framer-motion';

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

export const CardUser = ({ email, name, role }: any) => {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      variants={{ hidden: { opacity: 0, y: -20 }, show: { opacity: 1, y: 0 } }}
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
