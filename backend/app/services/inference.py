import joblib
import pandas as pd
from pathlib import Path

MODEL_PATH = Path(__file__).resolve().parent.parent.parent / "models" / "house_price.pkl"

_model = None


def load_model():
    global _model
    _model = joblib.load(MODEL_PATH)
    return _model


def predict(input_df: pd.DataFrame) -> float:
    if _model is None:
        raise RuntimeError("Model not loaded. Call load_model() at startup.")
    prediction = _model.predict(input_df)
    return float(prediction[0])