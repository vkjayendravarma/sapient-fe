export interface DayWise {
    windy: boolean;
    sunny: boolean;
    rainy: boolean;
    storm: boolean;
    max: number;
    min: number;
    date: Date;
}


export interface WeatherReportInterface{
    prediction: DayWise[];
}