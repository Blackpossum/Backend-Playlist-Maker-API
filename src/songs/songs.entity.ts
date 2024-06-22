import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity('songs')
export class song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('varchar', { array: true })
  artist: string[];

  @Column({ type: Date })
  releaseDate: Date;

  @Column({ type: 'time' })
  duration: Date;

  @Column({ type: 'text' })
  lyric: string;
}
