import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class Citizen {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    registrationDate: Date

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    lga: string

    @Column()
    stateOfOrigin: string

    @Column({default: null})
    nin:string
    

    @Column({ type: Date })
    dateOfBirth: Date

    @Column()
    bvn: string

    @Column()
    phoneNumber: string

    @Column()
    nextOfKinName: string








}

