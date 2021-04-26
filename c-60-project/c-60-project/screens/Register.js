import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import db from '../config';

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      roll: [],
    };
  }
  componentDidMount() {
    this.getStudents();
  }
  updateTable = () => {
    return this.state.roll.map((student, index) => {
      const { id, status } = student;
      return (
        <tr key={id} style={{ fontSize: 20}}>
          <td>{id}:</td>
          <View style={{ flexDirection: 'row', margin: 10, }}> 
            <TouchableOpacity 
              onPress={async () => {
                var students = await db.ref('roll/');
                await students.update({
                  [id]: ' Absent',
                });
              }}
              style={styles.absent}>
              <Text> Absent </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                var students = await db.ref('roll/');
                await students.update({
                  [id]: ' Present',
                });
              }}
              style={styles.present}>
              <Text> Present</Text>
            </TouchableOpacity>
          </View>
        </tr>
      );
    });
  };
  getStudents = async () => {
    var roll = [];
    var numberOfStudents = 7;
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
        <ScrollView>
        <Text style={{ textAlign: 'center', fontSize: 30,backgroundColor: 'orange' }}>
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
        <tbody style={{ alignSelf: 'center' }}>{this.updateTable()}</tbody>
        <TouchableOpacity onPress={this.getStudents} style={styles.button}>
          <Text>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Class')}
          style={styles.button}>
          <Text>View Register</Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
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
    width: 120,
    height: 50,
  },
   absent: {
    borderColor: ' blue',
    borderWidth: 5,
    margin: 5,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: 80,
    height: 50,
  },
   present: {
    borderColor: ' blue',
    borderWidth: 5,
    margin: 5,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: 80,
    height: 50,
  },
});
