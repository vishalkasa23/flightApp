import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';

const CustomDropdown = ({ items, placeholder, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (item) => {
    setModalVisible(false);
    onSelect(item);
  };

  const clearFilter = () => {
    setModalVisible(false);
    onSelect(null);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={{ padding: 10, borderWidth: 1, borderRadius: 5, borderColor: '#ccc' }}>
          <Text>{placeholder}</Text>
        </View>
      </TouchableOpacity>

      <Modal transparent={true} animationType="slide" visible={modalVisible}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setModalVisible(false)} />
          <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.label}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelect(item)}>
                  <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                    <Text>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={clearFilter}>
              <View style={{ padding: 10, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <Text>Clear Filter</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomDropdown;
