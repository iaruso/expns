import React from 'react';
import Translator from '../../components/i18n/Translator.jsx';
import Check from '../icons/Check.jsx';

const FeatureHeader = ({ titlePath }) => {
  return (
    <div className='flex'>
      <div className='flex items-center'>
        <p className='text-base text-cod font-bold'><Translator path={titlePath}/></p>
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

const FeatureRow = ({ featurePath, checks }) => {
  return (
    <div className='flex'>
      <div className='flex items-center'>
        <p className='text-tiny text-shaft font-semibold'><Translator path={featurePath}/></p>
      </div>
      {checks.map((checkValue, index) => (
        <div key={index} className='flex items-center justify-center'>
          {typeof checkValue === 'boolean' ? (
            checkValue ? <Check className='w-6 h-6 fill-shaft'/> : ''
          ) : (
            <p className='text-base text-cod font-semibold'><Translator path={checkValue}/></p>
          )}
        </div>
      ))}
    </div>
  );
}

const CompareFeatures = () => {
  return (
    <div className='pricing-features-list flex flex-col relative'>
      <div className='flex h-[8rem] bg-white sticky top-[3rem]'>
        <div className='flex-1'></div>
        <div className='gap-2 !py-4 !px-2 flex flex-col items-center justify-center'>
          <p className='text-base text-cod font-bold'><Translator path='main.pricing.features.plans.starter.title'/></p>
          <p className='text-tiny text-cod font-semibold'><Translator path='main.pricing.features.plans.starter.price'/></p>
          <a className='h-6 text-sm text-white font-semibold flex justify-center items-center rounded py-1 px-2 cursor-pointer bg-royal hover:bg-persian duration-200'><Translator path='main.pricing.features.plans.starter.cta'/></a>
        </div>
        <div className='gap-2 !py-4 !px-2 flex flex-col items-center justify-center'>
          <p className='text-base text-cod font-bold'><Translator path='main.pricing.features.plans.pro.title'/></p>
          <p className='text-tiny text-cod font-semibold'><Translator path='main.pricing.features.plans.pro.price'/></p>
          <a className='h-6 text-sm text-white font-semibold flex justify-center items-center rounded py-1 px-2 cursor-pointer bg-cod hover:bg-black duration-200'><Translator path='main.pricing.features.plans.pro.cta'/></a>
        </div>
        <div className='gap-2 !py-4 !px-2 flex flex-col items-center justify-center'>
          <p className='text-base text-cod font-bold'><Translator path='main.pricing.features.plans.organization.title'/></p>
          <p className='text-tiny text-cod font-semibold'><Translator path='main.pricing.features.plans.organization.price'/></p>
          <a className='h-6 text-sm text-white font-semibold flex justify-center items-center rounded py-1 px-2 cursor-pointer bg-cod hover:bg-black duration-200'><Translator path='main.pricing.features.plans.organization.cta'/></a>
        </div>
      </div>
      <FeatureHeader titlePath='main.pricing.features.list.tracking.title'/>
      <FeatureRow featurePath='main.pricing.features.list.tracking.features.0' checks={[true, true, true]}/>
      <FeatureRow featurePath='main.pricing.features.list.tracking.features.1' checks={[true, true, true]}/>
      <FeatureRow featurePath='main.pricing.features.list.tracking.features.2' checks={['main.pricing.features.list.tracking.custom.0', true, true]}/>
      <FeatureRow featurePath='main.pricing.features.list.tracking.features.3' checks={[false, true, true]}/>
      <FeatureRow featurePath='main.pricing.features.list.tracking.features.4' checks={[false, true, true]}/>
      <FeatureRow featurePath='main.pricing.features.list.tracking.features.5' checks={[false, true, true]}/>
      <FeatureRow featurePath='main.pricing.features.list.tracking.features.6' checks={[false, true, true]}/>
      <FeatureRow featurePath='main.pricing.features.list.tracking.features.7' checks={[false, false, true]}/>
      <FeatureHeader titlePath='main.pricing.features.list.management.title'/>
      <FeatureRow featurePath='main.pricing.features.list.management.features.0' checks={[true, true, true]}/>
      <FeatureRow featurePath='main.pricing.features.list.management.features.1' checks={[false, true, true]}/>
      <FeatureRow featurePath='main.pricing.features.list.management.features.2' checks={[false, true, true]}/>
      <FeatureRow featurePath='main.pricing.features.list.management.features.3' checks={[false, false, true]}/>
      <FeatureHeader titlePath='main.pricing.features.list.security.title'/>
      <FeatureRow featurePath='main.pricing.features.list.security.features.0' checks={[true, true, true]}/>
      <FeatureRow featurePath='main.pricing.features.list.security.features.1' checks={[false, true, true]}/>
      <FeatureRow featurePath='main.pricing.features.list.security.features.2' checks={[false, true, true]}/>
      <FeatureRow featurePath='main.pricing.features.list.security.features.3' checks={[false, false, true]}/>
      <FeatureHeader titlePath='main.pricing.features.list.integration.title'/>
      <FeatureRow featurePath='main.pricing.features.list.integration.features.0' checks={[true, true, true]}/>
      <FeatureRow featurePath='main.pricing.features.list.integration.features.1' checks={[false, true, true]}/>
      <FeatureRow featurePath='main.pricing.features.list.integration.features.2' checks={[false, false, true]}/>
      <FeatureHeader titlePath='main.pricing.features.list.support.title'/>
      <FeatureRow featurePath='main.pricing.features.list.support.features.0' checks={[true, true, true]}/>
      <FeatureRow featurePath='main.pricing.features.list.support.features.1' checks={[false, true, true]}/>
      <FeatureRow featurePath='main.pricing.features.list.support.features.2' checks={[false, true, true]}/>
      <FeatureRow featurePath='main.pricing.features.list.support.features.3' checks={[false, false, true]}/>
      <FeatureRow featurePath='main.pricing.features.list.support.features.4' checks={[false, false, true]}/>
    </div>
  );
}

export default CompareFeatures;
