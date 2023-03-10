import { useState, useEffect } from 'react';
import { ScrollView, View, Text, Alert, TouchableOpacity } from 'react-native';
import { BackButton } from '../components/BackButton';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import { ProgressBar } from '../components/ProgressBar';
import { CheckBox } from '../components/CheckBox';
import { api } from '../lib/axios';
import { Loading } from '../components/Loading';
import { HabitsEmpty } from '../components/HabitsEmpty';
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors';
import clsx from 'clsx';


interface Params {
  date: string
}

interface DayInfoProps {
  completed: string[];
  possibleHabits: {
    id: string;
    title: string;
  }[]
}

export function Habit() {

  const route = useRoute();
  const { date } = route.params as Params;
  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);
  const [possibleHabits, setPossibibleHabits] = useState<string[]>([]);
  const [deleted, setDeleted] = useState(false)

  const parsedDate = dayjs(date);
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date())
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  async function fetchHabits() {
    try {
      setLoading(true)
      const response = await api.get('/day', { params: { date: date } })
      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits);
      setPossibibleHabits(response.data.possibleHabits);
      setDeleted(false)
    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Não foi possível carregar as informações dos hábitos')
    } finally {
      setLoading(false)
    }
  }

  async function deleteHabits(habitTitle: string, habitId: string) {

    try {

      //Delete Habit Route
      await api.delete(`/habits/${habitId}/delete`)
      setPossibibleHabits((prevState) => [...prevState, habitId])

      Alert.alert('OK', `hábito ${habitTitle} deletado`)
      setDeleted(true)

    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Não foi possível deletar o hábito')
      setDeleted(false)
    }

  }

  async function handleToggleHabtis(habitId: string) {
    try {

      await api.patch(`/habits/${habitId}/toggle`)

      if (completedHabits.includes(habitId)) {
        setCompletedHabits((prevState) =>
          prevState.filter((habit) =>
            habit !== habitId))
      } else {
        setCompletedHabits((prevState) => [...prevState, habitId])
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Não foi possível atualizar o status do hábito')
    }
  }

  function progressCalculation() {
    return Math.floor(((completedHabits.length * 100) / possibleHabits.length))
  }

  useEffect(() => {
    fetchHabits()
  }, [deleted])

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className='mt-6 font-semibold text-zinc-400 lowercase'>
          {dayOfWeek}
        </Text>

        <Text className='text-white font-extrabold text-3xl'>
          {dayAndMonth}
        </Text>

        <ProgressBar progress={progressCalculation()} />

        {
          isDateInPast && (
            <Text className='text-white mt-10 text-center'>
              Você não pode editar hábitos de uma data passada.
            </Text>
          )
        }

        <View className={clsx('mt-6',
          { ['opacity-40']: isDateInPast }
        )}>

          {
            dayInfo?.possibleHabits.length ?
              dayInfo?.possibleHabits.map((habit) => (
                <View className='flex-row items-center mt-3'>
                  <CheckBox
                    key={habit.id}
                    title={habit.title}
                    checked={completedHabits.includes(habit.id)}
                    disabled={isDateInPast}
                    onPress={() => handleToggleHabtis(habit.id)}
                  />
                  <TouchableOpacity
                    key={`${habit.id}-delete`}
                    activeOpacity={0.7}
                    className='ml-auto'
                    onPress={() => deleteHabits(habit.title, habit.id)}
                  >
                    <Feather
                      name='trash'
                      color={colors.red[700]}
                      size={20}
                    />
                  </TouchableOpacity>

                </View>
              ))
              : (<HabitsEmpty />)
          }

        </View>



      </ScrollView>


    </View>
  )
}