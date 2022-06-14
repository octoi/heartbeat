#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod controller;
mod database;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      controller::patient::create_patient,
      controller::patient::read_patients,
      controller::patient::read_patient,
      controller::patient::update_patient,
      controller::patient::delete_patient,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
