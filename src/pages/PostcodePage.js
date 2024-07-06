import React from 'react';
import Postcode from '@actbase/react-daum-postcode';

const PostcodePage = () => (
  <Postcode
    style={{flex: 1, width: '100%', zIndex: 999}}
    jsOptions={{animation: true}}
    onSelected={data => alert(JSON.stringify(data))}
  />
);

export default PostcodePage;
