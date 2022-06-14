use rusqlite::Connection;

pub struct Patient {
  id: i32,
  data: String,
}

pub fn create(db: &Connection, data: String) -> Result<(), String> {
  match db.execute("INSERT INTO patient (data) VALUES (?1)", &[&data]) {
    Ok(_) => return Ok(()),
    Err(_) => return Err(String::from("Failed to save data")),
  }
}

pub fn read_all(db: &Connection) -> Result<Vec<Patient>, String> {
  let patient_vec: Vec<Patient> = Vec::new();

  let mut sql_query = match db.prepare("SELECT * FROM patient") {
    Ok(query) => query,
    Err(_) => return Err(String::from("Failed to load patients")),
  };

  let patient_iter = match sql_query.query_map([], |row| {
    let patient = Patient {
      id: row.get(0)?,
      data: row.get(1)?,
    };
    patient_vec.push(patient);
    Ok(patient)
  }) {
    Ok(patient_iter) => patient_iter,
    Err(_) => return Err(String::from("Failed to load patients")),
  };

  Ok(patient_vec)
}

pub fn read_one(db: &Connection, id: i32) -> Result<Patient, String> {
  let id = format!("{}", id);
  let patient_vec: Vec<Patient> = Vec::new();

  let mut sql_query = match db.prepare("SELECT * FROM patient WHERE id=(?1)") {
    Ok(query) => query,
    Err(_) => return Err(String::from("Failed to load patient")),
  };

  let patient_iter = match sql_query.query_map([], |row| {
    let patient = Patient {
      id: row.get(0)?,
      data: row.get(1)?,
    };
    patient_vec.push(patient);
    Ok(patient)
  }) {
    Ok(patient_iter) => patient_iter,
    Err(_) => return Err(String::from("Failed to load patient")),
  };

  Ok(patient_vec[0])
}

pub fn update(db: &Connection, id: i32, data: String) -> Result<(), String> {
  let id = format!("{}", id);

  match db.execute("UPDATE patient SET data=(?1) WHERE id=(?2)", &[&data, &id]) {
    Ok(_) => return Ok(()),
    Err(_) => return Err(String::from("Failed to update patient")),
  };
}

pub fn delete(db: &Connection, id: i32) -> Result<(), String> {
  let id = format!("{}", id);

  match db.execute("DELETE FROM patient WHERE id=(?1)", &[&id]) {
    Ok(_) => return Ok(()),
    Err(_) => return Err(String::from("Failed to delete patient")),
  };
}
