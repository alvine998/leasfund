import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {PropsWithChildren, useEffect, useRef, useState} from 'react';
import normalize from 'react-native-normalize';

type FadeInViewProps = PropsWithChildren<{style: ViewStyle}>;

const FadeInView: React.FC<FadeInViewProps> = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

export default function Intro({navigation}: any) {
  const [page, setPage] = useState<number>(0);
  const screenWidth = Dimensions.get('window').width;
  const data = [
    {
      id: 1,
      image: require('../../assets/images/welcome.jpg'),
      text: 'Selamat Datang di Aplikasi LeaseFund',
    },
    {
      id: 2,
      image: require('../../assets/images/intro2.jpg'),
      text: 'Temukan Kemudahan Pengajuan Hanya Dalam Genggaman',
    },
    {
      id: 3,
      image: require('../../assets/images/intro3.jpg'),
      text: 'Dapatkan Banyak Poin & Reward yang Menanti',
    },
  ];
  const slideAnim = useRef(new Animated.Value(0)).current; // Ref for the animated value

  // Function to move to the next slide
  const nextSlide = () => {
    if (page < data.length - 1) {
      setPage(page + 1);
      Animated.timing(slideAnim, {
        toValue: -screenWidth * (page + 1), // Slide to the next page
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  // Function to move to the previous slide
  const previousSlide = () => {
    if (page > 0) {
      setPage(page - 1);
      Animated.timing(slideAnim, {
        toValue: -screenWidth * (page - 1), // Move to the previous page
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.view}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <FadeInView
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {data[page].image && (
            <Image
              source={data[page].image}
              style={{
                width: normalize(250),
                height: normalize(page == 1 ? 250 : 200),
              }}
            />
          )}
          <View
            style={{
              paddingHorizontal: normalize(20),
              marginTop: normalize(20),
            }}>
            <Text style={styles.title}>{data[page]?.text}</Text>
          </View>
        </FadeInView>
      </View>
      <View style={styles.rowButton}>
        {page !== 0 ? (
          <TouchableOpacity style={styles.circleButton} onPress={previousSlide}>
            <Text style={styles.iconize}>{'<'}</Text>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}

        <TouchableOpacity
          style={styles.circleButton}
          onPress={
            page == data.length
              ? () => {
                  navigation.navigate('Login');
                }
              : nextSlide
          }>
          <Text style={styles.iconize}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: normalize(18),
    color: 'black',
  },
  circleButton: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: 50,
    backgroundColor: '#dfdfdf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconize: {
    fontSize: normalize(30),
    fontWeight: 'bold',
    color: 'black',
  },
  rowButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(100),
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: normalize(40),
  },
});
