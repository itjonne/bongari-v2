import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import wikipedia from '../services/wikipedia';
import './WikipediaInfo.css';

const changeLocalToWiki = (html) => {
  const newHtml = html.replace(/href="(.+?)"/g, (match, $1) => {
    if ($1.startsWith('#') || $1.startsWith('http')) return;
    return `href="https://fi.wikipedia.org${$1}" target="_blank"`;
  });

  return newHtml;
};

const WikipediaInfo = ({ object, handleScroll }) => {
  const [html, setHtml] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await wikipedia.getTitle(object.name);
      if (!response) {
        console.log('Couldnt fetch data');
        return setHtml(`
          <html>
            <div>Ongelmia wikipedian kanssa</div>
          </html>
          `);
      }
      const newHtml = changeLocalToWiki(response);

      if (response) {
        setHtml(newHtml);
      }
    };
    fetchData();
  }, [object]);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflowY: 'scroll',
      }}>
      {html ? (
        <Box onScroll={handleScroll} dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <Box>Ladataan tietoja..</Box>
      )}
    </Container>
  );
};

export default WikipediaInfo;
