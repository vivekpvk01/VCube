import csv
from io import StringIO
from typing import List, Dict

def parse_csv(file_bytes: bytes) -> List[Dict]:
    try:
        text = file_bytes.decode('utf-8')
        reader = csv.DictReader(StringIO(text))
        rows = []
        for row in reader:
            if not row:
                continue
            rows.append(dict(row))
        if not rows:
            raise ValueError("CSV file is empty or has no valid rows.")
        return rows
    except UnicodeDecodeError:
        raise ValueError("Invalid file encoding. Expected UTF-8.")
    except csv.Error as e:
        raise ValueError(f"Invalid CSV format: {str(e)}")
    except Exception as e:
        raise ValueError(f"Failed to parse CSV: {str(e)}")


