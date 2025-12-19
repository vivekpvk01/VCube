import random
from typing import List
from app.seating.schemas import StudentData, RoomData, SeatAssignment

def allocate_seats(students: List[StudentData], rooms: List[RoomData], mix_departments: bool = True) -> List[SeatAssignment]:
    assignments = []
    student_list = students.copy()
    if mix_departments:
        random.shuffle(student_list)
    else:
        student_list.sort(key=lambda s: s.department)
    student_idx = 0
    for room in rooms:
        for row in range(1, room.rows + 1):
            for seat in range(1, room.benches_per_row + 1):
                if student_idx >= len(student_list):
                    break
                student = student_list[student_idx]
                assignments.append(SeatAssignment(
                    student_id=student.student_id,
                    student_name=student.name,
                    roll_number=student.roll_number,
                    department=student.department,
                    room_id=room.room_id,
                    block=room.block,
                    room_number=room.room_number,
                    row=row,
                    seat=seat
                ))
                student_idx += 1
            if student_idx >= len(student_list):
                break
        if student_idx >= len(student_list):
            break
    return assignments

