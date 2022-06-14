mod init;
pub mod patient;

use rusqlite::Connection;

pub use init::connect_database;

pub fn init_database() -> Result<Connection, String> {
  match connect_database("data.db") {
    Ok(conn) => Ok(conn),
    Err(err) => {
      eprintln!("{}", err);
      Err(String::from("Failed to connect database"))
    }
  }
}
