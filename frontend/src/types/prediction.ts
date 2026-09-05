export interface PredictionRequest {
  carpet_area_sqft: number;
  floor_num: number;
  bathroom_num: number;
  balcony_num: number;
  parking_count: number;
  Transaction: string;
  Furnishing: string;
  facing: string;
  Ownership: string;
  parking_type: string;
  location_grouped: string;
  overlooks_main_road: number;
  overlooks_garden_park: number;
  overlooks_pool: number;
}

export interface PredictionResponse {
  predicted_price: number;
}