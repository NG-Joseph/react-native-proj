import "reflect-metadata";
import React, { useCallback, useEffect, useState } from "react";
import {  StyleSheet } from "react-native";
import { Connection, createConnection } from "typeorm";

import { CitizenEntry } from "./entities/citizen-entry.entity";
import {
  createCitizenEntry,
  deleteCitizenEntry,
  getCitizenEntries,
} from "./services/citizen-entry.service";
import {
  ICitizenEntry,
  IState,
} from "./interfaces/citizen-entry.interface";
import AddEntry from "./components/AddEntry";



const AddViewCitizens: React.FC = () => {
  const [defaultConnection, setConnection] = useState<Connection | null>(null);

  const [state, setState] = useState<IState>({
    citizenEntries: [],
    onAddEntry: false,
  });
  const setupConnection = useCallback(async () => {
    try {
      const connection = await createConnection({

        type: "expo",
        database: "citizens_entries.db",
        driver: require("expo-sqlite"),
        synchronize: true,
        entities: [CitizenEntry],
      });
      setConnection(connection);
      getCitizenEntries(state, setState);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const createEntry = (citizenEntryData: ICitizenEntry) => {
    createCitizenEntry(citizenEntryData, state, setState);
    
  };
 
  const deleteEntry = (id: number) => {
    deleteCitizenEntry(id, state, setState);
  };

  useEffect(() => {
    if (!defaultConnection) {
      setupConnection();
    } else {
      getCitizenEntries(state, setState);
    }
  }, []);

  return (
   
        <AddEntry
          createEntry={createEntry}
          
          
        />
      

     
          
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

export default AddViewCitizens;
