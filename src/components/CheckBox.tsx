import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors';

interface Props extends TouchableOpacityProps {
  title: String
  checked?: boolean
}

export function CheckBox({ title, checked = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className='flex-row items-center mt-3'
      {...rest}
    >
      {
        checked
          ?
          <View className='h-8 w-8 bg-green-500 rounded-lg items-center justify-center'>
            <Feather
              name='check'
              size={20}
              color={colors.white}
            />
          </View>
          :
          <View className='h-8 w-8 bg-zinc-900 rounded-lg' />
      }

      <Text className='ml-3 text-white text-base font-semibold'>
        {title}
      </Text>

    </TouchableOpacity>
  )
}