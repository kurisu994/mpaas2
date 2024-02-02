import { useEffect, type PropsWithChildren } from 'react';
import { useDidHide, useDidShow } from '@tarojs/taro';
import './app.scss';
import { ConfigProvider } from '@nutui/nutui-react-taro';

function App(props: PropsWithChildren) {
  // 可以使用所有的 React Hooks
  useEffect(() => {});

  // 对应 onShow
  useDidShow(() => {});

  // 对应 onHide
  useDidHide(() => {});

  return <ConfigProvider>{props.children}</ConfigProvider>;
}

export default App;
