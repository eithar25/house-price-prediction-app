from fastapi.testclient import TestClient
from app.main import app


def test_health():
    with TestClient(app) as client:
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json() == {"status": "ok"}


def test_predict_valid_input():
    payload = {
        "carpet_area_sqft": 1200,
        "floor_num": 3,
        "bathroom_num": 2,
        "balcony_num": 1,
        "parking_count": 1,
        "Transaction": "Resale",
        "Furnishing": "Semi-Furnished",
        "facing": "East",
        "Ownership": "Freehold",
        "parking_type": "Covered",
        "location_grouped": "mumbai",
        "overlooks_main_road": 0,
        "overlooks_garden_park": 1,
        "overlooks_pool": 0
    }
    with TestClient(app) as client:
        response = client.post("/predict", json=payload)
        assert response.status_code == 200
        assert "predicted_price" in response.json()
        assert isinstance(response.json()["predicted_price"], float)


def test_predict_invalid_input():
    payload = {"carpet_area_sqft": "not a number"}
    with TestClient(app) as client:
        response = client.post("/predict", json=payload)
        assert response.status_code == 422