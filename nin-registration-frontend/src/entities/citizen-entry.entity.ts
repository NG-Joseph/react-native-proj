import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class CitizenEntry {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    registrationDate: Date

    @Column({nullable:true})
    firstName: string

    @Column({nullable:true})
    lastName: string

    @Column({nullable:true})
    lga: string

    @Column({nullable:true})
    stateOfOrigin: string

    @Column({default: null, nullable:true})
    nin:string

    @Column({ type: Date, nullable:true })
    dateOfBirth: Date

    @Column({nullable:true})
    bvn: string

    @Column({nullable:true})
    phoneNumber: string

    @Column({nullable:true})
    nextOfKinName: string








}

