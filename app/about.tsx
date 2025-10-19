import {StyleSheet, View, Text} from 'react-native';


export default function About() {
  return (
      <View style={styles.container}>
          <Text style={styles.text}>
              Hello, World!
          </Text>
      </View>

  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
    },
});
