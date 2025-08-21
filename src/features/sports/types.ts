// src/features/sports/types.ts
export type PodiumPos = "1st" | "2nd" | "3rd";

export interface Winner {
  id: number;
  name: string;
  student_class: string;
  position: PodiumPos;
  photo: string; 
}

export interface SportItem {
  id: number;
  title: string;
  description: string;
  created_at: string; 
  winners: Winner[];  
  images: string[];  
}
