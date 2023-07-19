import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import GlobalStyle from '../styles/GlobalStyle';
import * as S from './styled';
import Header from '../components/header';
import Footer from '../components/footer';

import './_reset.scss';
import './_markdown-style.scss';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          author {
            name
            social {
              github
            }
          }
        }
      }
    }
  `);
  const { title, author } = data.site.siteMetadata;

  return (
    <>
      <GlobalStyle />
      <S.Wrapper>
        <Header>{title}</Header>
        <S.Content>{children}</S.Content>
        <Footer author={author} />
      </S.Wrapper>
    </>
  );
};

export default Layout;