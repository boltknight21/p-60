import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import db from '../config';

export default class Class extends React.Component {
  constructor() {
    super();
    this.state = {
      roll: [],
      numberPresent: 0,
    };
  }
  componentDidMount() {
    this.getStudents(); 
  }
  renderTable = () => {
    return this.state.roll.map((student, index) => {
      const { id, status } = student;
      return (
        <tr key={id} style={{ backgroundColor: 'pink', fontSize: 22 }}>
          <td>{id}:</td>
          <td>{status}</td>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              marginRight: 200,
              alignSelf: 'left',
            }}></View>
        </tr>
      );
    });
  };
  countPresent = () => {
    var currentRoll = this.state.roll;
    var numberPresent = 0;
    for (var j = 0; j < currentRoll.length; j++) {
      if (currentRoll[j].status == 'Present') {
        numberPresent++;
      }
    }
    this.setState({
      numberPresent: numberPresent,
    });
  };
  countAbsent = () => {
    var currentRoll = this.state.roll;
    var numberAbsent = 0;
    for (var j = 0; j < currentRoll.length; j++) {
      if (currentRoll[j].status == 'Absent') {
        numberAbsent++;
      }
    }
    this.setState({
      numberAbsent: numberAbsent,
    });
  };
  getStudents = async () => {
    var roll = [];
    var numberOfStudents = 10;
    for (var i = 1; i <= numberOfStudents; i++) {
      await db.ref('roll/' + i).on('value', function (status) {
        roll.push({ id: i, status: status.val() });
      });
    }
    await this.setState({
      roll: roll,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            backgroundColor: 'orange',
          }}>
          Student Atendance
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 25,
            backgroundColor: 'purple',
          }}>
          Class XI
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.getStudents();
            this.countPresent();
            this.countAbsent();
          }}
          style={styles.button}>
          <Text> Update </Text>
        </TouchableOpacity>
        <tbody style={{ alignSelf: 'left' }}>{this.renderTable()}</tbody>
        <Text
          style={[styles.text]}> 
          Number Present: {this.state.numberPresent}
        </Text>
        <Text
          style={[styles.text]}>  
          Number Absent: {this.state.numberAbsent}
        </Text>
      </View> 
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f',
    padding: 8,
  },
  button: {
    borderColor: ' blue',
    borderWidth: 5,
    margin: 5,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: 140,
    height: 50,
  },
   text: {
    borderColor: ' blue',
    borderWidth: 5,
    margin: 5,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: 140,
    height: 50,
  },
});
