from bson.objectid import ObjectId
from datetime import datetime
from typing import Any, Optional

def serialize_object_id(obj_id: Any) -> str:
    if isinstance(obj_id, ObjectId):
        return str(obj_id)
    if isinstance(obj_id, str):
        return obj_id
    return str(obj_id)

def serialize_datetime(dt: Optional[datetime]) -> Optional[str]:
    if dt is None:
        return None
    if isinstance(dt, datetime):
        return dt.isoformat()
    return str(dt)

def safe_get(d: dict, key: str, default: Any = None) -> Any:
    return d.get(key, default) if isinstance(d, dict) else default

def remove_none_values(d: dict) -> dict:
    return {k: v for k, v in d.items() if v is not None}

