import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  notes: string;

  @Column('double')
  rating: number;

  @Column()
  released: Date;

  @Column()
  runtime: string;

  @Column()
  director: string;

  @Column()
  genre: string;

  @Column()
  actors: string;
}
