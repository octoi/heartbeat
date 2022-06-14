use crate::database::init_database;
use crate::database::patient;

#[tauri::command]
pub fn create_patient(data: String) -> Result<(), String> {
  let db = init_database()?;
  patient::create(&db, data)?;
  Ok(())
}

#[tauri::command]
pub fn read_patients() -> Result<Vec<patient::Patient>, String> {
  let db = init_database()?;
  let patients = patient::read_all(&db)?;
  Ok(patients)
}

#[tauri::command]
pub fn read_patient(id: i32) -> Result<patient::Patient, String> {
  let db = init_database()?;
  let patient = patient::read_one(&db, id)?;
  Ok(patient)
}

#[tauri::command]
pub fn update_patient(id: i32, data: String) -> Result<(), String> {
  let db = init_database()?;
  patient::update(&db, id, data)?;
  Ok(())
}

#[tauri::command]
pub fn delete_patient(id: i32) -> Result<(), String> {
  let db = init_database()?;
  patient::delete(&db, id)?;
  Ok(())
}
