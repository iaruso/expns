import React from 'react';
import Translator from '../../components/i18n/Translator.jsx';

const PricingPlanCard = ({ titlePath, subtitlePath, featuresPath, ctaPath, ctaBgColor, ctaBgHover }) => {
  return (
    <div className='flex flex-col gap-2 p-4 w-full h-full rounded-lg border-[0.05rem] border-gallery'>
      <h4 className='text-base text-cod font-bold'><Translator path={titlePath}/></h4>
      <p className='two-lines h-[2.5rem] text-tiny text-cod font-semibold'><Translator path={subtitlePath}/></p>
      <ul className='text-sm text-shaft font-semibold list-disc list-inside p-2 gap-2 flex-1'>
        {featuresPath.map((featurePath, index) => (
          <li key={index}><Translator path={featurePath}/></li>	
        ))}
      </ul>
      <a className={`w-full h-8 text-sm text-white font-semibold flex justify-center items-center rounded py-1 px-2 cursor-pointer bg-${ctaBgColor} hover:bg-${ctaBgHover} duration-200`}><Translator path={ctaPath}/></a>
    </div>
  );
}

const PricingCards = () => {
  return (
    <div className='flex gap-8'>
      <PricingPlanCard
        titlePath='main.pricing.plans.starter.title'
        subtitlePath='main.pricing.plans.starter.subtitle'
        featuresPath={[
          'main.pricing.plans.starter.features.0',
          'main.pricing.plans.starter.features.1',
          'main.pricing.plans.starter.features.2',
          'main.pricing.plans.starter.features.3'
        ]}
        ctaPath='main.pricing.plans.starter.cta'
        ctaBgColor='royal'
        ctaBgHover='persian'
      />
      <PricingPlanCard
        titlePath='main.pricing.plans.pro.title'
        subtitlePath='main.pricing.plans.pro.subtitle'
        featuresPath={[
          'main.pricing.plans.pro.features.0',
          'main.pricing.plans.pro.features.1',
          'main.pricing.plans.pro.features.2',
          'main.pricing.plans.pro.features.3',
          'main.pricing.plans.pro.features.4'
        ]}
        ctaPath='main.pricing.plans.pro.cta'
        ctaBgColor='cod'
        ctaBgHover='black'
      />
      <PricingPlanCard
        titlePath='main.pricing.plans.organization.title'
        subtitlePath='main.pricing.plans.organization.subtitle'
        featuresPath={[
          'main.pricing.plans.organization.features.0',
          'main.pricing.plans.organization.features.1',
          'main.pricing.plans.organization.features.2',
          'main.pricing.plans.organization.features.3',
          'main.pricing.plans.organization.features.4'
        ]}
        ctaPath='main.pricing.plans.organization.cta'
        ctaBgColor='cod'
        ctaBgHover='black'
      />
    </div>
  );
}

export default PricingCards;
