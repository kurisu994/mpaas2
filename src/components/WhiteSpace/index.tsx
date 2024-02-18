import { View } from '@tarojs/components';

interface Props {
  backgroundColor?: string;
  height?: number;
}

export default function WhiteSpace(props: Props) {
  const { backgroundColor, height = 10 } = props;
  const style: any = {};
  if (backgroundColor) {
    style.backgroundColor = backgroundColor;
  }
  if (height) {
    style.height = `${height}Px`;
  }
  return <View style={style} />;
}
