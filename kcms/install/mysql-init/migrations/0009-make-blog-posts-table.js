const { Migration } = require("../migration");

class MyMigration extends Migration {
  doMigration(mysqlPool) {
    if (!this.isPoolValid(mysqlPool)) {
      return Promise.reject("Invalid MySQL Pool Object");
    }

    const poolPromise = mysqlPool.promise();

    const addPagesQuery = `
      CREATE TABLE IF NOT EXISTS blogPosts (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(512) NOT NULL,
        slug VARCHAR(512) UNIQUE NOT NULL,
        draft BOOLEAN NOT NULL,
        public BOOLEAN NOT NULL,
        content JSON NOT NULL,
        meta JSON NOT NULL,
        dateAdded DATETIME NOT NULL,
        dateUpdated DATETIME NOT NULL
      )
    `;

    return poolPromise.execute(addPagesQuery)
      .then(( [rows] ) => {
        // just in case I want to view the results
        console.log(rows);
      });
  }
}

module.exports = MyMigration;
