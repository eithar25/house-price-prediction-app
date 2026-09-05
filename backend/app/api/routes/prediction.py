from fastapi import APIRouter
from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.preprocessing import request_to_dataframe
from app.services.inference import predict

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "ok"}


@router.post("/predict", response_model=PredictionResponse)
def predict_price(request: PredictionRequest):
    df = request_to_dataframe(request)
    price = predict(df)
    return PredictionResponse(predicted_price=price)