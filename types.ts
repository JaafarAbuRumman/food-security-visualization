
export interface KeyTopic {
  title: string;
  description: string;
  path: string;
}

export interface HomePageData {
  title: string;
  introduction: string;
  key_topics: KeyTopic[];
}

export interface ChartDataPoint {
  name: string;
  percentage: number;
}

export interface StatisticsPageData {
  title:string;
  description: string;
  chartData: ChartDataPoint[];
  image_prompt?: string;
}

export interface ContentSection {
  name: string;
  text: string;
}

export interface IrrigationPageData {
  title: string;
  description: string;
  systems: ContentSection[];
  image_prompt?: string;
}

export interface Category {
    title: string;
    items: string[];
}

export interface CropsPageData {
    title: string;
    description: string;
    categories: Category[];
    image_prompt?: string;
}

export interface PlantsPageData {
    title: string;
    description: string;
    categories: Category[];
    image_prompt?: string;
}

export interface TitledText {
    title: string;
    text: string;
}

export interface VerticalFarmingPageData {
    title: string;
    description: string;
    points: TitledText[];
    image_prompt?: string;
}

export interface PlantDiseasesPageData {
    title: string;
    description: string;
    diseases: ContentSection[];
    image_prompt?: string;
}


export interface AppData {
  home: HomePageData;
  statistics: StatisticsPageData;
  irrigation: IrrigationPageData;
  crops: CropsPageData;
  plants: PlantsPageData;
  vertical_farming: VerticalFarmingPageData;
  plant_diseases: PlantDiseasesPageData;
}