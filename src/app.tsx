import { useEffect, type PropsWithChildren } from 'react';
import { useDidHide, useDidShow } from '@tarojs/taro';
import './app.scss';

function App(props: PropsWithChildren) {
  // 可以使用所有的 React Hooks
  useEffect(() => {});

  // 对应 onShow
  useDidShow(() => {});

  // 对应 onHide
  useDidHide(() => {});

  return props.children;
}

export default App;
