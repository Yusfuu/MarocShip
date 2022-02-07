import { FC, useCallback, useState } from 'react';
import { useQuery } from 'react-query';

type IAppProps = {
  uri: string;
  keyName: string;
  children: any;
};

export const Pagination: FC<IAppProps> = ({ uri, keyName, children }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProjects = useCallback(
    async (page = 0) => {
      const res = await fetch(`http://localhost:3000/api${uri}?page=${page}`);
      return await res.json();
    },
    [uri]
  );

  const query = useQuery(
    [keyName, currentPage],
    () => fetchProjects(currentPage),
    { keepPreviousData: true }
  );

  return (
    <>
      {children(query)}
      <PaginationIndicator
        currentPage={currentPage}
        onClickPage={setCurrentPage}
        pageOptions={query?.data?.pageOptions}
      />
    </>
  );
};

const PaginationIndicator = ({
  pageOptions,
  onClickPage,
  currentPage,
}: any) => {
  return (
    <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
      <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing <span className='font-medium'>1</span> to{' '}
            <span className='font-medium'>{pageOptions?.length}</span> of{' '}
            <span className='font-medium'>{pageOptions?.collections}</span>{' '}
            results
          </p>
        </div>
        <div>
          <nav
            className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
            aria-label='Pagination'>
            <button
              disabled={pageOptions?.page === 0}
              onClick={() => onClickPage((prev: any) => prev - 1)}
              className='button-pagination'>
              Previous
            </button>

            {Array(pageOptions?.pages)
              .fill(0)
              .map((_, index) => (
                <button
                  onClick={() => onClickPage(index + 1)}
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
              disabled={!pageOptions?.hasNext}
              className='button-pagination rounded-none rounded-r-md'>
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
