import { getRepository, Repository } from "typeorm/browser";
import { CitizenEntry } from "../entities/citizen-entry.entity";
import { ICitizenEntry, IState } from "../interfaces/citizen-entry.interface";

/*export const getCitizenEntries = async (setCitizenEntries: 
    React.Dispatch<React.SetStateAction<CitizenEntry[]>>) => {
     try {
     const citizenEntryRepository: Repository<CitizenEntry> = getRepository(CitizenEntry);
     let citizenEntries = await citizenEntryRepository.find();
     //Below if should not be here. It is just to load some fictitious data for quick connectivity test
     if (citizenEntries.length === 0) {
     const newCitizenEntry = new CitizenEntry();
    
     await citizenEntryRepository.save(newCitizenEntry);
     citizenEntries = await citizenEntryRepository.find();
     }
     setCitizenEntries(citizenEntries);
     } catch (error) {
     console.log(error);
     }
    };*/
    var otpGenerator = require('otp-generator')

    

    export const getCitizenEntries = async (state: IState, setState: 
        React.Dispatch<React.SetStateAction<IState>>) => {
         try {
         const citizenEntryRepository: Repository<CitizenEntry> = 
        getRepository(CitizenEntry);
         let citizenEntries = await citizenEntryRepository.find();
         //Below if should not be here. It is just to load some fictitious data for quick 
        
         if (citizenEntries.length === 0) {
         const newCitizenEntry = new CitizenEntry();
         newCitizenEntry.firstName = 'James';
         newCitizenEntry.lastName = "Coleman";
         console.log(citizenEntries)
         await citizenEntryRepository.save(newCitizenEntry);
         citizenEntries = await citizenEntryRepository.find();
         }
         setState({...state, citizenEntries});
         } catch (error) {
         console.log(error);
         }
        }

        export const createCitizenEntry = async (citizenEntryData: ICitizenEntry, state: IState, 
            setState: React.Dispatch<React.SetStateAction<IState>>) => {
             try {
             const citizenEntryRepository: Repository<CitizenEntry> = getRepository(CitizenEntry);
             const newCitizenEntry = citizenEntryRepository.create(citizenEntryData);
             newCitizenEntry.nin = otpGenerator.generate(14, { upperCase: false, specialChars: false, alphabets: false, digits: true });
             const citizenEntry = await citizenEntryRepository.save(newCitizenEntry);
              
             //time to modify state after create
             const citizenEntries = state.citizenEntries;
             
             citizenEntries.push(citizenEntry);
             setState({ ...state, citizenEntries, onAddEntry: false });
             } catch (error) {
             console.log(error);
             }
            };

            export const deleteCitizenEntry = async (id: number, state: IState, setState: 
                React.Dispatch<React.SetStateAction<IState>>) => {
                 try {
                 const citizenEntryRepository: Repository<CitizenEntry> = getRepository(CitizenEntry);
                 await citizenEntryRepository.delete(id);
                 //remove entry from state
                 const currentEntries = state.citizenEntries;
                 //find the index corresponding to the item with the passed id
                 const index = currentEntries.findIndex((entry) => entry.id === id);
                 currentEntries.splice(index, 1);//remove one element starting from the index position. This is 
                
                 //update state with the spliced currentItems
                 setState({ ...state, citizenEntries: currentEntries });
                 } catch (error) {
                 console.log(error);
                 }
                };

                

                