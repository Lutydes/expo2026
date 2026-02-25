import React from 'react';
import Link from 'next/link';
import { ExpoTech2026 } from '../page';

export const metadata = {
  title: 'UNIFECAF - Teste Layout Defesa Cibernética',
};

export default function TestLayout() {
  return (
    // render original homepage component with cyberpunk theme
    <ExpoTech2026 darkCyberpunk />
  );
}
