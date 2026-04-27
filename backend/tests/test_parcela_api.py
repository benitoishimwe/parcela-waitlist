"""Parcela backend API tests (Express + Mongo + optional Google Sheets)."""
import os
import time
import requests
import pytest
from pymongo import MongoClient

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # Fallback to reading frontend/.env if env not exported in pytest shell
    try:
        with open("/app/frontend/.env") as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
                    break
    except Exception:
        pass

assert BASE_URL, "REACT_APP_BACKEND_URL must be set"

API = f"{BASE_URL}/api"

MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "parcela"


@pytest.fixture(scope="session")
def mongo_collection():
    client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=3000)
    yield client[DB_NAME]["waitlist"]
    client.close()


@pytest.fixture(autouse=True)
def cleanup_test_emails(mongo_collection):
    yield
    try:
        mongo_collection.delete_many({"email": {"$regex": "^TEST_"}})
    except Exception:
        pass


# ---------- Health ----------
class TestHealth:
    def test_health_ok(self):
        r = requests.get(f"{API}/health", timeout=10)
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert "sheetsConfigured" in data
        assert isinstance(data["sheetsConfigured"], bool)


# ---------- Waitlist ----------
class TestWaitlistValid:
    @pytest.mark.parametrize("lang", ["rw", "en", "fr", "sw"])
    def test_valid_submission_each_language(self, lang, mongo_collection):
        email = f"TEST_user_{lang}_{int(time.time()*1000)}@example.com"
        r = requests.post(f"{API}/waitlist", json={"email": email, "language": lang}, timeout=10)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("success") is True
        assert "sheets_status" in data
        # Without sheets configured, must be 'skipped'
        assert data["sheets_status"] in ("skipped", "appended", "failed")

        # Verify Mongo persistence
        doc = mongo_collection.find_one({"email": email})
        assert doc is not None, "Entry not persisted to MongoDB"
        assert doc["language"] == lang
        assert doc["source"] == "Parcela Waiting List"
        assert "timestamp" in doc

    def test_idempotent_upsert_same_email(self, mongo_collection):
        email = f"TEST_dup_{int(time.time()*1000)}@example.com"
        for lang in ("en", "rw"):
            r = requests.post(f"{API}/waitlist", json={"email": email, "language": lang}, timeout=10)
            assert r.status_code == 200
        # Should still be a single doc (upsert)
        count = mongo_collection.count_documents({"email": email})
        assert count == 1
        doc = mongo_collection.find_one({"email": email})
        assert doc["language"] == "rw"  # last write wins


class TestWaitlistInvalid:
    def test_invalid_email_returns_400(self):
        r = requests.post(f"{API}/waitlist", json={"email": "not-an-email", "language": "en"}, timeout=10)
        assert r.status_code == 400
        data = r.json()
        assert data.get("success") is False
        assert data.get("error") == "invalid_input"

    def test_unsupported_language_returns_400(self):
        r = requests.post(f"{API}/waitlist", json={"email": "TEST_de@example.com", "language": "de"}, timeout=10)
        assert r.status_code == 400
        data = r.json()
        assert data.get("success") is False
        assert data.get("error") == "invalid_input"

    def test_missing_fields_returns_400(self):
        r = requests.post(f"{API}/waitlist", json={}, timeout=10)
        assert r.status_code == 400

    def test_empty_email_returns_400(self):
        r = requests.post(f"{API}/waitlist", json={"email": "", "language": "en"}, timeout=10)
        assert r.status_code == 400


# ---------- 404 for unknown /api routes ----------
class TestUnknownApi:
    def test_unknown_api_returns_404(self):
        r = requests.get(f"{API}/this-does-not-exist", timeout=10)
        assert r.status_code == 404
