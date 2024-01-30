import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { Button } from '@nutui/nutui-react-taro';
import st from './index.module.scss';

export default function Index() {
  const marginStyle = { margin: 8 };
  return (
    <View className={st.page}>
      <Text>Hello world!</Text>
      <Button
        style={marginStyle}
        type="primary"
        shape="square"
        onClick={() => {
          Taro.navigateToMiniProgram({
            appId: '7215306148277821', //收藏有礼小程序的 appid，固定值请勿修改
            path: 'page/tabBar/component/index?originAppId=1721530614827782', //收藏有礼跳转地址和参数
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
        跳转
      </Button>

      <View>
        <Button type="primary" shape="round" style={marginStyle}>
          主要按钮
        </Button>
        <Button type="info" style={marginStyle}>
          信息按钮
        </Button>
        <Button type="default" style={marginStyle}>
          默认按钮
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
