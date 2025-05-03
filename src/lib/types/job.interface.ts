export interface Tag {
    id: number;
    name: string;
  }
  
export interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    origin: string;
    pay: string;
    description: string;
    url: string;
    createdAt: string;
    updatedAt: string;
    tags: Tag[];
  }