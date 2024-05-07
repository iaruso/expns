import React from 'react';

const CategoryCard = ({ categoryName, total, icon }) => {
  return (
    <div className='min-h-32 min-w-32 rounded bg-royal flex flex-col justify-between p-4'>
      {icon}
      <div className='flex flex-col gap-2'>
        <h3 className='text-white text-tiny font-semibold'>{categoryName}</h3>
        <span className='text-white text-tiny font-bold tabular-nums'>{total}</span>
      </div>
    </div>
  );
};

export default CategoryCard;