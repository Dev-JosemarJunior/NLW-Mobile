import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export function HabitsEmpty() {
  const { reset } = useNavigation();
  const url = 'new'
  return (
    <Text
      className='text-zinc-400 text-base'
    >
      Você ainda não está monitorando nenhum hábito {' '}
      <Text
        className='text-violet-400 text-base underline active:text-violet-500'
        onPress={() => reset({
          index: 0,
          routes: [
            { name: 'home' },
            { name: 'new' }
          ],
        })}
      >
        comece cadastrando um .
      </Text>
    </Text>
  )
}
