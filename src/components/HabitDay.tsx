import { View, TouchableOpacity, TouchableOpacityProps, Text, Dimensions } from "react-native"
import dayjs from "dayjs";
const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;
export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);

interface Props extends TouchableOpacityProps {

}

export function HabitDay({ ...rest }: Props) {
  
  // const parsedDate = dayjs(title.title);
  // const dayOfMounth = parsedDate.format('DD');
  
  return (
    <TouchableOpacity
      className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 justify-center items-center'
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.5}
      {...rest}
    >
      <Text className='text-zinc-600 txt-1/3' >
        12
      </Text>
    </TouchableOpacity>
  )
}