import React from 'react';
import Toast from 'react-native-toast-message';
import ToastConfig from './ToastConfig';

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const toastConfig = ToastConfig();

  return (
    <>
      {children}
      <Toast config={toastConfig} />
    </>
  );
};

export default ToastProvider;
