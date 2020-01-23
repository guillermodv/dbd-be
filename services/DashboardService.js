require('dotenv').config();
var snowflake = require('snowflake-sdk');

let {account, user, password, role, warehouse} = process.env;

class DashboardService {
    static async fetchDashboardData() {
        console.log("Connecting to database");

        let connection =  await snowflake.createConnection( {
                account: account,
                username: user,
                password: password,
                role: role,
                warehouse: warehouse
            }
        );

        console.log("Trying to connect to Snowflake...");

        connection.connect(function(err, conn) {
            if (err) {
                console.error('Unable to connect: ' + err.message);
                process.exit([1])
            } else {
                console.log('Successfully connected to Snowflake.');
            }
        });

        let fetchAllQuery = 'select NAME, SUM(IFF("STATUS" = \'OK\',1,0)) AS SUCCEDED, SUM(IFF("STATUS" = \'ERROR\',1,0)) AS FAILED from  BPG_ETL_TEST.ETL.METADATA group by NAME, "STATUS"';

        const runSql = (connection, sqlText) => new Promise((resolve, reject) => {
            connection.execute({
                sqlText,
                complete: (err, stmt, rows) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(rows);
                }
            });
        });

        return await runSql(connection, fetchAllQuery);
    };

    static async getDashboardData(id) {
        console.log("Connecting to database");

        let connection =  await snowflake.createConnection( {
                account: account,
                username: user,
                password: password,
                role: role,
                warehouse: warehouse
            }
        );

        console.log("Trying to connect to Snowflake...");

        connection.connect(function(err, conn) {
            if (err) {
                console.error('Unable to connect: ' + err.message);
                process.exit([1])
            } else {
                console.log('Successfully connected to Snowflake.');
            }
        });

        let getById = 'select Coalesce(RULE, \'Unrecognized\') AS RULE, SUM(IFF("STATUS" = \'OK\',1,0)) AS SUCCEDED, SUM(IFF("STATUS" = \'ERROR\',1,0)) AS FAILED from  BPG_ETL_TEST.ETL.METADATA where NAME = \'' +
            id + '\' group by RULE, "STATUS"';

        const runSql = (connection, sqlText) => new Promise((resolve, reject) => {
            connection.execute({
                sqlText,
                complete: (err, stmt, rows) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(rows);
                }
            });
        });

        return await runSql(connection, getById);
    };
}

module.exports = DashboardService;
