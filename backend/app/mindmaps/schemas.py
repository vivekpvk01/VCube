from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class MindMapNode(BaseModel):
    id: str
    title: str
    children: List["MindMapNode"] = []

MindMapNode.model_rebuild()

class MindMapCreateRequest(BaseModel):
    subject: str
    syllabus_file_id: str

class MindMapResponse(BaseModel):
    mindmap_id: str = Field(..., alias="_id")
    subject: str
    tree: MindMapNode
    created_at: datetime
    created_by: str


