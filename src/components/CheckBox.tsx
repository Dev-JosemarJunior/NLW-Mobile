import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  Alert
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors';
import Animated, {FlipInXDown, FlipOutXUp} from 'react-native-reanimated';


interface Props extends TouchableOpacityProps {
  title: String
  checked?: boolean
}

export function CheckBox({ title, checked = false, ...rest }: Props) {

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className='flex-row items-center'
      {...rest}
    >
      {
        checked
          ?
          <Animated.View
            className='h-8 w-8 bg-green-500 rounded-lg items-center justify-center'
            entering={FlipInXDown}
            exiting={FlipOutXUp}
          >
            <Feather
              name='check'
              size={20}
              color={colors.white}
            />
          </Animated.View>
          :
          <View className='h-8 w-8 bg-zinc-900 rounded-lg' />
      }

      <Text className='ml-3 text-white text-base font-semibold'>
        {title}
      </Text>

    </TouchableOpacity>
  )
}