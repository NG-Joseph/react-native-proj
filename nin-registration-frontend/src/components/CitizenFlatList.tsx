import "reflect-metadata";
import React, { useState } from "react";
import { Alert, FlatList, SafeAreaView, StyleSheet, View } from "react-native";

import { Badge, Button, ButtonGroup, Text } from "react-native-elements";

import {
  deleteCitizenEntry,
  getCitizenEntries,
} from "../services/citizen-entry.service";
import { ICitizenEntry, IState } from "../interfaces/citizen-entry.interface";

import { Icon } from "react-native-elements/dist/icons/Icon";

export const CitizenFlatList: React.FC = () => {
  const pushToApi = (item: ICitizenEntry) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: item.firstName,
        lastName: item.lastName,
        lga: item.lga,
        stateOfOrigin: item.stateOfOrigin,
        nin: item.nin,
        dateOfBirth: item.dateOfBirth,
        bvn: item.bvn,
        phoneNumber: item.phoneNumber,
        nextOfKinName: item.nextOfKinName,
      }),
    };
    fetch("http://localhost:3000/citizens", requestOptions)
      .then((response) => {
        response.json();
        if (response.ok) {
          Alert.alert("Successful", "Citizen has been added successfully", [
            { text: "OK", onPress: () => {} },
          ]);
        }
      })
      .catch((error) => {
        Alert.alert("Failed", `Citizen could not be added: ${error}`, [
          {
            text: "Try Again",
            onPress: () => {
              pushToApi(item);
            },
          }, // if Try again button is pressed, try function again.
          { text: "Cancel", onPress: () => {}, style: "cancel" },
        ]);
        console.log(error);
      });

    // function to post data to api
  };

  const pushToApiWithoutAlert = (item: ICitizenEntry) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: item.firstName,
        lastName: item.lastName,
        lga: item.lga,
        stateOfOrigin: item.stateOfOrigin,
        nin: item.nin,
        dateOfBirth: item.dateOfBirth,
        bvn: item.bvn,
        phoneNumber: item.phoneNumber,
        nextOfKinName: item.nextOfKinName,
      }),
    };
    fetch("http://localhost:3000/citizens", requestOptions)
      .then((response) => {
        response.json();
        if (response.ok) {
          console.log("Successfully added citizen");
        }
      })
      .catch((error) => {
        Alert.alert("Failed", `Citizen could not be added: ${error}`, [
          {
            text: "Try Again",
            onPress: () => {
              pushToApi(item);
            },
          }, // if Try again button is pressed, try function again.
          { text: "Cancel", onPress: () => {}, style: "cancel" },
        ]);
        console.log("Could not add citizen", error);
      });

    // function to post data to api
  };

  // function for batch push of items of type ICitizenEntry to api
  const batchPushToApi = async (items: ICitizenEntry[]) => {
    items.map((item) => {
      try {
        pushToApiWithoutAlert(item); // To avoid repetitive alerts when each item fails to be added
      } catch (error) {
        console.log(
          
          `Could not add Citizen with name ${(item.firstName, item.lastName)}`
        );
      }
    });
  };

  const [state, setState] = useState<IState>({
    citizenEntries: [],
    onAddEntry: false,
  });

  const deleteEntry = (id: number) => {
    deleteCitizenEntry(id, state, setState);
  };

  getCitizenEntries(state, setState);

  return (
    <SafeAreaView style={styles.container}>
      <Text>NIN Registration</Text>
      <Button
        icon={<Icon name="add" color="black" />}
        title="Batch Push"
        titleStyle={{ color: "black", fontWeight: "bold" }}
        type="clear"
        onPress={() => {
          batchPushToApi(state.citizenEntries);
        }}
      />

      <FlatList
        style={{ width: "100%", padding: 10, backgroundColor: "black" }}
        data={state.citizenEntries}
        renderItem={({ item }) => (
          <View style={styles.inputContainerStyle}>
            <Text style={{ color: "white" }}>
              Name={item.firstName + " " + item.lastName}
            </Text>
            <Text style={{ color: "white" }}>
              Date of Birth={new Date(item.dateOfBirth).toLocaleDateString()}
            </Text>
            <Text style={{ color: "white" }}>BVN={item.bvn}</Text>
            <Text style={{ color: "white" }}>Phone={item.phoneNumber}</Text>
            <Text style={{ color: "white" }}>Generated NIN={item.nin}</Text>
            <ButtonGroup
              containerStyle={{
                backgroundColor: "#23cc8c",
                width: "100%",
                borderColor: "black",
                borderRadius: 32,
              }}
              buttons={[
                <Button
                  icon={<Icon name="edit" color="green" />}
                  type="clear"
                  title="Edit"
                  titleStyle={{ fontSize: 15 }}
                  onPress={() => {}}
                />,
                <Button
                  icon={<Icon name="delete" color="red" />}
                  type="clear"
                  title="Delete"
                  titleStyle={{ fontSize: 15 }}
                  onPress={() => {
                    deleteEntry(item.id!);
                  }}
                />,
                <Button
                  icon={<Icon name="info" color="blue" />}
                  type="clear"
                  title="Push to API"
                  titleStyle={{ fontSize: 15 }}
                  onPress={() => {
                    pushToApi(item);
                  }}
                />,
              ]}
            />
          </View>
        )}
        ListHeaderComponent={() => (
          <View>
            <Text
              h3
              style={[
                styles.inputContainerStyle,
                { backgroundColor: "#23cc8c" },
              ]}
            >
              Citizens in Database{" "}
              <Badge status="primary" value={state.citizenEntries.length} />
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={
          //this component will be rendered in between items
          () => {
            return (
              <View
                style={{ backgroundColor: "#23cc8c", height: 3, width: "100%" }}
              />
            );
          }
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#23cc8c",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 16, color: "black" },
  inputContainerStyle: {
    width: "100%",
    padding: 9,
  },
});
