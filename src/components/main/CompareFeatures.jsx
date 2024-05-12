import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../app/Icon.jsx';

const FeatureHeader = ({ titlePath }) => {
  const { t } = useTranslation();
  return (
    <div className='flex'>
      <div className='flex items-center'>
        <p className='text-base text-cod font-bold'>{t(titlePath)}</p>
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

const FeatureRow = ({ featurePath, checks }) => {
  const { t } = useTranslation();
  return (
    <div className='flex'>
      <div className='flex items-center'>
        <p className='text-tiny text-shaft font-semibold'>{t(featurePath)}</p>
      </div>
      {checks.map((checkValue, index) => (
        <div key={index} className='flex items-center justify-center'>
          {typeof checkValue === 'boolean' ? (
            checkValue ? <Icon name='Check' className='w-6 h-6 fill-shaft'/> : ''
          ) : (
            <p className='text-base text-cod font-semibold'>{t(checkValue)}</p>
          )}
        </div>
      ))}
    </div>
  );
}

const CompareFeatures = () => {
  const { t } = useTranslation();
  return (
    <div className='pricing-features-list flex flex-col relative'>
      <div className='flex h-[8rem] mobile:h-[10rem] bg-white sticky top-[3rem]'>
        <div></div>
        <div className='gap-2 flex flex-col items-center justify-center'>
          <p className='text-base text-cod font-bold'>{t('main.pricing.features.plans.starter.title')}</p>
          <p className='text-tiny mobile:text-base text-cod font-semibold'>{t('main.pricing.features.plans.starter.price')}</p>
          <button className='h-6 mobile:h-8 text-sm mobile:text-tiny text-white font-semibold flex justify-center items-center rounded py-1 px-2 cursor-pointer bg-royal hover:bg-persian hover:duration-[0.4s] ease-in-out'>{t('main.pricing.features.plans.starter.cta')}</button>
        </div>
        <div className='gap-2 flex flex-col items-center justify-center'>
          <p className='text-base text-cod font-bold'>{t('main.pricing.features.plans.pro.title')}</p>
          <p className='text-tiny mobile:text-base text-cod font-semibold'>{t('main.pricing.features.plans.pro.price')}</p>
          <button className='h-6 mobile:h-8 text-sm mobile:text-tiny text-white font-semibold flex justify-center items-center rounded py-1 px-2 cursor-pointer bg-cod hover:bg-black hover:duration-[0.4s] ease-in-out'>{t('main.pricing.features.plans.pro.cta')}</button>
        </div>
        <div className='gap-2 flex flex-col items-center justify-center'>
          <p className='text-base text-cod font-bold'>{t('main.pricing.features.plans.organization.title')}</p>
          <p className='text-tiny mobile:text-base text-cod font-semibold'>{t('main.pricing.features.plans.organization.price')}</p>
          <button className='h-6 mobile:h-8 text-sm mobile:text-tiny text-white font-semibold flex justify-center items-center rounded py-1 px-2 cursor-pointer bg-cod hover:bg-black hover:duration-[0.4s] ease-in-out'>{t('main.pricing.features.plans.organization.cta')}</button>
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
