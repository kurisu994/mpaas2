import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { Button, Cell } from '@nutui/nutui-react-taro';
import st from './index.module.scss';
import { useBearStore, useDemoStore } from '@/stores';

function Index() {
  const { bears, increase } = useBearStore();
  const { counter, decrement } = useDemoStore();

  const marginStyle = { margin: 8 };
  return (
    <View className={st.page}>
      <Text>Hello world!</Text>
      <Text>{`bears is: ${bears}`}</Text>
      <Text>{`demo count is: ${counter}`}</Text>
      <Button
        style={marginStyle}
        type="primary"
        shape="square"
        onClick={() => {
          Taro.navigateToMiniProgram({
            appId: '7215306148277821', // 小程序的 appid，固定值请勿修改
            path: 'page/tabBar/component/index?originAppId=1721530614827782', //跳转地址和参数
            success: (res) => {
              // 跳转成功
              console.log(JSON.stringify(res));
            },
            fail: (error) => {
              // 跳转失败
              console.log(JSON.stringify(error));
            },
          });
        }}
      >
        跳转另一个小程序
      </Button>
      <Cell
        title="函数调用打开dialog"
        onClick={() => {
          Taro.showModal({
            title: '提示',
            content: '这是一个模态弹窗',
            success: (res) => {
              if (res.confirm) {
                console.log('用户点击确定');
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            },
          });
        }}
      />

      <View>
        <Button type="primary" style={marginStyle} onClick={() => Taro.navigateTo({ url: '/pages/demo/index' })}>
          跳转下页
        </Button>
        <Button type="info" style={marginStyle} onClick={() => increase()}>
          add bears
        </Button>
        <Button type="default" style={marginStyle} onClick={() => decrement()}>
          demo decrement
        </Button>
        <Button type="danger" style={marginStyle}>
          危险按钮
        </Button>
        <Button type="warning" style={marginStyle}>
          警告按钮
        </Button>
        <Button type="success" style={marginStyle}>
          成功按钮
        </Button>
      </View>
    </View>
  );
}

export default Index;
