import React from 'react';
import Translator from '../../components/i18n/Translator.jsx';

const HighlightCard = ({ highlightId, titlePath, subtitlePath }) => {
  return (
    <div className={`highlight-${highlightId} h-24 flex flex-col justify-center items-center rounded-lg border-[0.05rem] border-gallery p-4`}>
      <p className='text-[1.25rem] text-cod font-semibold'><Translator path={titlePath}/></p>
      <p className='text-tiny text-shaft font-semibold text-center'><Translator path={subtitlePath}/></p>
    </div>
  );
}

const Highlights = () => {
  return (
    <div className='about-highlights flex flex-col gap-8 parent lg:grid grid-cols-6 grid-rows-2'>
      <HighlightCard highlightId={1} titlePath={'main.about.cards.savings.title'} subtitlePath={'main.about.cards.savings.subtitle'}/>
      <HighlightCard highlightId={2} titlePath={'main.about.cards.time.title'} subtitlePath={'main.about.cards.time.subtitle'}/>
      <HighlightCard highlightId={3} titlePath={'main.about.cards.spending.title'} subtitlePath={'main.about.cards.spending.subtitle'}/>
      <HighlightCard highlightId={4} titlePath={'main.about.cards.categorization.title'} subtitlePath={'main.about.cards.categorization.subtitle'}/>
      <HighlightCard highlightId={5} titlePath={'main.about.cards.data.title'} subtitlePath={'main.about.cards.data.subtitle'}/>
    </div>
  );
}

export default Highlights;
