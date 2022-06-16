import React from 'react';
import { EditForm } from './form';
import { Header } from './header';

export const EditPageContent: React.FC = () => {
  return (
    <section>
      <Header />
      <EditForm />
    </section>
  );
};
