import React, { lazy, Suspense } from 'react';

const Icon = ({ name, className }) => {
  const IconComponent = lazy(() => import(`../icons/${name}.jsx`).then(module => ({ default: module.default })));

  return (
    <Suspense fallback={<div></div>}>
      <IconComponent className={className} />
    </Suspense>
  );
};

export default Icon;
