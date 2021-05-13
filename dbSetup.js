const mysql = require('mysql');

class Database {
  constructor() {
      this.connection = mysql.createConnection({
        host: "0.0.0.0",
        user: "user",
        password: "base",
        database: "sdc",
        socketPath: '/var/run/mysqld/mysqld.sock'
      });
  }
  query( sql ) {
      return new Promise( ( resolve, reject ) => {
          this.connection.query( sql, ( err, rows ) => {
              if ( err ) {
                return reject( err );
              }
              resolve( rows );
          } );
      } );
  }
  close() {
      return new Promise( ( resolve, reject ) => {
          this.connection.end( err => {
              if ( err ) {
                return reject( err );
              }
              resolve();
          } );
      } );
  }
}

module.exports = new Database
