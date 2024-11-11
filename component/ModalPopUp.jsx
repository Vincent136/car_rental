import { View, Modal } from "react-native";
import React from "react";

export default function ModalPopup({ visible, children }) {
  return (
    <Modal 
    animationType="fade" 
    transparent={true} 
    visible={visible}>
      <View style={{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
      }}>
        <View style={{
            backgroundColor: '#fff',
            width: '80%',
            padding: 20,
            borderRadius: 10
        }}>
            {children}
        </View>
      </View>
    </Modal>
  );
}