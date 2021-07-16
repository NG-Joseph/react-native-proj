import React, { useState } from "react";
import { View, StyleSheet, Platform, ScrollView } from "react-native";
import { Button, Input, Text, CheckBox } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ICitizenEntry } from "../interfaces/citizen-entry.interface";
import { createCitizenEntry, deleteCitizenEntry } from "../services/citizen-entry.service";
import { useNavigation } from "@react-navigation/native";
/**
 * Type for props to be passed by App when mounting AddEntry
 */



type Props = {
  createEntry: Function;
}
/**
 * Type for state variable
 */
type IState = {
  firstName: string;
  lastName: string;
  lga: string;
  stateOfOrigin: string;
  married: boolean;
  dateOfBirth: Date;
  bvn: string;
  phoneNumber: string;
  nextOfKinName: string;
};


 const AddEntry: React.FC<Props> = ({ createEntry}) => {


  // To remember color values
  const colors ={
    primary: "black",
    secondary: "#23cc8c",
    text: "white"
  }
  const navigation = useNavigation();
 
  const InitialState = {
    dateOfBirth: new Date(),
    firstName: "",
    lastName: "",
    lga: "",
    bvn: "",
    married: false,
    phoneNumber: "",
    nextOfKinName: "",
    stateOfOrigin: "",
  }

  // fetch citizens from api (copilot)
  const fetchCitizen = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/citizen");
      const citizens = await res.json();
      return citizens;
    } catch (e) {
      console.log(e);
    }
  }



 
  

  const [state, setState] = useState<IState>(InitialState);
  const [showDatePicker, setShowDatePicker] = useState(
    Platform.OS === "ios" ? true : false
  );


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
      
      
      <Text h3 style={styles.inputContainerStyle}>
        Register Citizen
      </Text>
      <Input
                  placeholderTextColor="grey"
                  inputStyle={{color:'white'}}
                  labelStyle={{color:'white'}}
        
        label="First Name"
        placeholder="Enter first name"
        
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={{ type: "font-awesome", name: "comment", color:"#23cc8c" }}
        onChangeText={(firstName) => setState({ ...state, firstName })}
        
      />
            <Input
                        placeholderTextColor="grey"
                        inputStyle={{color:'white'}}
                        labelStyle={{color:'white'}}

        label="Last Name"
        placeholder="Enter last name"
       
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={{ type: "font-awesome", name: "eye" , color: "#23cc8c" }}
        onChangeText={(lastName) => setState({ ...state, lastName })}
      />
      
      {/* Only show button below if the OS is not ios. IOS DateTimePicker is visible by default */}
      {Platform.OS !== "ios" && (
        <Button
          
          style={[styles.inputContainerStyle, ]}
          title="Select Date of Birth"
          onPress={() => {
            setShowDatePicker(true);
          }}
        />
      )}
      {showDatePicker && (
        <DateTimePicker
          style={styles.inputContainerStyle }
          value={state.dateOfBirth}
          mode={"date"}
          //is24Hour={true}
          display="default"
          onChange={(_event: any, selectedDate: any) => {

            setState({
              ...state,
              dateOfBirth: selectedDate
            
            });
            setShowDatePicker(Platform.OS === "ios" ? true : false);
          }}
        />
      )}
      <CheckBox
        title="Married?"
        containerStyle={[
          styles.inputContainerStyle,
          { marginTop: 10, borderColor: "black" },
        ]}
        checked={!state.married}
        onPress={() => {
          setState({ ...state, married: !state.married });
        }}
      />
      <Input
                  placeholderTextColor="grey"
                  inputStyle={{color:'white'}}
                  labelStyle={{color:'white'}}
        label="LGA"
        placeholder="local government"
       
        inputContainerStyle={[styles.inputContainerStyle ]}
        leftIcon={{ type: "font-awesome", name: "bank", color:"#23cc8c",  }}
        onChangeText={(lga) => setState({ ...state, lga })}
      />
      <Input
                  placeholderTextColor="grey"
                  inputStyle={{color:'white'}}
                  labelStyle={{color:'white'}}
        label="State of Origin"
        placeholder="state of origin"
        
        inputContainerStyle={[styles.inputContainerStyle ]}
        leftIcon={{ type: "font-awesome", name: "bank", color:"#23cc8c",  }}
        onChangeText={(stateOfOrigin) => setState({ ...state, stateOfOrigin })}
      />

      

      <Input
                  placeholderTextColor="grey"
                  inputStyle={{color:'white'}}
                  labelStyle={{color:'white'}}
        label="Phone"
        placeholder="e.g. 08012345678"
        keyboardType="numeric"
        inputContainerStyle={[styles.inputContainerStyle ]}
        leftIcon={{ type: "font-awesome", name: "phone", color:"#23cc8c",  }}
        onChangeText={(phoneNumber) => setState({ ...state, phoneNumber })}
      />


      
<Input
                    placeholderTextColor="grey"
                    inputStyle={{color:'white'}}
                    labelStyle={{color:'white'}}
        
        label="BVN"
        placeholder="Enter Bank Verification number"
        keyboardType="numeric"
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={{ type: "font-awesome", name: "bank", color:"#23cc8c" }}
        onChangeText={(bvn) => setState({ ...state, bvn })}
      />
      </ScrollView>
      <View style={{ flexDirection: "row", paddingBottom:45 }}>
        <Button
          style={[ { paddingRight: 1,  } ]}
          title="Submit"
          buttonStyle={{backgroundColor:"#23cc8c"}}
          onPress={() => {
            //call create which will also make the form disappear
             createEntry(state);
            navigation.navigate('Citizen List')    }}   
        />
        
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    
    color: 'black',
    
    
    marginTop: 70,
  },
  scrollView: {
    width: '100%',
    marginHorizontal: 20,
  },
  inputContainerStyle: {
    width: "100%",
    padding: 10,
    color:"white",
    backgroundColor: "black",
  },
});
export default AddEntry;
