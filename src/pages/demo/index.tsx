import { Text, View } from '@tarojs/components';
import { Button, Cell, Empty } from '@nutui/nutui-react-taro';
import st from './index.module.scss';
import { useBearStore, useDemoStore } from '@/stores';

function Index() {
  const { bears, increase: beanIncrease } = useBearStore();
  const { counter, increase: counterIncrease } = useDemoStore();

  const testClick = (_event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    console.log('点击事件');
  };
  return (
    <View className={st.page}>
      <Cell title="我是标题" extra="描述文字" />
      <Cell title="我是标题" description="我是描述" extra="描述文字" />
      <Cell title="点击测试" onClick={(event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => testClick(event)} />
      <Cell title="圆角设置0" radius={0} />
      <Cell title="bears" extra={<Text>{bears}</Text>} onClick={() => beanIncrease()} />
      <Cell title="counter" extra={<Text>{counter}</Text>} onClick={() => counterIncrease(3)} />

      <Empty status="error" description="加载失败">
        <div style={{ marginTop: '10px' }}>
          <Button icon="refresh" type="primary" size="small">
            重试
          </Button>
        </div>
      </Empty>
    </View>
  );
}

export default Index;
