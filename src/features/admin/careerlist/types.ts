// src/features/admin/careerlist/types.ts
export interface Career {
  id: number;
  title: string;
  department: string;
  subject: string;
  job_type: string;
  vacancies: number;
  qualification: string;
  job_description_pdf: string | null;
  posted_at: string; 
  last_date: string;  
  is_active: boolean;
}
