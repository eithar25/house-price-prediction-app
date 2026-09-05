import pandas as pd
from app.schemas.prediction import PredictionRequest


def request_to_dataframe(request: PredictionRequest) -> pd.DataFrame:
    data = request.model_dump()
    return pd.DataFrame([data])