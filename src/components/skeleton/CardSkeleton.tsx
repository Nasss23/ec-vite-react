type Props = {
  className?: string
}

const CardSkeleton = ({ className }: Props) => {
  return (
    <div role='status' className='max-w-sm animate-pulse'>
      <div className={`px-2 py-3 bg-white border rounded-lg lg:w-auto ${className}`}>
        <div className='space-y-3'>
          <div className='h-[240px] flex items-center justify-center bg-gray-200 '>
            <svg
              className='text-gray-200 w-7 h-7 dark:text-gray-500'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 20 18'
            >
              <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
            </svg>
          </div>
          <div className='space-y-2'>
            <div className='space-y-1'>
              <p className='h-2.5 bg-gray-200 rounded-full'></p>
              <p className='h-2.5 bg-gray-200 rounded-full'></p>
            </div>
            <div className='flex items-center justify-between'>
              <span className='h-2.5 bg-gray-200 w-28 rounded-full'></span>
              <span className='h-2.5 bg-gray-200 w-16  rounded-full'></span>
            </div>
          </div>
          <div className='w-full h-8 bg-gray-200 rounded-lg'></div>
        </div>
      </div>
    </div>
  )
}

export default CardSkeleton
