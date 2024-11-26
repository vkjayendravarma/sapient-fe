export interface DayWise {
    windy: boolean;
    sunny: boolean;
    rainy: boolean;
    storm: boolean;
    max: number;
    min: number;
    date: number;
}


export interface WeatherReportInterface{
    prediction: DayWise[];
}