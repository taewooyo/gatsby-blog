import React, { createRef, useEffect, useRef } from 'react';

import { getValueFromLocalStorage } from '../../../src/utils/localStorage';
import * as S from './styled';

const src = 'https://utteranc.es/client.js';
const branch = 'main';

type UtterancesProps = {
  repo: string;
  path: string;
};

const Utterances: React.FC<UtterancesProps> = ({ repo, path }) => {
  const rootElm = createRef<HTMLDivElement>();
  const isUtterancesLoaded = useRef(false);

  useEffect(() => {
    if (!rootElm.current || isUtterancesLoaded.current) return;
    const theme = getValueFromLocalStorage('theme');

    const utterances = document.createElement('script');
    const utterancesConfig: { [key: string]: unknown } = {
      src,
      repo,
      branch,
      'theme': theme === 'dark' ? 'photon-dark' : 'github-light',
      'label': 'comment',
      'async': true,
      'issue-term': 'pathname',
      'crossorigin': 'anonymous',
    };

    Object.keys(utterancesConfig).forEach((configKey) => {
      utterances.setAttribute(configKey, utterancesConfig[configKey] as string);
    });
    rootElm.current.appendChild(utterances);
    isUtterancesLoaded.current = true;
  }, [repo, rootElm, path]);

  return <S.Wrapper className='utterances' ref={rootElm} />;
};

export default Utterances;