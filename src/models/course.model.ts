export interface Course {
    [x: string]: any;
    id?: number;
    title: string;
    description: string;
    instructor: string;
    difficultyLevel: string;
    category: any;
    image?: string;
    pdfFileName?:string;
    createdDate?: Date;
    showDetails?: boolean; 
    rating?: number;
  }