import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import {
    CoffeeOriginEntity,
    CoffeeKindEntity,
    CoffeeRoastedEntity,
    CoffeeProcessEntity,
    CoffeeSpeciesEntity,
} from './CoffeeAttrsEntity';
import { CoffeeBrewingEntity } from './CoffeeBrewingEntity';

export type Image = {
    name: string;
    url?: string;
    alt?: string;
    file?: File;
};

@Entity()
export class CoffeeEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column()
    public description!: string;

    @Column()
    public rating!: number;

    @Column()
    public taste!: number;

    @Column()
    public tasteKind!: number;

    @Column()
    public woody!: number;

    @Column()
    public bitter!: number;

    @Column()
    public sour!: number;

    @Column()
    public ownDescription!: string;

    @Column()
    public dateAdded!: Date;

    @Column()
    public buyDate!: Date;

    @ManyToOne((type) => CoffeeOriginEntity, (coffeeOrigin) => coffeeOrigin.id)
    @JoinColumn({ name: 'origin' })
    public origin!: CoffeeOriginEntity;

    @ManyToOne((type) => CoffeeKindEntity, (coffeeKind) => coffeeKind.id)
    @JoinColumn({ name: 'kind' })
    public kind!: CoffeeOriginEntity;

    @ManyToOne((type) => CoffeeRoastedEntity, (coffeeRoasted) => coffeeRoasted.id)
    @JoinColumn({ name: 'roasted' })
    public roasted!: CoffeeOriginEntity;

    @ManyToOne((type) => CoffeeProcessEntity, (coffeeProcess) => coffeeProcess.id)
    @JoinColumn({ name: 'process' })
    public process!: CoffeeProcessEntity;

    @ManyToOne((type) => CoffeeSpeciesEntity, (coffeeSpecies) => coffeeSpecies.id)
    @JoinColumn({ name: 'species' })
    public species!: CoffeeSpeciesEntity;

    @OneToMany((type) => CoffeeBrewingEntity, (coffeeBrewings) => coffeeBrewings.coffee)
    // @JoinColumn({ name: 'brewings' })
    public brewings!: CoffeeBrewingEntity[];
}
