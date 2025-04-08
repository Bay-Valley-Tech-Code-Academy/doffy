export type ScrapedJobInfo = {
  id?: number;
  title: string;
  company: string;
  location: string;
  origin: string;
  pay: string;
  description: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ScraperResults = {
  jobResults: ScrapedJobInfo[];
  error: boolean;
};
