import Taro from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import './index.scss';

export default function Index() {
  return (
    <View className="index">
      <Text>Hello world!</Text>
      <Button
        onClick={() => {
          Taro.navigateToMiniProgram({
            appId: '7215306148277821', //收藏有礼小程序的 appid，固定值请勿修改
            path: 'pages/index/index?originAppId=1721530614827782', //收藏有礼跳转地址和参数
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
    </View>
  );
}
