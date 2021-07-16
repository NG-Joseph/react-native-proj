export class ICitizenEntry {

    id: number
    firstName: string
    lastName: string
    lga: string
    stateOfOrigin: string
    nin: string 
    dateOfBirth: Date 
    bvn: string 
    phoneNumber: string 
    nextOfKinName: string 


}

export interface IState{
    citizenEntries: ICitizenEntry[],
    onAddEntry: boolean
   
}