import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  notes: string;

  @Column('double', { default: 0 })
  rating: number;

  @Column({ default: null })
  released: Date;

  @Column({ default: null })
  runtime: string;

  @Column({ nullable: false })
  director: string;

  @Column({ nullable: false })
  genre: string;

  @Column({ nullable: false })
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
