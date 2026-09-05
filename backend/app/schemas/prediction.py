from pydantic import BaseModel


class PredictionRequest(BaseModel):
    carpet_area_sqft: float
    floor_num: int
    bathroom_num: int
    balcony_num: int
    parking_count: int
    Transaction: str
    Furnishing: str
    facing: str
    Ownership: str
    parking_type: str
    location_grouped: str
    overlooks_main_road: int
    overlooks_garden_park: int
    overlooks_pool: int


class PredictionResponse(BaseModel):
    predicted_price: float