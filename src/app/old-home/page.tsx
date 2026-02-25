import React from 'react';

export const metadata = {
  title: 'UNIFECAF - Home Original',
};

// simplesmente exporta o mesmo conteúdo atual de page.tsx para estudo
// copiar manualmente? vamos importar o componente original

import OriginalHome from '../page';

export default function OldHomeWrapper() {
  return <OriginalHome />;
}
