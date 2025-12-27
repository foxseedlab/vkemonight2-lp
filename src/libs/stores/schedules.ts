import { createCMSClient } from './init';
import type { Person } from './people';

export type Schedule = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  start_at: string;
  end_at: string;
  genre: string;
  dj: Person;
  vj: Person | null;
};

export async function fetchDJSchedules(): Promise<Schedule[]> {
  const client = createCMSClient();

  const res = await client.getList<Schedule>({
    endpoint: 'schedules',
  });

  res.contents.sort((a, b) => {
    return new Date(a.start_at).getTime() - new Date(b.start_at).getTime();
  });

  return res.contents;
}
