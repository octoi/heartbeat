import React, { useState } from 'react';
import { Header } from './Header';

export const HomePageContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </section>
  );
};
