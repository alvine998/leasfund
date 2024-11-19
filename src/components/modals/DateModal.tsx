import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Modals from '../Modal';
import normalize from 'react-native-normalize';
import {COLOR} from '../../utils/color';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import Input from '../Input';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';

interface Props {
  modal: any;
  setModal: any;
  selected: any;
  setSelected: any;
}

export default function DateModal({
  modal,
  setModal,
  selected,
  setSelected,
}: Props) {
  const [data, setData] = useState<any>();
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [markedDates, setMarkedDates] = useState({});

  const handleDayPress = (day: {dateString: string}) => {
    if (!startDate || (startDate && endDate)) {
      // Reset the selection and set the start date
      setStartDate(day.dateString);
      setEndDate(null);
      setMarkedDates({
        [day.dateString]: {
          startingDay: true,
          endingDay: true,
          color: '#50cebb',
          textColor: 'white',
        },
      });
    } else if (startDate && !endDate) {
      // Validate the range selection
      const startMoment = moment(startDate);
      const endMoment = moment(day.dateString);

      if (endMoment.isBefore(startMoment)) {
        // Invalid range; reset to the new start date
        setStartDate(day.dateString);
        setEndDate(null);
        setMarkedDates({
          [day.dateString]: {
            startingDay: true,
            endingDay: true,
            color: '#50cebb',
            textColor: 'white',
          },
        });
      } else {
        // Set the end date and mark the range
        setEndDate(day.dateString);
        const range = generateMarkedRange(startDate, day.dateString);
        if (Object.entries(range)?.length > 30) {
          return ToastAndroid.show(
            'Tidak boleh lebih dari 30 hari',
            ToastAndroid.SHORT,
          );
        }
        setMarkedDates(range);
      }
    }
  };

  const generateMarkedRange = (start: string, end: string) => {
    const range: any = {};
    const startMoment = moment(start);
    const endMoment = moment(end);

    let current = startMoment.clone();
    while (current.isSameOrBefore(endMoment)) {
      const date = current.format('YYYY-MM-DD');
      range[date] = {
        color: '#70d7c7',
        textColor: 'white',
      };

      if (current.isSame(startMoment, 'day')) {
        range[date].startingDay = true;
        range[date].color = '#50cebb';
      } else if (current.isSame(endMoment, 'day')) {
        range[date].endingDay = true;
        range[date].color = '#50cebb';
      }

      current.add(1, 'day');
    }

    return range;
  };

  return (
    <Modals modal={modal.open} setModal={setModal} isFull>
      <View
        style={{
          flexDirection: 'row',
          gap: normalize(80),
          alignItems: 'center',
        }}>
        <Text style={{color: COLOR.darkGrey, fontSize: normalize(20)}}>
          Tentukan Tanggal
        </Text>
        <TouchableOpacity
          onPress={() => {
            setModal({...modal, open: false});
          }}>
          <FA5Icon name="times" color={'black'} size={normalize(24)} />
        </TouchableOpacity>
      </View>

      <View style={{marginTop: normalize(40), width: '100%'}}>
        <Calendar
          markingType="period"
          markedDates={markedDates}
          onDayPress={handleDayPress}
          horizontal
        />
      </View>
    </Modals>
  );
}

const styles = StyleSheet.create({});
