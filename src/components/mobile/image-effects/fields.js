import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Slider, Text } from 'react-native';

class Fields extends Component {
  onChange(value, id) {
    this.props.updateValue(value.toFixed(1), id);
  }

  render() {
    return (
      <View style={styles.container}>
        {fields.map((field, i) => (
          <View style={styles.containerField} key={i}>
            <TouchableOpacity style={styles.name}>
              <Text style={styles.title}>{field.name}</Text>
            </TouchableOpacity>
            <Slider
              style={styles.slider}
              minimumValue={field.min}
              maximumValue={field.max}
              step={field.step || 0.01}
              value={field.currentValue}
              onValueChange={value => this.onChange(value, field.id)}
            />
          </View>
        ))}
      </View>
    );
  }
}

export default Fields;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    flex: 1
  },
  slider: {
    flex: 3
  },
  value: {
    flex: 1
  }
});

const fields = [
  {
    id: 'contrast',
    name: 'Contraste',
    min: 0,
    max: 4,
    step: 0.1,
    currentValue: 1
  },
  {
    id: 'brightness',
    name: 'Brillo',
    min: 0,
    max: 4,
    step: 0.1,
    currentValue: 1
  },
  {
    id: 'saturation',
    name: 'Saturación',
    min: 0,
    max: 10,
    step: 0.1,
    currentValue: 1
  }
];
