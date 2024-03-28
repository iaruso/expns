import { Trans } from 'react-i18next';

const Translator = ({ path }) => {
  return <Trans i18nKey={path} />;
}

export default Translator;