'use client'

import { useEffect } from 'react';

const BootstrapClient = () => {
  useEffect(() => {
    // Bootstrap JavaScriptを動的にインポート
    if (typeof window !== 'undefined') {
      import('bootstrap/dist/js/bootstrap.bundle.min.js').catch(err => {
        console.error('Bootstrap JavaScript loading failed:', err);
      });
    }
  }, []);

  return null;
};

export default BootstrapClient; 