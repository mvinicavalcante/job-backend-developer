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

  constructor(review?: Partial<Review>) {
    this.id = review?.id;
    this.title = review?.title;
    this.notes = review?.notes;
    this.rating = review?.rating;
    this.released = review?.released;
    this.runtime = review?.runtime;
    this.director = review?.director;
    this.genre = review?.genre;
    this.actors = review?.actors;
  }
}
