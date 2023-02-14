import { cfServiceCredentials } from '@sap/xsenv';
import { createConnection } from '@sap/hana-client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LogService {
  log(data: string, user: string) {
    const dbConnection = createConnection();
    const hanacreds = cfServiceCredentials({ tag: 'hana' });
    const connOptions = {
      serverNode: hanacreds.host + ':' + hanacreds.port,
      encrypt: 'true',
      sslValidateCertificate: 'false',
      uid: hanacreds.user,
      pwd: hanacreds.password,
    };

    dbConnection.connect(connOptions, function (err) {
      if (err) throw err;
      const stmt = dbConnection.prepare(
        'INSERT INTO 7C564ADD4BCF4ECDBBF8C1D29A64FE28.LOG_REQUEST(USER_LOG, REQUEST, LOG_DATE) VALUES(?, ?, ?)',
      );

      stmt.execBatch([[user, data, new Date().toISOString()]], (err) => {
        if (err) throw err;
      });
    });
  }
}
