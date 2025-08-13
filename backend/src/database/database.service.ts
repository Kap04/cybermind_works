// database.service.ts
import { neon } from '@neondatabase/serverless';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
    private readonly sql;

    constructor(private configService: ConfigService) {
        const databaseUrl = this.configService.get('DATABASE_URL');
        this.sql = neon(databaseUrl);
    }

    // Public query method for Neon sql.query (string, [params])
    async query(sql: string, params: any[] = []): Promise<any> {
        try {
            console.log('[DatabaseService] Executing query:', sql);
            console.log('[DatabaseService] Parameters:', params);
            const result = await this.sql.query(sql, params);
            console.log('[DatabaseService] Query result:', result);
            return result;
        } catch (error) {
            console.error('DatabaseService query error:', error);
            throw error;
        }
    }
}